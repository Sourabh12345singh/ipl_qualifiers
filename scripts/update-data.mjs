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

async function fetchCompletedMatches() {
  console.log('Fetching series info from CricAPI...');
  const data = await fetchWithRetry(SERIES_API_URL);

  if (!data.data || !data.data.matches || !Array.isArray(data.data.matches)) {
    console.log('No completed matches data from CricAPI');
    return [];
  }

  const completed = data.data.matches
    .filter((m) => m.matchStatus?.toLowerCase().includes('won') || m.matchStatus?.toLowerCase().includes('completed'))
    .map((m) => ({
      matchNumber: m.matchNumber || m.match || 0,
      team1: m.teams?.[0] || '',
      team2: m.teams?.[1] || '',
      date: m.date || '',
      venue: m.venue || '',
      winner: m.winner || '',
      result: m.matchStatus || '',
      team1Score: m.score?.[0] || '',
      team2Score: m.score?.[1] || '',
    }));

  console.log(`Got ${completed.length} completed matches from CricAPI`);
  return completed;
}

function loadSchedule() {
  const schedulePath = join(ROOT, 'src', 'data', 'schedule.json');
  const raw = readFileSync(schedulePath, 'utf-8');
  return JSON.parse(raw);
}

function classifyMatches(schedule, completedFromAPI) {
  const now = Date.now();
  const fourHoursMs = 4 * 60 * 60 * 1000;

  const completedMap = new Map();
  completedFromAPI.forEach((m) => {
    const key = `${m.team1}-${m.team2}-${m.date}`;
    completedMap.set(key, m);
  });

  const completed = [];
  const remaining = [];

  schedule.forEach((match) => {
    const matchStart = new Date(`${match.date}T${match.time}+05:30`).getTime();
    const isCompleted = (now - matchStart) > fourHoursMs;

    const apiMatch = completedMap.get(`${match.team1}-${match.team2}-${match.date}`);

    if (isCompleted || apiMatch) {
      completed.push({
        id: match.id,
        matchNumber: match.matchNumber,
        team1: match.team1,
        team2: match.team2,
        date: match.date,
        venue: match.venue,
        winner: apiMatch?.winner || '',
        result: apiMatch?.result || 'Completed',
        team1Score: apiMatch?.team1Score || '',
        team2Score: apiMatch?.team2Score || '',
      });
    } else {
      remaining.push({
        id: match.id,
        matchNumber: match.matchNumber,
        team1: match.team1,
        team2: match.team2,
        date: match.date,
        venue: match.venue,
      });
    }
  });

  console.log(`Classified: ${completed.length} completed, ${remaining.length} remaining`);
  return { completed, remaining };
}

function generateIPLDataFile(pointsTable, completedMatches, remainingMatches) {
  const pointsJSON = JSON.stringify(pointsTable, null, 4);
  const completedJSON = JSON.stringify(completedMatches, null, 4);
  const remainingJSON = JSON.stringify(remainingMatches, null, 4);

  return `const CACHE_KEY = 'ipl_data_cache';
const CACHE_TIMESTAMP_KEY = 'ipl_data_timestamp';
const REFRESH_INTERVAL_MS = 24 * 60 * 60 * 1000;

const defaultData = {
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
    const [pointsTable, completedFromAPI] = await Promise.all([
      fetchPointsTable(),
      fetchCompletedMatches(),
    ]);

    const schedule = loadSchedule();
    const { completed, remaining } = classifyMatches(schedule, completedFromAPI);

    const fileContent = generateIPLDataFile(pointsTable, completed, remaining);
    const outputPath = join(ROOT, 'src', 'utils', 'iplData.js');

    writeFileSync(outputPath, fileContent, 'utf-8');
    console.log('Successfully updated src/utils/iplData.js');

    const topTeams = pointsTable.slice(0, 4).map((t) => `${t.short}: ${t.points} pts`).join(', ');
    console.log(`\nTop 4: ${topTeams}`);
    console.log(`Completed matches: ${completed.length}`);
    console.log(`Remaining matches: ${remaining.length}`);
  } catch (error) {
    console.error('Failed to update IPL data:', error.message);
    console.log('Keeping existing data unchanged');
    process.exit(1);
  }
}

main();
