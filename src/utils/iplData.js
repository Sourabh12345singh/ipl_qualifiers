const CACHE_KEY = 'ipl_data_cache';
const CACHE_TIMESTAMP_KEY = 'ipl_data_timestamp';
const REFRESH_INTERVAL_MS = 24 * 60 * 60 * 1000;

const defaultData = {
  lastUpdated: '2026-05-22T01:00:40.814Z',
  pointsTable: [
    {
        "team": "Royal Challengers Bengaluru",
        "short": "RCBW",
        "played": 13,
        "won": 9,
        "lost": 4,
        "noResult": 0,
        "points": 18,
        "nrr": 1.065
    },
    {
        "team": "Gujarat Titans",
        "short": "GT",
        "played": 14,
        "won": 9,
        "lost": 5,
        "noResult": 0,
        "points": 18,
        "nrr": 0.4
    },
    {
        "team": "Sunrisers Hyderabad",
        "short": "SRH",
        "played": 13,
        "won": 8,
        "lost": 5,
        "noResult": 0,
        "points": 16,
        "nrr": 0.35
    },
    {
        "team": "Rajasthan Royals",
        "short": "RR",
        "played": 13,
        "won": 7,
        "lost": 6,
        "noResult": 0,
        "points": 14,
        "nrr": 0.083
    },
    {
        "team": "Punjab Kings",
        "short": "PBKS",
        "played": 13,
        "won": 6,
        "lost": 6,
        "noResult": 1,
        "points": 13,
        "nrr": 0.227
    },
    {
        "team": "Kolkata Knight Riders",
        "short": "KKR",
        "played": 13,
        "won": 5,
        "lost": 6,
        "noResult": 1,
        "points": 12,
        "nrr": 0.011
    },
    {
        "team": "Chennai Super Kings",
        "short": "CSK",
        "played": 14,
        "won": 6,
        "lost": 8,
        "noResult": 0,
        "points": 12,
        "nrr": -0.016
    },
    {
        "team": "Delhi Capitals",
        "short": "DC",
        "played": 13,
        "won": 6,
        "lost": 7,
        "noResult": 0,
        "points": 12,
        "nrr": -0.871
    },
    {
        "team": "Mumbai Indians",
        "short": "MI",
        "played": 13,
        "won": 4,
        "lost": 9,
        "noResult": 0,
        "points": 8,
        "nrr": -0.51
    },
    {
        "team": "Lucknow Super Giants",
        "short": "LSG",
        "played": 13,
        "won": 3,
        "lost": 9,
        "noResult": 0,
        "points": 7,
        "nrr": -0.702
    }
],
  completedMatches: [
    {
        "id": 66,
        "matchNumber": 66,
        "team1": "GT",
        "team2": "CSK",
        "date": "2026-05-21",
        "time": "19:30",
        "venue": "Narendra Modi Stadium",
        "status": "Gujarat Titans won by 89 runs",
        "winner": "GT",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "match": 65,
        "date": "20-May",
        "time": "07:30 PM",
        "venue": "Kolkata",
        "teams": "KKR vs MI",
        "status": "KKR won by 4 wickets"
    }
],
  remainingMatches: [
    {
        "id": 67,
        "matchNumber": 67,
        "team1": "SRH",
        "team2": "RCB",
        "date": "2026-05-22",
        "time": "19:30",
        "venue": "Rajiv Gandhi International Cricket Stadium",
        "status": "Upcoming",
        "winner": "",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 68,
        "matchNumber": 68,
        "team1": "LSG",
        "team2": "PBKS",
        "date": "2026-05-23",
        "time": "19:30",
        "venue": "BRSABV Ekana Stadium",
        "status": "Upcoming",
        "winner": "",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 69,
        "matchNumber": 69,
        "team1": "MI",
        "team2": "RR",
        "date": "2026-05-24",
        "time": "15:30",
        "venue": "Wankhede Stadium",
        "status": "Upcoming",
        "winner": "",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 70,
        "matchNumber": 70,
        "team1": "KKR",
        "team2": "DC",
        "date": "2026-05-24",
        "time": "19:30",
        "venue": "Eden Gardens",
        "status": "Upcoming",
        "winner": "",
        "team1Score": "",
        "team2Score": ""
    }
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
