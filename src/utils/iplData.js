const CACHE_KEY = 'ipl_data_cache';
const CACHE_TIMESTAMP_KEY = 'ipl_data_timestamp';

const defaultData = {
  lastUpdated: '2026-05-21T12:20:22.120Z',
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
        "played": 13,
        "won": 8,
        "lost": 5,
        "noResult": 0,
        "points": 16,
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
        "played": 13,
        "won": 6,
        "lost": 7,
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
    { "match": 1, "date": "28-Mar", "time": "07:30 PM", "venue": "Bengaluru", "teams": "RCB vs SRH", "status": "RCB won by 6 wickets" },
    { "match": 2, "date": "29-Mar", "time": "07:30 PM", "venue": "Mumbai", "teams": "MI vs KKR", "status": "MI won by 6 wickets" },
    { "match": 3, "date": "30-Mar", "time": "07:30 PM", "venue": "Guwahati", "teams": "RR vs CSK", "status": "RR won by 8 wickets" },
    { "match": 4, "date": "31-Mar", "time": "07:30 PM", "venue": "New Chandigarh", "teams": "PBKS vs GT", "status": "PBKS won by 3 wickets" },
    { "match": 5, "date": "01-Apr", "time": "07:30 PM", "venue": "Lucknow", "teams": "LSG vs DC", "status": "DC won by 6 wickets" },
    { "match": 6, "date": "02-Apr", "time": "07:30 PM", "venue": "Kolkata", "teams": "KKR vs SRH", "status": "SRH won by 65 runs" },
    { "match": 7, "date": "03-Apr", "time": "07:30 PM", "venue": "Chennai", "teams": "CSK vs PBKS", "status": "PBKS won by 5 wickets" },
    { "match": 8, "date": "04-Apr", "time": "03:30 PM", "venue": "Delhi", "teams": "DC vs MI", "status": "DC won by 6 wickets" },
    { "match": 9, "date": "04-Apr", "time": "07:30 PM", "venue": "Ahmedabad", "teams": "GT vs RR", "status": "RR won by 6 runs" },
    { "match": 10, "date": "05-Apr", "time": "03:30 PM", "venue": "Hyderabad", "teams": "SRH vs LSG", "status": "LSG won by 5 wickets" },
    { "match": 11, "date": "05-Apr", "time": "07:30 PM", "venue": "Bengaluru", "teams": "RCB vs CSK", "status": "RCB won by 43 runs" },
    { "match": 12, "date": "06-Apr", "time": "07:30 PM", "venue": "Kolkata", "teams": "KKR vs PBKS", "status": "No result" },
    { "match": 13, "date": "07-Apr", "time": "07:30 PM", "venue": "Guwahati", "teams": "RR vs MI", "status": "RR won by 27 runs" },
    { "match": 14, "date": "08-Apr", "time": "07:30 PM", "venue": "Delhi", "teams": "DC vs GT", "status": "GT won by 1 run" },
    { "match": 15, "date": "09-Apr", "time": "07:30 PM", "venue": "Kolkata", "teams": "KKR vs LSG", "status": "LSG won by 3 wickets" },
    { "match": 16, "date": "10-Apr", "time": "07:30 PM", "venue": "Guwahati", "teams": "RR vs RCB", "status": "RR won by 6 wickets" },
    { "match": 17, "date": "11-Apr", "time": "03:30 PM", "venue": "New Chandigarh", "teams": "PBKS vs SRH", "status": "PBKS won by 6 wickets" },
    { "match": 18, "date": "11-Apr", "time": "07:30 PM", "venue": "Chennai", "teams": "CSK vs DC", "status": "CSK won by 23 runs" },
    { "match": 19, "date": "12-Apr", "time": "03:30 PM", "venue": "Lucknow", "teams": "LSG vs GT", "status": "GT won by 7 wickets" },
    { "match": 20, "date": "12-Apr", "time": "07:30 PM", "venue": "Mumbai", "teams": "MI vs RCB", "status": "RCB won by 18 runs" },
    { "match": 21, "date": "13-Apr", "time": "07:30 PM", "venue": "Hyderabad", "teams": "SRH vs RR", "status": "SRH won by 57 runs" },
    { "match": 22, "date": "14-Apr", "time": "07:30 PM", "venue": "Chennai", "teams": "CSK vs KKR", "status": "CSK won by 32 runs" },
    { "match": 23, "date": "15-Apr", "time": "07:30 PM", "venue": "Bengaluru", "teams": "RCB vs LSG", "status": "RCB won by 5 wickets" },
    { "match": 24, "date": "16-Apr", "time": "07:30 PM", "venue": "Mumbai", "teams": "MI vs PBKS", "status": "PBKS won by 7 wickets" },
    { "match": 25, "date": "17-Apr", "time": "07:30 PM", "venue": "Ahmedabad", "teams": "GT vs KKR", "status": "GT won by 5 wickets" },
    { "match": 26, "date": "18-Apr", "time": "03:30 PM", "venue": "Bengaluru", "teams": "RCB vs DC", "status": "DC won by 6 wickets" },
    { "match": 27, "date": "18-Apr", "time": "07:30 PM", "venue": "Hyderabad", "teams": "SRH vs CSK", "status": "SRH won by 10 runs" },
    { "match": 28, "date": "19-Apr", "time": "03:30 PM", "venue": "Kolkata", "teams": "KKR vs RR", "status": "KKR won by 4 wickets" },
    { "match": 29, "date": "19-Apr", "time": "07:30 PM", "venue": "New Chandigarh", "teams": "PBKS vs LSG", "status": "PBKS won by 54 runs" },
    { "match": 30, "date": "20-Apr", "time": "07:30 PM", "venue": "Ahmedabad", "teams": "GT vs MI", "status": "MI won by 99 runs" },
    { "match": 31, "date": "21-Apr", "time": "07:30 PM", "venue": "Hyderabad", "teams": "SRH vs DC", "status": "SRH won by 47 runs" },
    { "match": 32, "date": "22-Apr", "time": "07:30 PM", "venue": "Lucknow", "teams": "LSG vs RR", "status": "RR won by 40 runs" },
    { "match": 33, "date": "23-Apr", "time": "07:30 PM", "venue": "Mumbai", "teams": "MI vs CSK", "status": "CSK won by 103 runs" },
    { "match": 34, "date": "24-Apr", "time": "07:30 PM", "venue": "Bengaluru", "teams": "RCB vs GT", "status": "RCB won by 5 wickets" },
    { "match": 35, "date": "25-Apr", "time": "03:30 PM", "venue": "Delhi", "teams": "DC vs PBKS", "status": "PBKS won by 6 wickets" },
    { "match": 36, "date": "25-Apr", "time": "07:30 PM", "venue": "Jaipur", "teams": "RR vs SRH", "status": "SRH won by 5 wickets" },
    { "match": 37, "date": "26-Apr", "time": "03:30 PM", "venue": "Chennai", "teams": "GT vs CSK", "status": "GT won by 8 wickets" },
    { "match": 38, "date": "26-Apr", "time": "07:30 PM", "venue": "Lucknow", "teams": "LSG vs KKR", "status": "KKR won the Super Over" },
    { "match": 39, "date": "27-Apr", "time": "07:30 PM", "venue": "Delhi", "teams": "DC vs RCB", "status": "RCB won by 9 wickets" },
    { "match": 40, "date": "28-Apr", "time": "07:30 PM", "venue": "New Chandigarh", "teams": "PBKS vs RR", "status": "RR won by 6 wickets" },
    { "match": 41, "date": "29-Apr", "time": "07:30 PM", "venue": "Mumbai", "teams": "MI vs SRH", "status": "SRH won by 6 wickets" },
    { "match": 42, "date": "30-Apr", "time": "07:30 PM", "venue": "Ahmedabad", "teams": "GT vs RCB", "status": "GT won by 4 wickets" },
    { "match": 43, "date": "01-May", "time": "07:30 PM", "venue": "Jaipur", "teams": "RR vs DC", "status": "DC won by 7 wickets" },
    { "match": 44, "date": "02-May", "time": "07:30 PM", "venue": "Chennai", "teams": "CSK vs MI", "status": "CSK won by 8 wickets" },
    { "match": 45, "date": "03-May", "time": "03:30 PM", "venue": "Hyderabad", "teams": "SRH vs KKR", "status": "KKR won by 7 wickets" },
    { "match": 46, "date": "03-May", "time": "07:30 PM", "venue": "Ahmedabad", "teams": "GT vs PBKS", "status": "GT won by 4 wickets" },
    { "match": 47, "date": "04-May", "time": "07:30 PM", "venue": "Mumbai", "teams": "MI vs LSG", "status": "MI won by 6 wickets" },
    { "match": 48, "date": "05-May", "time": "07:30 PM", "venue": "Delhi", "teams": "DC vs CSK", "status": "CSK won by 8 wickets" },
    { "match": 49, "date": "06-May", "time": "07:30 PM", "venue": "Hyderabad", "teams": "SRH vs PBKS", "status": "SRH won by 33 runs" },
    { "match": 50, "date": "07-May", "time": "07:30 PM", "venue": "Lucknow", "teams": "LSG vs RCB", "status": "LSG won by 9 runs (DLS)" },
    { "match": 51, "date": "08-May", "time": "07:30 PM", "venue": "Delhi", "teams": "DC vs KKR", "status": "KKR won by 8 wickets" },
    { "match": 52, "date": "09-May", "time": "07:30 PM", "venue": "Jaipur", "teams": "RR vs GT", "status": "GT won by 77 runs" },
    { "match": 53, "date": "10-May", "time": "03:30 PM", "venue": "Chennai", "teams": "CSK vs LSG", "status": "CSK won by 5 wickets" },
    { "match": 54, "date": "10-May", "time": "07:30 PM", "venue": "Raipur", "teams": "RCB vs MI", "status": "RCB won by 2 wickets" },
    { "match": 55, "date": "11-May", "time": "07:30 PM", "venue": "Dharamshala", "teams": "PBKS vs DC", "status": "DC won by 3 wickets" },
    { "match": 56, "date": "12-May", "time": "07:30 PM", "venue": "Ahmedabad", "teams": "GT vs SRH", "status": "GT won by 82 runs" },
    { "match": 57, "date": "13-May", "time": "07:30 PM", "venue": "Raipur", "teams": "RCB vs KKR", "status": "RCB won by 6 wickets" },
    { "match": 58, "date": "14-May", "time": "07:30 PM", "venue": "Dharamshala", "teams": "PBKS vs MI", "status": "MI won by 6 wickets" },
    { "match": 59, "date": "15-May", "time": "07:30 PM", "venue": "Lucknow", "teams": "LSG vs CSK", "status": "LSG won by 7 wickets" },
    { "match": 60, "date": "16-May", "time": "07:30 PM", "venue": "Kolkata", "teams": "KKR vs GT", "status": "KKR won by 29 runs" },
    { "match": 61, "date": "17-May", "time": "03:30 PM", "venue": "Dharamshala", "teams": "PBKS vs RCB", "status": "RCB won by 23 runs" },
    { "match": 62, "date": "17-May", "time": "07:30 PM", "venue": "Delhi", "teams": "DC vs RR", "status": "DC won by 5 wickets" },
    { "match": 63, "date": "18-May", "time": "07:30 PM", "venue": "Chennai", "teams": "CSK vs SRH", "status": "SRH won by 5 wickets" },
    { "match": 64, "date": "19-May", "time": "07:30 PM", "venue": "Jaipur", "teams": "RR vs LSG", "status": "RR won by 7 wickets" },
    { "match": 65, "date": "20-May", "time": "07:30 PM", "venue": "Kolkata", "teams": "KKR vs MI", "status": "KKR won by 4 wickets" }
  ],
  remainingMatches: [
    {
        "id": 66,
        "matchNumber": 66,
        "team1": "GT",
        "team2": "CSK",
        "date": "2026-05-21",
        "time": "19:30",
        "venue": "Narendra Modi Stadium",
        "status": "Upcoming",
        "winner": "",
        "team1Score": "",
        "team2Score": ""
    },
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

  // Always trust in-repo default data so manual updates show immediately.
  // Cache is only a mirror and never the source of truth.
  if (cached?.lastUpdated !== defaultData.lastUpdated) {
    setCachedData(defaultData);
    return defaultData;
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
  // Prefer the IPL data timestamp (manual/script update time), not cache write time.
  if (defaultData?.lastUpdated) {
    return new Date(defaultData.lastUpdated).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

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
