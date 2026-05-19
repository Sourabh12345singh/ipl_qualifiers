import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const POINTS_TABLE_PROMPT = `Give me the latest Indian Premier League (IPL) points table for the current IPL season in VALID JSON format only.

Requirements:
- Return ONLY raw JSON
- No markdown
- No explanation text
- No comments

For each team include:
- team
- short
- played
- won
- lost
- noResult
- points
- nrr

Example format:
[
  {
    "team": "Royal Challengers Bengaluru",
    "short": "RCB",
    "played": 12,
    "won": 8,
    "lost": 4,
    "noResult": 0,
    "points": 16,
    "nrr": 0.482
  }
]

Also provide remaining IPL league stage fixtures in this exact JSON format:
[
  {
    "id": 1,
    "team1": "RCB",
    "team2": "CSK",
    "date": "2026-05-20"
  }
]

Rules:
- Use official latest standings
- Use correct Net Run Rate values
- Include only remaining league matches
- Exclude completed matches
- Keep all numeric values as numbers
- Ensure JSON is valid and parseable

Return BOTH arrays in a single JSON object like:
{
  "pointsTable": [...],
  "remainingMatches": [...]
}`;

const REMAINING_MATCHES_PROMPT = `Give me all remaining Indian Premier League (IPL) league-stage fixtures for the current IPL season in VALID JSON format only.

Requirements:
- Return ONLY raw JSON
- No markdown
- No explanations
- No comments

Return format:
[
  {
    "id": 1,
    "matchNumber": 57,
    "team1": "RCB",
    "team2": "CSK",
    "date": "2026-05-20",
    "time": "19:30",
    "venue": "M Chinnaswamy Stadium"
  }
]

Rules:
- Include ONLY upcoming league-stage matches
- Exclude completed matches
- Exclude playoffs and final
- Include all remaining matches until every team completes 14 league matches
- Use team short names like:
  RCB, CSK, MI, GT, RR, SRH, KKR, PBKS, DC, LSG
- Keep date format as YYYY-MM-DD
- Keep time in IST 24-hour format
- Ensure JSON is valid and parseable
- Match IDs should be unique integers
- Sort matches chronologically`;

export const fetchIPLData = async () => {
  const result = await model.generateContent(POINTS_TABLE_PROMPT);
  const response = await result.response;
  const text = response.text();

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON found in response');

  const parsed = JSON.parse(jsonMatch[0]);
  return parsed;
};

export const fetchRemainingMatches = async () => {
  const result = await model.generateContent(REMAINING_MATCHES_PROMPT);
  const response = await result.response;
  const text = response.text();

  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('No JSON found in response');

  return JSON.parse(jsonMatch[0]);
};
