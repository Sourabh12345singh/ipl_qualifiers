import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

function loadEnvFromFile() {
  const envPath = join(ROOT, '.env');
  try {
    const text = readFileSync(envPath, 'utf-8');
    text.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eq = trimmed.indexOf('=');
      if (eq <= 0) return;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    });
  } catch {
    // ignore missing .env
  }
}

loadEnvFromFile();

const API_KEY = process.env.CRICAPI_KEY;
if (!API_KEY) {
  console.error('ERROR: CRICAPI_KEY environment variable is not set');
  process.exit(1);
}

const POINTS_API_URL = `https://api.cricapi.com/v1/series_points?apikey=${API_KEY}&id=87c62aac-bc3c-4738-ab93-19da0690488f`;
// const POINTS_API_URL = `https://api.cricapi.com/v1/series_points?apikey=a3716aeb-2699-4946-8440-4b13b23a22a9&id=87c62aac-bc3c-4738-ab93-19da0690488f`

const SERIES_API_URL = `https://api.cricapi.com/v1/series_info?apikey=${API_KEY}&id=87c62aac-bc3c-4738-ab93-19da0690488f`;

const RETRY_DELAYS = [5000, 15000, 30000];
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

const TEAM_MAP = {
  'Royal Challengers Bengaluru': 'RCB',
  'Chennai Super Kings': 'CSK',
  'Mumbai Indians': 'MI',
  'Delhi Capitals': 'DC',
  'Kolkata Knight Riders': 'KKR',
  'Rajasthan Royals': 'RR',
  'Sunrisers Hyderabad': 'SRH',
  'Lucknow Super Giants': 'LSG',
  'Punjab Kings': 'PBKS',
  'Gujarat Titans': 'GT',
  RCBW: 'RCB',
};

function normalizeTeamName(name) {
  if (!name) return '';
  const trimmed = name.trim();
  return TEAM_MAP[trimmed] || trimmed;
}

function normalizeTeamShortCode(code) {
  if (!code) return '';
  return TEAM_MAP[code.trim()] || code.trim();
}

async function fetchWithRetry(url, retries = 0) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 429 && retries < RETRY_DELAYS.length) {
        const delay = RETRY_DELAYS[retries];
        console.log(`Rate limited. Waiting ${delay / 1000}s...`);
        await new Promise((r) => setTimeout(r, delay));
        return fetchWithRetry(url, retries + 1);
      }
      throw new Error(`API error ${res.status}: ${await res.text()}`);
    }
    return await res.json();
  } catch (error) {
    if (error.message.includes('429') && retries < RETRY_DELAYS.length) {
      const delay = RETRY_DELAYS[retries];
      console.log(`Rate limited. Waiting ${delay / 1000}s...`);
      await new Promise((r) => setTimeout(r, delay));
      return fetchWithRetry(url, retries + 1);
    }
    throw error;
  }
}

async function fetchPointsTable() {
  console.log('Fetching points table from CricAPI...');
  const data = await fetchWithRetry(POINTS_API_URL);

  if (!data.data || !Array.isArray(data.data)) {
    throw new Error('Invalid points table response from CricAPI');
  }

  const teams = data.data.map((t) => ({
    team: t.teamname || t.name || t.team || '',
    short: normalizeTeamShortCode(
      t.shortname ||
      t.short ||
      (t.teamname || t.name || t.team || '')
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
    ),
    played: parseInt(t.matches || t.played || 0, 10),
    won: parseInt(t.wins || t.won || 0, 10),
    lost: parseInt(t.loss || t.lost || 0, 10),
    noResult: parseInt(t.nr || t.noResult || 0, 10),
    points: parseInt(t.points || ((parseInt(t.wins || t.won || 0, 10) * 2) + parseInt(t.nr || 0, 10)), 10),
    nrr: parseFloat(t.nrr || 0),
  }));

  teams.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.nrr - a.nrr;
  });

  console.log(`Got ${teams.length} teams`);
  return { teams, raw: data };
}

async function fetchMatchesFromAPI() {
  console.log('Fetching matches from CricAPI...');
  const data = await fetchWithRetry(SERIES_API_URL);

  const sourceList = data?.data?.matchList || data?.data?.matches || [];
  if (!Array.isArray(sourceList) || sourceList.length === 0) {
    console.log('No matches data from CricAPI');
    return { matches: [], raw: data };
  }

  const matches = sourceList.map((m) => {
    const teams = m.teams || [];
    const team1Full = teams[0] || '';
    const team2Full = teams[1] || '';
    const team1Short = normalizeTeamName(team1Full);
    const team2Short = normalizeTeamName(team2Full);

    const status = m.status || '';
    let winner = '';
    if (status.toLowerCase().includes('won')) {
      const winnerMatch = status.match(/^(.+?)\s+won\b/i);
      if (winnerMatch) {
        winner = normalizeTeamName(winnerMatch[1]);
      }
    }
    if (!winner && m.name && status.toLowerCase().includes('won')) {
      const nameWinnerMatch = m.name.match(/^(.+?)\s+vs\s+(.+?),/i);
      if (nameWinnerMatch) {
        const maybeWinner = status.split(' won')[0]?.trim();
        if (maybeWinner) winner = normalizeTeamName(maybeWinner);
      }
    }

    const scores = m.score || [];

    return {
      id: m.id || '',
      matchNumber: m.matchNumber || m.match || 0,
      name: m.name || '',
      team1: team1Short,
      team2: team2Short,
      team1Full,
      team2Full,
      date: m.date || '',
      dateTimeGMT: m.dateTimeGMT || '',
      venue: m.venue || '',
      status,
      winner,
      matchEnded: Boolean(m.matchEnded),
      team1Score: scores[0] || '',
      team2Score: scores[1] || '',
    };
  });

  console.log(`Got ${matches.length} matches from CricAPI`);
  return { matches, raw: data };
}

function getISTDateString(date = new Date()) {
  const ist = new Date(date.getTime() + IST_OFFSET_MS);
  return ist.toISOString().slice(0, 10);
}

function getYesterdayISTDateString() {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  return getISTDateString(yesterday);
}

function parseExistingDataFromFile(fileContent) {
  const pointsMatch = fileContent.match(/pointsTable:\s*(\[[\s\S]*?\])\s*,\s*completedMatches:/);
  const completedMatch = fileContent.match(/completedMatches:\s*(\[[\s\S]*?\])\s*,\s*remainingMatches:/);
  const remainingMatch = fileContent.match(/remainingMatches:\s*(\[[\s\S]*?\])\s*,\s*};/);

  return {
    pointsTable: pointsMatch ? JSON.parse(pointsMatch[1]) : null,
    completedMatches: completedMatch ? JSON.parse(completedMatch[1]) : null,
    remainingMatches: remainingMatch ? JSON.parse(remainingMatch[1]) : null,
  };
}

function loadSchedule() {
  const schedulePath = join(ROOT, 'src', 'data', 'schedule.json');
  const raw = readFileSync(schedulePath, 'utf-8');
  return JSON.parse(raw);
}

function classifyMatches(schedule, apiMatches) {
  const now = Date.now();
  const fourHoursMs = 4 * 60 * 60 * 1000;

  const apiMap = new Map();
  apiMatches.forEach((m) => {
    const key = `${m.team1}-${m.team2}-${m.date}`;
    const reverseKey = `${m.team2}-${m.team1}-${m.date}`;
    apiMap.set(key, m);
    apiMap.set(reverseKey, m);
  });

  const completed = [];
  const remaining = [];

  schedule.forEach((match) => {
    const matchStart = new Date(`${match.date}T${match.time}+05:30`).getTime();
    const isCompleted = (now - matchStart) > fourHoursMs;

    const key = `${match.team1}-${match.team2}-${match.date}`;
    const apiMatch = apiMap.get(key);

    let status = 'Upcoming';
    let winner = '';

    if (apiMatch) {
      status = apiMatch.status || 'Completed';
      winner = apiMatch.winner || '';
    } else if (isCompleted) {
      status = 'Completed';
    }

    const matchData = {
      id: match.id,
      matchNumber: match.matchNumber,
      team1: match.team1,
      team2: match.team2,
      date: match.date,
      time: match.time,
      venue: match.venue,
      status,
      winner,
      team1Score: apiMatch?.team1Score || '',
      team2Score: apiMatch?.team2Score || '',
    };

    if (isCompleted || apiMatch) {
      completed.push(matchData);
    } else {
      remaining.push(matchData);
    }
  });

  completed.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time || '19:30'}+05:30`).getTime();
    const dateB = new Date(`${b.date}T${b.time || '19:30'}+05:30`).getTime();
    return dateB - dateA;
  });

  console.log(`Classified: ${completed.length} completed, ${remaining.length} remaining`);
  return { completed, remaining };
}

function printDummyPointsTable(pointsTable) {
  const rows = pointsTable.map((t, i) => ({
    pos: i + 1,
    team: t.short || t.team,
    played: t.played,
    won: t.won,
    lost: t.lost,
    nr: t.noResult,
    points: t.points,
    nrr: t.nrr,
  }));
  console.log('\nDummy / extracted points table preview:');
  console.table(rows);
}

function updatePointsTablePreserveNRRandNoResult(previousPoints, latestPoints) {
  const prevByShort = new Map((previousPoints || []).map((t) => [t.short, t]));
  const prevByTeam = new Map((previousPoints || []).map((t) => [t.team, t]));
  const changedTeams = [];

  const merged = latestPoints.map((latest) => {
    const previous = prevByShort.get(latest.short) || prevByTeam.get(latest.team);

    const mergedTeam = {
      ...latest,
      noResult: previous?.noResult ?? 0,
      nrr: previous?.nrr ?? 0,
    };

    const changed =
      !previous ||
      previous.played !== mergedTeam.played ||
      previous.won !== mergedTeam.won ||
      previous.lost !== mergedTeam.lost ||
      previous.points !== mergedTeam.points ||
      previous.noResult !== mergedTeam.noResult ||
      previous.nrr !== mergedTeam.nrr;

    if (changed) {
      changedTeams.push(mergedTeam.short || mergedTeam.team);
    }
    return mergedTeam;
  });

  merged.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.nrr - a.nrr;
  });

  return { updatedPoints: merged, changedTeams };
}

function isLikelyCompletedStatus(status = '') {
  const s = status.toLowerCase();
  return s.includes('won') || s.includes('tied') || s.includes('no result') || s.includes('abandoned') || s.includes('completed');
}

const now = Date.now();
  const last24h = now - 24 * 60 * 60 * 1000;

  return schedule
    .filter((match) => {
      const start = new Date(`${match.date}T${match.time}+05:30`).getTime();
      return start >= last24h && start <= now;
    })


function getRecentCompletedMatches(schedule, apiMatches) {
  const now = Date.now();
  const todayIST = getISTDateString();
  const yesterdayIST = getYesterdayISTDateString();
  const recentDates = new Set([todayIST, yesterdayIST]);

  const apiMap = new Map();
  apiMatches.forEach((m) => {
    if (m.id) apiMap.set(`id:${m.id}`, m);
    const key = `${m.team1}-${m.team2}-${m.date}`;
    const reverseKey = `${m.team2}-${m.team1}-${m.date}`;
    apiMap.set(key, m);
    apiMap.set(reverseKey, m);
  });

  return schedule
    .filter((match) => {
      return recentDates.has((match.date || '').slice(0, 10));
    })
    .map((match) => {
      const apiMatch = apiMap.get(`id:${match.id}`) || apiMap.get(`${match.team1}-${match.team2}-${match.date}`);
      const start = new Date(`${match.date}T${match.time}+05:30`).getTime();
      const timeCompleted = (now - start) > 4 * 60 * 60 * 1000;
      const apiCompleted = apiMatch ? (apiMatch.matchEnded || isLikelyCompletedStatus(apiMatch.status)) : false;
      if (!timeCompleted && !apiCompleted) return null;

      return {
        id: match.id,
        matchNumber: match.matchNumber,
        team1: match.team1,
        team2: match.team2,
        date: match.date,
        time: match.time,
        venue: match.venue,
        status: apiMatch?.status || 'Completed',
        winner: apiMatch?.winner || '',
        team1Score: apiMatch?.team1Score || '',
        team2Score: apiMatch?.team2Score || '',
      };
    })
    .filter(Boolean);
}

function mergeRecentCompleted(previousCompleted, previousRemaining, recentCompleted) {
  const keyOf = (m) => `${m.id ?? ''}::${m.matchNumber ?? ''}`;
  const recentMap = new Map(recentCompleted.map((m) => [keyOf(m), m]));

  const updatedRemaining = previousRemaining.filter((m) => !recentMap.has(keyOf(m)));

  const completedMap = new Map(previousCompleted.map((m) => [keyOf(m), m]));
  recentCompleted.forEach((m) => {
    completedMap.set(keyOf(m), m);
  });

  const allCompletedSorted = [...completedMap.values()].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time || '19:30'}+05:30`).getTime();
    const dateB = new Date(`${b.date}T${b.time || '19:30'}+05:30`).getTime();
    return dateB - dateA;
  });

  const recentSorted = [...recentCompleted].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time || '19:30'}+05:30`).getTime();
    const dateB = new Date(`${b.date}T${b.time || '19:30'}+05:30`).getTime();
    return dateB - dateA;
  });
  const olderCompleted = allCompletedSorted.filter((m) => !recentMap.has(keyOf(m)));
  const updatedCompleted = [...recentSorted, ...olderCompleted];

  return {
    updatedCompleted,
    updatedRemaining,
    updatedKeys: [...recentMap.keys()],
  };
}

function generateIPLDataFile(pointsTable, completedMatches, remainingMatches) {
  const lastUpdated = new Date().toISOString();
  const pointsJSON = JSON.stringify(pointsTable, null, 4);
  const completedJSON = JSON.stringify(completedMatches, null, 4);
  const remainingJSON = JSON.stringify(remainingMatches, null, 4);

  return `const CACHE_KEY = 'ipl_data_cache';
const CACHE_TIMESTAMP_KEY = 'ipl_data_timestamp';
const REFRESH_INTERVAL_MS = 24 * 60 * 60 * 1000;

const defaultData = {
  lastUpdated: '${lastUpdated}',
  pointsTable: ${pointsJSON},
  completedMatches: ${completedJSON},
  remainingMatches: ${remainingJSON},
};

const isCacheExpired = () => {
  const ts = localStorage.getItem(CACHE_TIMESTAMP_KEY);
  if (!ts) return true;
  return Date.now() - parseInt(ts, 10) > REFRESH_INTERVAL_MS;
};

const getCachedData = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const setCachedData = (data) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
};

export const fetchIPLData = async () => {
  const cached = getCachedData();
  if (cached && !isCacheExpired()) {
    return cached;
  }
  setCachedData(defaultData);
  return defaultData;
};

export const fetchRemainingMatches = async () => {
  const data = await fetchIPLData();
  return data.remainingMatches;
};

export const fetchCompletedMatches = async () => {
  const data = await fetchIPLData();
  return data.completedMatches;
};

export const getLastUpdated = () => {
  const ts = localStorage.getItem(CACHE_TIMESTAMP_KEY);
  if (!ts) return 'Just now';
  const d = new Date(parseInt(ts, 10));
  return d.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const forceRefresh = async () => {
  localStorage.removeItem(CACHE_KEY);
  localStorage.removeItem(CACHE_TIMESTAMP_KEY);
  setCachedData(defaultData);
  return defaultData;
};
`;
}

async function main() {
  try {
    const [pointsResult, matchesResult] = await Promise.all([
      fetchPointsTable(),
      fetchMatchesFromAPI(),
    ]);
    const pointsTable = pointsResult.teams;
    const apiMatches = matchesResult.matches;

    const schedule = loadSchedule();
    const outputPath = join(ROOT, 'src', 'utils', 'iplData.js');
    let previousPoints = pointsTable;
    let previousCompleted = [];
    let previousRemaining = schedule;
    try {
      const oldFile = readFileSync(outputPath, 'utf-8');
      const parsed = parseExistingDataFromFile(oldFile);
      if (parsed.pointsTable) previousPoints = parsed.pointsTable;
      if (parsed.completedMatches) previousCompleted = parsed.completedMatches;
      if (parsed.remainingMatches) previousRemaining = parsed.remainingMatches;
    } catch {
      // First run or missing file; keep latest points as baseline.
    }

    const yesterdayDate = getYesterdayISTDateString();
    const yesterdayMatchesFromAPI = apiMatches.filter((m) => (m.date || '').slice(0, 10) === yesterdayDate);
    const yesterdayTeams = new Set();
    yesterdayMatchesFromAPI.forEach((m) => {
      if (m.team1) yesterdayTeams.add(m.team1);
      if (m.team2) yesterdayTeams.add(m.team2);
    });

    printDummyPointsTable(pointsTable);
    const { updatedPoints, changedTeams } = updatePointsTablePreserveNRRandNoResult(previousPoints, pointsTable);

    const recentCompleted = getRecentCompletedMatches(schedule, apiMatches);
    const { updatedCompleted, updatedRemaining, updatedKeys } = mergeRecentCompleted(
      previousCompleted,
      previousRemaining,
      recentCompleted
    );

    const fileContent = generateIPLDataFile(updatedPoints, updatedCompleted, updatedRemaining);

    writeFileSync(outputPath, fileContent, 'utf-8');
    console.log('Successfully updated src/utils/iplData.js');

    const dumpPath = join(ROOT, 'src', 'data', 'api-dump.latest.json');
    writeFileSync(
      dumpPath,
      JSON.stringify(
        {
          fetchedAt: new Date().toISOString(),
          yesterdayDateIST: yesterdayDate,
          pointsRaw: pointsResult.raw,
          seriesRaw: matchesResult.raw,
          extracted: {
            pointsTable,
            yesterdayMatchesFromAPI,
            recentCompleted,
            yesterdayTeams: [...yesterdayTeams],
            changedTeams,
            movedMatchKeys: updatedKeys,
          },
        },
        null,
        2
      ),
      'utf-8'
    );
    console.log('Saved full API dump + extracted parts to src/data/api-dump.latest.json');

    const topTeams = updatedPoints.slice(0, 4).map((t) => `${t.short}: ${t.points} pts`).join(', ');
    console.log(`\nTop 4: ${topTeams}`);
    console.log(`Completed matches: ${updatedCompleted.length}`);
    console.log(`Remaining matches: ${updatedRemaining.length}`);
    console.log(`Yesterday (IST: ${yesterdayDate}) teams: ${[...yesterdayTeams].join(', ') || 'None'}`);
    console.log(`Points changed for teams: ${changedTeams.join(', ') || 'None'}`);
    console.log(`Last-24h completed matches moved: ${updatedKeys.length}`);

    if (updatedCompleted.length > 0) {
      console.log('\nMost recent completed match:');
      const sample = updatedCompleted[0];
      console.log(`  Match ${sample.matchNumber}: ${sample.team1} vs ${sample.team2}`);
      console.log(`  Status: ${sample.status}`);
      console.log(`  Winner: ${sample.winner}`);
    }
  } catch (error) {
    console.error('Failed to update IPL data:', error.message);
    console.log('Keeping existing data unchanged');
    process.exit(1);
  }
}

main();
