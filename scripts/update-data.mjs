import { GoogleGenerativeAI } from '@google/generative-ai';
import { readFileSync, writeFileSync } from 'fs';
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

const PROMPT = `Give me the latest Indian Premier League (IPL) points table and remaining matches for the current IPL season in VALID JSON format only.

Return ONLY a raw JSON object with this exact structure. No markdown, no explanation, no code blocks.

{
  "pointsTable": [
    {
      "team": "Royal Challengers Bengaluru",
      "short": "RCB",
      "played": 13,
      "won": 9,
      "lost": 4,
      "noResult": 0,
      "points": 18,
      "nrr": 1.065
    }
  ],
  "remainingMatches": [
    {
      "id": 1,
      "team1": "RR",
      "team2": "CSK",
      "date": "2026-05-20",
      "venue": "Sawai Mansingh Stadium"
    }
  ]
}

Rules:
- Use official latest IPL standings
- Use correct Net Run Rate values
- Include all 10 teams in pointsTable
- Include ONLY remaining league-stage matches in remainingMatches
- Exclude completed matches, playoffs, and final
- Use team short names: RCB, CSK, MI, GT, RR, SRH, KKR, PBKS, DC, LSG
- Keep date format as YYYY-MM-DD
- Keep all numeric values as numbers (not strings)
- Ensure JSON is valid and parseable
- Sort pointsTable by points DESC, then NRR DESC
- Sort remainingMatches chronologically`;

async function fetchIPLData() {
  console.log('Fetching IPL data from Gemini API...');

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const result = await model.generateContent(PROMPT);
  const response = await result.response;
  const text = response.text();

  console.log('Raw response length:', text.length);

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No valid JSON object found in Gemini response');
  }

  const data = JSON.parse(jsonMatch[0]);

  if (!data.pointsTable || !Array.isArray(data.pointsTable)) {
    throw new Error('Response missing pointsTable array');
  }
  if (!data.remainingMatches || !Array.isArray(data.remainingMatches)) {
    throw new Error('Response missing remainingMatches array');
  }

  console.log(`Parsed ${data.pointsTable.length} teams and ${data.remainingMatches.length} matches`);
  return data;
}

function generateIPLDataFile(data) {
  const pointsTableJSON = JSON.stringify(data.pointsTable, null, 4);
  const remainingMatchesJSON = JSON.stringify(data.remainingMatches, null, 4);

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
    const data = await fetchIPLData();
    const fileContent = generateIPLDataFile(data);
    const outputPath = join(ROOT, 'src', 'utils', 'iplData.js');

    writeFileSync(outputPath, fileContent, 'utf-8');
    console.log('Successfully updated src/utils/iplData.js');

    const teams = data.pointsTable.map((t) => `${t.short}: ${t.points} pts`).join(', ');
    console.log(`\nTop teams: ${teams}`);
    console.log(`Remaining matches: ${data.remainingMatches.length}`);
  } catch (error) {
    console.error('Failed to update IPL data:', error.message);
    console.log('Keeping existing data unchanged');
    process.exit(1);
  }
}

main();
