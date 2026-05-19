const CACHE_KEY = 'ipl_data_cache';
const CACHE_TIMESTAMP_KEY = 'ipl_data_timestamp';
const REFRESH_INTERVAL_MS = 12 * 60 * 60 * 1000;

const defaultData = {
  pointsTable: [
    { team: 'Royal Challengers Bengaluru', short: 'RCB', played: 13, won: 9, lost: 4, noResult: 0, points: 18, nrr: 1.065 },
    { team: 'Gujarat Titans', short: 'GT', played: 13, won: 8, lost: 5, noResult: 0, points: 16, nrr: 0.4 },
    { team: 'Sunrisers Hyderabad', short: 'SRH', played: 13, won: 8, lost: 5, noResult: 0, points: 16, nrr: 0.35 },
    { team: 'Punjab Kings', short: 'PBKS', played: 13, won: 6, lost: 6, noResult: 1, points: 13, nrr: 0.227 },
    { team: 'Rajasthan Royals', short: 'RR', played: 12, won: 6, lost: 6, noResult: 0, points: 12, nrr: 0.027 },
    { team: 'Chennai Super Kings', short: 'CSK', played: 13, won: 6, lost: 7, noResult: 0, points: 12, nrr: -0.016 },
    { team: 'Delhi Capitals', short: 'DC', played: 13, won: 6, lost: 7, noResult: 0, points: 12, nrr: -0.871 },
    { team: 'Kolkata Knight Riders', short: 'KKR', played: 12, won: 5, lost: 6, noResult: 1, points: 11, nrr: -0.038 },
    { team: 'Mumbai Indians', short: 'MI', played: 12, won: 4, lost: 8, noResult: 0, points: 8, nrr: -0.504 },
    { team: 'Lucknow Super Giants', short: 'LSG', played: 12, won: 4, lost: 8, noResult: 0, points: 8, nrr: -0.701 },
  ],
  remainingMatches: [
    { id: 1, team1: 'RR', team2: 'CSK', date: '2026-05-20', venue: 'Sawai Mansingh Stadium' },
    { id: 2, team1: 'KKR', team2: 'MI', date: '2026-05-21', venue: 'Eden Gardens' },
    { id: 3, team1: 'LSG', team2: 'DC', date: '2026-05-22', venue: 'BRSABV Ekana Stadium' },
    { id: 4, team1: 'RCB', team2: 'GT', date: '2026-05-23', venue: 'M Chinnaswamy Stadium' },
    { id: 5, team1: 'SRH', team2: 'PBKS', date: '2026-05-24', venue: 'Rajiv Gandhi Stadium' },
    { id: 6, team1: 'MI', team2: 'RR', date: '2026-05-25', venue: 'Wankhede Stadium' },
  ],
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
