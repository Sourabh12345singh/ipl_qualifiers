import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const API_KEY = process.env.CRICAPI_KEY;
if (!API_KEY) {
  console.error('ERROR: CRICAPI_KEY environment variable is not set');
  process.exit(1);
}

const POINTS_API_URL = `https://api.cricapi.com/v1/series_points?apikey=${API_KEY}&id=bb1f6346-0f9c-4de6-961e-ccf1c8f076a0`;
const SERIES_API_URL = `https://api.cricapi.com/v1/series_info?apikey=${API_KEY}&id=87c62aac-bc3c-4738-ab93-19da0690488f`;

const RETRY_DELAYS = [5000, 15000, 30000];

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
};

function normalizeTeamName(name) {
  if (!name) return '';
  const trimmed = name.trim();
  return TEAM_MAP[trimmed] || trimmed;
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
    team: t.name || t.team || '',
    short: (t.name || t.team || '').split(' ').map((w) => w[0]).join('').toUpperCase() || t.short || '',
    played: parseInt(t.matches || t.played || 0),
    won: parseInt(t.won || 0),
    lost: parseInt(t.lost || 0),
    noResult: parseInt(t.noResult || 0),
    points: parseInt(t.points || 0),
    nrr: parseFloat(t.nrr || 0),
  }));

  teams.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.nrr - a.nrr;
  });

  console.log(`Got ${teams.length} teams`);
  return teams;
}

async function fetchMatchesFromAPI() {
  console.log('Fetching matches from CricAPI...');
  const data = await fetchWithRetry(SERIES_API_URL);

  if (!data.data || !data.data.matches || !Array.isArray(data.data.matches)) {
    console.log('No matches data from CricAPI');
    return [];
  }

  const matches = data.data.matches.map((m) => {
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

    const scores = m.score || [];

    return {
      matchNumber: m.matchNumber || m.match || 0,
      team1: team1Short,
      team2: team2Short,
      team1Full,
      team2Full,
      date: m.date || '',
      venue: m.venue || '',
      status,
      winner,
      team1Score: scores[0] || '',
      team2Score: scores[1] || '',
    };
  });

  console.log(`Got ${matches.length} matches from CricAPI`);
  return matches;
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
    const [pointsTable, apiMatches] = await Promise.all([
      fetchPointsTable(),
      fetchMatchesFromAPI(),
    ]);

    const schedule = loadSchedule();
    const { completed, remaining } = classifyMatches(schedule, apiMatches);

    const fileContent = generateIPLDataFile(pointsTable, completed, remaining);
    const outputPath = join(ROOT, 'src', 'utils', 'iplData.js');

    writeFileSync(outputPath, fileContent, 'utf-8');
    console.log('Successfully updated src/utils/iplData.js');

    const topTeams = pointsTable.slice(0, 4).map((t) => `${t.short}: ${t.points} pts`).join(', ');
    console.log(`\nTop 4: ${topTeams}`);
    console.log(`Completed matches: ${completed.length}`);
    console.log(`Remaining matches: ${remaining.length}`);

    if (completed.length > 0) {
      console.log('\nMost recent completed match:');
      const sample = completed[0];
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
