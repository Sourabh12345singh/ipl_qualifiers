import { GoogleGenerativeAI } from '@google/generative-ai';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('ERROR: GEMINI_API_KEY environment variable is not set');
  process.exit(1);
}

const POINTS_TABLE_PROMPT = `Return IPL 2026 points table as JSON array.
Fields: team, short, played, won, lost, noResult, points, nrr.
All 10 teams. Sort by points DESC then NRR DESC.
Raw JSON only. No markdown.`;

const REMAINING_MATCHES_PROMPT = `Return remaining IPL 2026 league matches as JSON array.
Fields: id, team1, team2, date, venue.
Exclude completed/playoff matches. Sort by date.
Raw JSON only. No markdown.`;

const RETRY_DELAYS = [5000, 15000, 30000];

async function callGemini(prompt, retries = 0) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No valid JSON array found in response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    if (error.message.includes('429') && retries < RETRY_DELAYS.length) {
      const delay = RETRY_DELAYS[retries];
      console.log(`Rate limited. Waiting ${delay / 1000}s before retry ${retries + 1}/${RETRY_DELAYS.length}...`);
      await new Promise((r) => setTimeout(r, delay));
      return callGemini(prompt, retries + 1);
    }
    throw error;
  }
}

async function fetchPointsTable() {
  console.log('Fetching points table...');
  const data = await callGemini(POINTS_TABLE_PROMPT);
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Invalid points table response');
  }
  console.log(`Got ${data.length} teams`);
  return data;
}

async function fetchRemainingMatches() {
  console.log('Fetching remaining matches...');
  const data = await callGemini(REMAINING_MATCHES_PROMPT);
  if (!Array.isArray(data)) {
    throw new Error('Invalid remaining matches response');
  }
  console.log(`Got ${data.length} matches`);
  return data;
}

function generateIPLDataFile(pointsTable, remainingMatches) {
  const pointsTableJSON = JSON.stringify(pointsTable, null, 4);
  const remainingMatchesJSON = JSON.stringify(remainingMatches, null, 4);

  return `const CACHE_KEY = 'ipl_data_cache';
const CACHE_TIMESTAMP_KEY = 'ipl_data_timestamp';
const REFRESH_INTERVAL_MS = 12 * 60 * 60 * 1000;

const defaultData = {
  pointsTable: ${pointsTableJSON},
  remainingMatches: ${remainingMatchesJSON},
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
    const [pointsTable, remainingMatches] = await Promise.all([
      fetchPointsTable(),
      fetchRemainingMatches(),
    ]);

    const fileContent = generateIPLDataFile(pointsTable, remainingMatches);
    const outputPath = join(ROOT, 'src', 'utils', 'iplData.js');

    writeFileSync(outputPath, fileContent, 'utf-8');
    console.log('Successfully updated src/utils/iplData.js');

    const topTeams = pointsTable.slice(0, 4).map((t) => `${t.short}: ${t.points} pts`).join(', ');
    console.log(`\nTop 4: ${topTeams}`);
    console.log(`Remaining matches: ${remainingMatches.length}`);
  } catch (error) {
    console.error('Failed to update IPL data:', error.message);
    console.log('Keeping existing data unchanged');
    process.exit(1);
  }
}

main();
