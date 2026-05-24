const CACHE_KEY = 'ipl_data_cache';
const CACHE_TIMESTAMP_KEY = 'ipl_data_timestamp';
const REFRESH_INTERVAL_MS = 24 * 60 * 60 * 1000;

const defaultData = {
  lastUpdated: '2026-05-24T02:03:35.360Z',
  pointsTable: [
    {
        "team": "Royal Challengers Bengaluru",
        "short": "RCB",
        "played": 14,
        "won": 9,
        "lost": 5,
        "noResult": 0,
        "points": 18,
        "nrr": 0.783
    },
    {
        "team": "Gujarat Titans",
        "short": "GT",
        "played": 14,
        "won": 9,
        "lost": 5,
        "noResult": 0,
        "points": 18,
        "nrr": 0.695
    },
    {
        "team": "Sunrisers Hyderabad",
        "short": "SRH",
        "played": 14,
        "won": 9,
        "lost": 5,
        "noResult": 0,
        "points": 18,
        "nrr": 0.524
    },
    {
        "team": "Punjab Kings",
        "short": "PBKS",
        "played": 14,
        "won": 7,
        "lost": 6,
        "noResult": 1,
        "points": 15,
        "nrr": 0.309
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
        "team": "Kolkata Knight Riders",
        "short": "KKR",
        "played": 13,
        "won": 5,
        "lost": 6,
        "noResult": 1,
        "points": 13,
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
        "nrr": -0.345
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
        "played": 14,
        "won": 3,
        "lost": 10,
        "noResult": 0,
        "points": 8,
        "nrr": -0.740
    }
],
  completedMatches: [
    {
        "id": 68,
        "matchNumber": 68,
        "team1": "LSG",
        "team2": "PBKS",
        "date": "2026-05-23",
        "time": "19:30",
        "venue": "BRSABV Ekana Stadium",
        "status": "Punjab Kings won by 7 wkts",
        "winner": "PBKS",
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
        "status": "Sunrisers Hyderabad won by 55 runs",
        "winner": "SRH",
        "team1Score": "",
        "team2Score": ""
    },
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
        "id": 65,
        "matchNumber": 65,
        "team1": "KKR",
        "team2": "MI",
        "date": "2026-05-20",
        "time": "19:30",
        "venue": "Eden Gardens",
        "status": "Kolkata Knight Riders won by 4 wkts",
        "winner": "KKR",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 64,
        "matchNumber": 64,
        "team1": "RR",
        "team2": "LSG",
        "date": "2026-05-19",
        "time": "19:30",
        "venue": "Sawai Mansingh Stadium",
        "status": "Rajasthan Royals won by 7 wkts",
        "winner": "RR",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 63,
        "matchNumber": 63,
        "team1": "CSK",
        "team2": "SRH",
        "date": "2026-05-18",
        "time": "19:30",
        "venue": "MA Chidambaram Stadium",
        "status": "Sunrisers Hyderabad won by 5 wkts",
        "winner": "SRH",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 62,
        "matchNumber": 62,
        "team1": "DC",
        "team2": "RR",
        "date": "2026-05-17",
        "time": "19:30",
        "venue": "Arun Jaitley Stadium",
        "status": "Delhi Capitals won by 5 wkts",
        "winner": "DC",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 61,
        "matchNumber": 61,
        "team1": "PBKS",
        "team2": "RCB",
        "date": "2026-05-17",
        "time": "15:30",
        "venue": "HPCA Stadium",
        "status": "Royal Challengers Bengaluru won by 23 runs",
        "winner": "RCB",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 60,
        "matchNumber": 60,
        "team1": "KKR",
        "team2": "GT",
        "date": "2026-05-16",
        "time": "19:30",
        "venue": "Eden Gardens",
        "status": "Kolkata Knight Riders won by 29 runs",
        "winner": "KKR",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 59,
        "matchNumber": 59,
        "team1": "LSG",
        "team2": "CSK",
        "date": "2026-05-15",
        "time": "19:30",
        "venue": "BRSABV Ekana Stadium",
        "status": "Lucknow Super Giants won by 7 wkts",
        "winner": "LSG",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 58,
        "matchNumber": 58,
        "team1": "PBKS",
        "team2": "MI",
        "date": "2026-05-14",
        "time": "19:30",
        "venue": "HPCA Stadium",
        "status": "Mumbai Indians won by 6 wkts",
        "winner": "MI",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 57,
        "matchNumber": 57,
        "team1": "RCB",
        "team2": "KKR",
        "date": "2026-05-13",
        "time": "19:30",
        "venue": "Shaheed Veer Narayan Singh International Cricket Stadium",
        "status": "Royal Challengers Bengaluru won by 6 wkts",
        "winner": "RCB",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 56,
        "matchNumber": 56,
        "team1": "GT",
        "team2": "SRH",
        "date": "2026-05-12",
        "time": "19:30",
        "venue": "Narendra Modi Stadium",
        "status": "Gujarat Titans won by 82 runs",
        "winner": "GT",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 55,
        "matchNumber": 55,
        "team1": "PBKS",
        "team2": "DC",
        "date": "2026-05-11",
        "time": "19:30",
        "venue": "HPCA Stadium",
        "status": "Delhi Capitals won by 3 wkts",
        "winner": "DC",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 54,
        "matchNumber": 54,
        "team1": "RCB",
        "team2": "MI",
        "date": "2026-05-10",
        "time": "19:30",
        "venue": "Shaheed Veer Narayan Singh International Cricket Stadium",
        "status": "Royal Challengers Bengaluru won by 2 wkts",
        "winner": "RCB",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 53,
        "matchNumber": 53,
        "team1": "CSK",
        "team2": "LSG",
        "date": "2026-05-10",
        "time": "15:30",
        "venue": "MA Chidambaram Stadium",
        "status": "Chennai Super Kings won by 5 wkts",
        "winner": "CSK",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 52,
        "matchNumber": 52,
        "team1": "RR",
        "team2": "GT",
        "date": "2026-05-09",
        "time": "19:30",
        "venue": "Sawai Mansingh Stadium",
        "status": "Gujarat Titans won by 77 runs",
        "winner": "GT",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 51,
        "matchNumber": 51,
        "team1": "DC",
        "team2": "KKR",
        "date": "2026-05-08",
        "time": "19:30",
        "venue": "Arun Jaitley Stadium",
        "status": "Kolkata Knight Riders won by 8 wkts",
        "winner": "KKR",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 50,
        "matchNumber": 50,
        "team1": "LSG",
        "team2": "RCB",
        "date": "2026-05-07",
        "time": "19:30",
        "venue": "BRSABV Ekana Stadium",
        "status": "LSG won by 9 runs (19 Overs game due to rain, DLS Target 213)",
        "winner": "LSG",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 49,
        "matchNumber": 49,
        "team1": "SRH",
        "team2": "PBKS",
        "date": "2026-05-06",
        "time": "19:30",
        "venue": "Rajiv Gandhi International Cricket Stadium",
        "status": "Sunrisers Hyderabad won by 33 runs",
        "winner": "SRH",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 48,
        "matchNumber": 48,
        "team1": "DC",
        "team2": "CSK",
        "date": "2026-05-05",
        "time": "19:30",
        "venue": "Arun Jaitley Stadium",
        "status": "Chennai Super Kings won by 8 wkts",
        "winner": "CSK",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 47,
        "matchNumber": 47,
        "team1": "MI",
        "team2": "LSG",
        "date": "2026-05-04",
        "time": "19:30",
        "venue": "Wankhede Stadium",
        "status": "Mumbai Indians won by 6 wkts",
        "winner": "MI",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 46,
        "matchNumber": 46,
        "team1": "GT",
        "team2": "PBKS",
        "date": "2026-05-03",
        "time": "19:30",
        "venue": "Narendra Modi Stadium",
        "status": "Gujarat Titans won by 4 wkts",
        "winner": "GT",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 45,
        "matchNumber": 45,
        "team1": "SRH",
        "team2": "KKR",
        "date": "2026-05-03",
        "time": "15:30",
        "venue": "Rajiv Gandhi International Cricket Stadium",
        "status": "Kolkata Knight Riders won by 7 wkts",
        "winner": "KKR",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 44,
        "matchNumber": 44,
        "team1": "CSK",
        "team2": "MI",
        "date": "2026-05-02",
        "time": "19:30",
        "venue": "MA Chidambaram Stadium",
        "status": "Chennai Super Kings won by 8 wkts",
        "winner": "CSK",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 43,
        "matchNumber": 43,
        "team1": "RR",
        "team2": "DC",
        "date": "2026-05-01",
        "time": "19:30",
        "venue": "Sawai Mansingh Stadium",
        "status": "Delhi Capitals won by 7 wkts",
        "winner": "DC",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 42,
        "matchNumber": 42,
        "team1": "GT",
        "team2": "RCB",
        "date": "2026-04-30",
        "time": "19:30",
        "venue": "Narendra Modi Stadium",
        "status": "Gujarat Titans won by 4 wkts",
        "winner": "GT",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 41,
        "matchNumber": 41,
        "team1": "MI",
        "team2": "SRH",
        "date": "2026-04-29",
        "time": "19:30",
        "venue": "Wankhede Stadium",
        "status": "Sunrisers Hyderabad won by 6 wkts",
        "winner": "SRH",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 40,
        "matchNumber": 40,
        "team1": "PBKS",
        "team2": "RR",
        "date": "2026-04-28",
        "time": "19:30",
        "venue": "Maharaja Yadavindra Singh International Cricket Stadium",
        "status": "Rajasthan Royals won by 6 wkts",
        "winner": "RR",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 39,
        "matchNumber": 39,
        "team1": "DC",
        "team2": "RCB",
        "date": "2026-04-27",
        "time": "19:30",
        "venue": "Arun Jaitley Stadium",
        "status": "Royal Challengers Bengaluru won by 9 wkts",
        "winner": "RCB",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 38,
        "matchNumber": 38,
        "team1": "LSG",
        "team2": "KKR",
        "date": "2026-04-26",
        "time": "19:30",
        "venue": "BRSABV Ekana Stadium",
        "status": "Match tied (KKR won the Super Over)",
        "winner": "Match tied (KKR",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 37,
        "matchNumber": 37,
        "team1": "GT",
        "team2": "CSK",
        "date": "2026-04-26",
        "time": "15:30",
        "venue": "MA Chidambaram Stadium",
        "status": "Gujarat Titans won by 8 wkts",
        "winner": "GT",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 36,
        "matchNumber": 36,
        "team1": "RR",
        "team2": "SRH",
        "date": "2026-04-25",
        "time": "19:30",
        "venue": "Sawai Mansingh Stadium",
        "status": "Sunrisers Hyderabad won by 5 wkts",
        "winner": "SRH",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 35,
        "matchNumber": 35,
        "team1": "DC",
        "team2": "PBKS",
        "date": "2026-04-25",
        "time": "15:30",
        "venue": "Arun Jaitley Stadium",
        "status": "Punjab Kings won by 6 wkts",
        "winner": "PBKS",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 34,
        "matchNumber": 34,
        "team1": "RCB",
        "team2": "GT",
        "date": "2026-04-24",
        "time": "19:30",
        "venue": "M Chinnaswamy Stadium",
        "status": "Royal Challengers Bengaluru won by 5 wkts",
        "winner": "RCB",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 33,
        "matchNumber": 33,
        "team1": "MI",
        "team2": "CSK",
        "date": "2026-04-23",
        "time": "19:30",
        "venue": "Wankhede Stadium",
        "status": "Chennai Super Kings won by 103 runs",
        "winner": "CSK",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 32,
        "matchNumber": 32,
        "team1": "LSG",
        "team2": "RR",
        "date": "2026-04-22",
        "time": "19:30",
        "venue": "BRSABV Ekana Stadium",
        "status": "Rajasthan Royals won by 40 runs",
        "winner": "RR",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 31,
        "matchNumber": 31,
        "team1": "SRH",
        "team2": "DC",
        "date": "2026-04-21",
        "time": "19:30",
        "venue": "Rajiv Gandhi International Cricket Stadium",
        "status": "Sunrisers Hyderabad won by 47 runs",
        "winner": "SRH",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 30,
        "matchNumber": 30,
        "team1": "GT",
        "team2": "MI",
        "date": "2026-04-20",
        "time": "19:30",
        "venue": "Narendra Modi Stadium",
        "status": "Mumbai Indians won by 99 runs",
        "winner": "MI",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 29,
        "matchNumber": 29,
        "team1": "PBKS",
        "team2": "LSG",
        "date": "2026-04-19",
        "time": "19:30",
        "venue": "Maharaja Yadavindra Singh International Cricket Stadium",
        "status": "Punjab Kings won by 54 runs",
        "winner": "PBKS",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 28,
        "matchNumber": 28,
        "team1": "KKR",
        "team2": "RR",
        "date": "2026-04-19",
        "time": "15:30",
        "venue": "Eden Gardens",
        "status": "Kolkata Knight Riders won by 4 wkts",
        "winner": "KKR",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 27,
        "matchNumber": 27,
        "team1": "SRH",
        "team2": "CSK",
        "date": "2026-04-18",
        "time": "19:30",
        "venue": "Rajiv Gandhi International Cricket Stadium",
        "status": "Sunrisers Hyderabad won by 10 runs",
        "winner": "SRH",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 26,
        "matchNumber": 26,
        "team1": "RCB",
        "team2": "DC",
        "date": "2026-04-18",
        "time": "15:30",
        "venue": "M Chinnaswamy Stadium",
        "status": "Delhi Capitals won by 6 wkts",
        "winner": "DC",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 25,
        "matchNumber": 25,
        "team1": "GT",
        "team2": "KKR",
        "date": "2026-04-17",
        "time": "19:30",
        "venue": "Narendra Modi Stadium",
        "status": "Gujarat Titans won by 5 wkts",
        "winner": "GT",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 24,
        "matchNumber": 24,
        "team1": "MI",
        "team2": "PBKS",
        "date": "2026-04-16",
        "time": "19:30",
        "venue": "Wankhede Stadium",
        "status": "Punjab Kings won by 7 wkts",
        "winner": "PBKS",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 23,
        "matchNumber": 23,
        "team1": "RCB",
        "team2": "LSG",
        "date": "2026-04-15",
        "time": "19:30",
        "venue": "M Chinnaswamy Stadium",
        "status": "Royal Challengers Bengaluru won by 5 wkts",
        "winner": "RCB",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 22,
        "matchNumber": 22,
        "team1": "CSK",
        "team2": "KKR",
        "date": "2026-04-14",
        "time": "19:30",
        "venue": "MA Chidambaram Stadium",
        "status": "Chennai Super Kings won by 32 runs",
        "winner": "CSK",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 21,
        "matchNumber": 21,
        "team1": "SRH",
        "team2": "RR",
        "date": "2026-04-13",
        "time": "19:30",
        "venue": "Rajiv Gandhi International Cricket Stadium",
        "status": "Sunrisers Hyderabad won by 57 runs",
        "winner": "SRH",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 20,
        "matchNumber": 20,
        "team1": "MI",
        "team2": "RCB",
        "date": "2026-04-12",
        "time": "19:30",
        "venue": "Wankhede Stadium",
        "status": "Royal Challengers Bengaluru won by 18 runs",
        "winner": "RCB",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 19,
        "matchNumber": 19,
        "team1": "LSG",
        "team2": "GT",
        "date": "2026-04-12",
        "time": "15:30",
        "venue": "BRSABV Ekana Stadium",
        "status": "Gujarat Titans won by 7 wkts",
        "winner": "GT",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 18,
        "matchNumber": 18,
        "team1": "CSK",
        "team2": "DC",
        "date": "2026-04-11",
        "time": "19:30",
        "venue": "MA Chidambaram Stadium",
        "status": "Chennai Super Kings won by 23 runs",
        "winner": "CSK",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 17,
        "matchNumber": 17,
        "team1": "PBKS",
        "team2": "SRH",
        "date": "2026-04-11",
        "time": "15:30",
        "venue": "Maharaja Yadavindra Singh International Cricket Stadium",
        "status": "Punjab Kings won by 6 wkts",
        "winner": "PBKS",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 16,
        "matchNumber": 16,
        "team1": "RR",
        "team2": "RCB",
        "date": "2026-04-10",
        "time": "19:30",
        "venue": "Barsapara Cricket Stadium",
        "status": "Rajasthan Royals won by 6 wkts",
        "winner": "RR",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 15,
        "matchNumber": 15,
        "team1": "KKR",
        "team2": "LSG",
        "date": "2026-04-09",
        "time": "19:30",
        "venue": "Eden Gardens",
        "status": "Lucknow Super Giants won by 3 wkts",
        "winner": "LSG",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 14,
        "matchNumber": 14,
        "team1": "DC",
        "team2": "GT",
        "date": "2026-04-08",
        "time": "19:30",
        "venue": "Arun Jaitley Stadium",
        "status": "Gujarat Titans won by 1 run",
        "winner": "GT",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 13,
        "matchNumber": 13,
        "team1": "RR",
        "team2": "MI",
        "date": "2026-04-07",
        "time": "19:30",
        "venue": "Barsapara Cricket Stadium",
        "status": "Rajasthan Royals won by 27 runs  -  11 overs game due to rain",
        "winner": "RR",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 12,
        "matchNumber": 12,
        "team1": "KKR",
        "team2": "PBKS",
        "date": "2026-04-06",
        "time": "19:30",
        "venue": "Eden Gardens",
        "status": "No result (due to rain)",
        "winner": "",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 11,
        "matchNumber": 11,
        "team1": "RCB",
        "team2": "CSK",
        "date": "2026-04-05",
        "time": "19:30",
        "venue": "M Chinnaswamy Stadium",
        "status": "Royal Challengers Bengaluru won by 43 runs",
        "winner": "RCB",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 10,
        "matchNumber": 10,
        "team1": "SRH",
        "team2": "LSG",
        "date": "2026-04-05",
        "time": "15:30",
        "venue": "Rajiv Gandhi International Cricket Stadium",
        "status": "Lucknow Super Giants won by 5 wkts",
        "winner": "LSG",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 9,
        "matchNumber": 9,
        "team1": "GT",
        "team2": "RR",
        "date": "2026-04-04",
        "time": "19:30",
        "venue": "Narendra Modi Stadium",
        "status": "Rajasthan Royals won by 6 runs",
        "winner": "RR",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 8,
        "matchNumber": 8,
        "team1": "DC",
        "team2": "MI",
        "date": "2026-04-04",
        "time": "15:30",
        "venue": "Arun Jaitley Stadium",
        "status": "Delhi Capitals won by 6 wkts",
        "winner": "DC",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 7,
        "matchNumber": 7,
        "team1": "CSK",
        "team2": "PBKS",
        "date": "2026-04-03",
        "time": "19:30",
        "venue": "MA Chidambaram Stadium",
        "status": "Punjab Kings won by 5 wkts",
        "winner": "PBKS",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 6,
        "matchNumber": 6,
        "team1": "KKR",
        "team2": "SRH",
        "date": "2026-04-02",
        "time": "19:30",
        "venue": "Eden Gardens",
        "status": "Sunrisers Hyderabad won by 65 runs",
        "winner": "SRH",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 5,
        "matchNumber": 5,
        "team1": "LSG",
        "team2": "DC",
        "date": "2026-04-01",
        "time": "19:30",
        "venue": "BRSABV Ekana Stadium",
        "status": "Delhi Capitals won by 6 wkts",
        "winner": "DC",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 4,
        "matchNumber": 4,
        "team1": "PBKS",
        "team2": "GT",
        "date": "2026-03-31",
        "time": "19:30",
        "venue": "Maharaja Yadavindra Singh International Cricket Stadium",
        "status": "Punjab Kings won by 3 wkts",
        "winner": "PBKS",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 3,
        "matchNumber": 3,
        "team1": "RR",
        "team2": "CSK",
        "date": "2026-03-30",
        "time": "19:30",
        "venue": "Barsapara Cricket Stadium",
        "status": "Rajasthan Royals won by 8 wkts",
        "winner": "RR",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 2,
        "matchNumber": 2,
        "team1": "MI",
        "team2": "KKR",
        "date": "2026-03-29",
        "time": "19:30",
        "venue": "Wankhede Stadium",
        "status": "Mumbai Indians won by 6 wkts",
        "winner": "MI",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 1,
        "matchNumber": 1,
        "team1": "RCB",
        "team2": "SRH",
        "date": "2026-03-28",
        "time": "19:30",
        "venue": "M Chinnaswamy Stadium",
        "status": "Royal Challengers Bengaluru won by 6 wkts",
        "winner": "RCB",
        "team1Score": "",
        "team2Score": ""
    }
],
  remainingMatches: [
    {
        "id": 69,
        "matchNumber": 69,
        "team1": "MI",
        "team2": "RR",
        "date": "2026-05-24",
        "time": "15:30",
        "venue": "Wankhede Stadium",
        "status": "Match starts at May 24, 10:00 GMT",
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
        "status": "Match starts at May 24, 14:00 GMT",
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
  const currentBuildVersion = import.meta.env.VITE_BUILD_TIMESTAMP || 'dev';
  const storedVersion = localStorage.getItem('ipl_data_version');
  const cached = getCachedData();

  if (storedVersion !== currentBuildVersion) {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
    localStorage.setItem('ipl_data_version', currentBuildVersion);
    setCachedData(defaultData);
    return defaultData;
  }

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
  const currentBuildVersion = import.meta.env.VITE_BUILD_TIMESTAMP || 'dev';
  localStorage.removeItem(CACHE_KEY);
  localStorage.removeItem(CACHE_TIMESTAMP_KEY);
  localStorage.setItem('ipl_data_version', currentBuildVersion);
  setCachedData(defaultData);
  return defaultData;
};
