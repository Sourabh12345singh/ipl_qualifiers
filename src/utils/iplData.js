const CACHE_KEY = 'ipl_data_cache';
const CACHE_TIMESTAMP_KEY = 'ipl_data_timestamp';
const REFRESH_INTERVAL_MS = 24 * 60 * 60 * 1000;

const defaultData = {
  pointsTable: [
<<<<<<< HEAD
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
  completedMatches: [
    { id: 1, matchNumber: 1, team1: 'RCB', team2: 'SRH', date: '2026-03-28', venue: 'M Chinnaswamy Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 2, matchNumber: 2, team1: 'MI', team2: 'KKR', date: '2026-03-29', venue: 'Wankhede Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 3, matchNumber: 3, team1: 'RR', team2: 'CSK', date: '2026-03-30', venue: 'Barsapara Cricket Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 4, matchNumber: 4, team1: 'PBKS', team2: 'GT', date: '2026-03-31', venue: 'Maharaja Yadavindra Singh International Cricket Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 5, matchNumber: 5, team1: 'LSG', team2: 'DC', date: '2026-04-01', venue: 'BRSABV Ekana Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 6, matchNumber: 6, team1: 'KKR', team2: 'SRH', date: '2026-04-02', venue: 'Eden Gardens', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 7, matchNumber: 7, team1: 'CSK', team2: 'PBKS', date: '2026-04-03', venue: 'MA Chidambaram Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 8, matchNumber: 8, team1: 'DC', team2: 'MI', date: '2026-04-04', venue: 'Arun Jaitley Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 9, matchNumber: 9, team1: 'GT', team2: 'RR', date: '2026-04-04', venue: 'Narendra Modi Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 10, matchNumber: 10, team1: 'SRH', team2: 'LSG', date: '2026-04-05', venue: 'Rajiv Gandhi International Cricket Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 11, matchNumber: 11, team1: 'RCB', team2: 'CSK', date: '2026-04-05', venue: 'M Chinnaswamy Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 12, matchNumber: 12, team1: 'KKR', team2: 'PBKS', date: '2026-04-06', venue: 'Eden Gardens', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 13, matchNumber: 13, team1: 'RR', team2: 'MI', date: '2026-04-07', venue: 'Barsapara Cricket Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 14, matchNumber: 14, team1: 'DC', team2: 'GT', date: '2026-04-08', venue: 'Arun Jaitley Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 15, matchNumber: 15, team1: 'KKR', team2: 'LSG', date: '2026-04-09', venue: 'Eden Gardens', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 16, matchNumber: 16, team1: 'RR', team2: 'RCB', date: '2026-04-10', venue: 'Barsapara Cricket Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 17, matchNumber: 17, team1: 'PBKS', team2: 'SRH', date: '2026-04-11', venue: 'Maharaja Yadavindra Singh International Cricket Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 18, matchNumber: 18, team1: 'CSK', team2: 'DC', date: '2026-04-11', venue: 'MA Chidambaram Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 19, matchNumber: 19, team1: 'LSG', team2: 'GT', date: '2026-04-12', venue: 'BRSABV Ekana Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 20, matchNumber: 20, team1: 'MI', team2: 'RCB', date: '2026-04-12', venue: 'Wankhede Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 21, matchNumber: 21, team1: 'SRH', team2: 'RR', date: '2026-04-13', venue: 'Rajiv Gandhi International Cricket Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 22, matchNumber: 22, team1: 'CSK', team2: 'KKR', date: '2026-04-14', venue: 'MA Chidambaram Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 23, matchNumber: 23, team1: 'RCB', team2: 'LSG', date: '2026-04-15', venue: 'M Chinnaswamy Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 24, matchNumber: 24, team1: 'MI', team2: 'PBKS', date: '2026-04-16', venue: 'Wankhede Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 25, matchNumber: 25, team1: 'GT', team2: 'KKR', date: '2026-04-17', venue: 'Narendra Modi Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 26, matchNumber: 26, team1: 'RCB', team2: 'DC', date: '2026-04-18', venue: 'M Chinnaswamy Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 27, matchNumber: 27, team1: 'SRH', team2: 'CSK', date: '2026-04-18', venue: 'Rajiv Gandhi International Cricket Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 28, matchNumber: 28, team1: 'KKR', team2: 'RR', date: '2026-04-19', venue: 'Eden Gardens', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 29, matchNumber: 29, team1: 'PBKS', team2: 'LSG', date: '2026-04-19', venue: 'Maharaja Yadavindra Singh International Cricket Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 30, matchNumber: 30, team1: 'GT', team2: 'MI', date: '2026-04-20', venue: 'Narendra Modi Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 31, matchNumber: 31, team1: 'SRH', team2: 'DC', date: '2026-04-21', venue: 'Rajiv Gandhi International Cricket Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 32, matchNumber: 32, team1: 'LSG', team2: 'RR', date: '2026-04-22', venue: 'BRSABV Ekana Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 33, matchNumber: 33, team1: 'MI', team2: 'CSK', date: '2026-04-23', venue: 'Wankhede Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 34, matchNumber: 34, team1: 'RCB', team2: 'GT', date: '2026-04-24', venue: 'M Chinnaswamy Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 35, matchNumber: 35, team1: 'DC', team2: 'PBKS', date: '2026-04-25', venue: 'Arun Jaitley Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 36, matchNumber: 36, team1: 'RR', team2: 'SRH', date: '2026-04-25', venue: 'Sawai Mansingh Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 37, matchNumber: 37, team1: 'GT', team2: 'CSK', date: '2026-04-26', venue: 'MA Chidambaram Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 38, matchNumber: 38, team1: 'LSG', team2: 'KKR', date: '2026-04-26', venue: 'BRSABV Ekana Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 39, matchNumber: 39, team1: 'DC', team2: 'RCB', date: '2026-04-27', venue: 'Arun Jaitley Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 40, matchNumber: 40, team1: 'PBKS', team2: 'RR', date: '2026-04-28', venue: 'Maharaja Yadavindra Singh International Cricket Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 41, matchNumber: 41, team1: 'MI', team2: 'SRH', date: '2026-04-29', venue: 'Wankhede Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 42, matchNumber: 42, team1: 'GT', team2: 'RCB', date: '2026-04-30', venue: 'Narendra Modi Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 43, matchNumber: 43, team1: 'RR', team2: 'DC', date: '2026-05-01', venue: 'Sawai Mansingh Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 44, matchNumber: 44, team1: 'CSK', team2: 'MI', date: '2026-05-02', venue: 'MA Chidambaram Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 45, matchNumber: 45, team1: 'SRH', team2: 'KKR', date: '2026-05-03', venue: 'Rajiv Gandhi International Cricket Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 46, matchNumber: 46, team1: 'GT', team2: 'PBKS', date: '2026-05-03', venue: 'Narendra Modi Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 47, matchNumber: 47, team1: 'MI', team2: 'LSG', date: '2026-05-04', venue: 'Wankhede Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 48, matchNumber: 48, team1: 'DC', team2: 'CSK', date: '2026-05-05', venue: 'Arun Jaitley Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 49, matchNumber: 49, team1: 'SRH', team2: 'PBKS', date: '2026-05-06', venue: 'Rajiv Gandhi International Cricket Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 50, matchNumber: 50, team1: 'LSG', team2: 'RCB', date: '2026-05-07', venue: 'BRSABV Ekana Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 51, matchNumber: 51, team1: 'DC', team2: 'KKR', date: '2026-05-08', venue: 'Arun Jaitley Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 52, matchNumber: 52, team1: 'RR', team2: 'GT', date: '2026-05-09', venue: 'Sawai Mansingh Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 53, matchNumber: 53, team1: 'CSK', team2: 'LSG', date: '2026-05-10', venue: 'MA Chidambaram Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 54, matchNumber: 54, team1: 'RCB', team2: 'MI', date: '2026-05-10', venue: 'Shaheed Veer Narayan Singh International Cricket Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 55, matchNumber: 55, team1: 'PBKS', team2: 'DC', date: '2026-05-11', venue: 'HPCA Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 56, matchNumber: 56, team1: 'GT', team2: 'SRH', date: '2026-05-12', venue: 'Narendra Modi Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 57, matchNumber: 57, team1: 'RCB', team2: 'KKR', date: '2026-05-13', venue: 'Shaheed Veer Narayan Singh International Cricket Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 58, matchNumber: 58, team1: 'PBKS', team2: 'MI', date: '2026-05-14', venue: 'HPCA Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 59, matchNumber: 59, team1: 'LSG', team2: 'CSK', date: '2026-05-15', venue: 'BRSABV Ekana Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 60, matchNumber: 60, team1: 'KKR', team2: 'GT', date: '2026-05-16', venue: 'Eden Gardens', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 61, matchNumber: 61, team1: 'PBKS', team2: 'RCB', date: '2026-05-17', venue: 'HPCA Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 62, matchNumber: 62, team1: 'DC', team2: 'RR', date: '2026-05-17', venue: 'Arun Jaitley Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
    { id: 63, matchNumber: 63, team1: 'CSK', team2: 'SRH', date: '2026-05-18', venue: 'MA Chidambaram Stadium', winner: '', result: 'Completed', team1Score: '', team2Score: '' },
  ],
  remainingMatches: [
    { id: 64, matchNumber: 64, team1: 'RR', team2: 'LSG', date: '2026-05-19', venue: 'Sawai Mansingh Stadium' },
    { id: 65, matchNumber: 65, team1: 'KKR', team2: 'MI', date: '2026-05-20', venue: 'Eden Gardens' },
    { id: 66, matchNumber: 66, team1: 'GT', team2: 'CSK', date: '2026-05-21', venue: 'Narendra Modi Stadium' },
    { id: 67, matchNumber: 67, team1: 'SRH', team2: 'RCB', date: '2026-05-22', venue: 'Rajiv Gandhi International Cricket Stadium' },
    { id: 68, matchNumber: 68, team1: 'LSG', team2: 'PBKS', date: '2026-05-23', venue: 'BRSABV Ekana Stadium' },
    { id: 69, matchNumber: 69, team1: 'MI', team2: 'RR', date: '2026-05-24', venue: 'Wankhede Stadium' },
    { id: 70, matchNumber: 70, team1: 'KKR', team2: 'DC', date: '2026-05-24', venue: 'Eden Gardens' },
  ],
=======
    {
        "team": "",
        "short": "",
        "played": 4,
        "won": 0,
        "lost": 0,
        "noResult": 0,
        "points": 0,
        "nrr": 0
    },
    {
        "team": "",
        "short": "",
        "played": 4,
        "won": 0,
        "lost": 0,
        "noResult": 0,
        "points": 0,
        "nrr": 0
    },
    {
        "team": "",
        "short": "",
        "played": 4,
        "won": 0,
        "lost": 0,
        "noResult": 0,
        "points": 0,
        "nrr": 0
    }
],
  completedMatches: [
    {
        "id": 1,
        "matchNumber": 1,
        "team1": "RCB",
        "team2": "SRH",
        "date": "2026-03-28",
        "venue": "M Chinnaswamy Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 2,
        "matchNumber": 2,
        "team1": "MI",
        "team2": "KKR",
        "date": "2026-03-29",
        "venue": "Wankhede Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 3,
        "matchNumber": 3,
        "team1": "RR",
        "team2": "CSK",
        "date": "2026-03-30",
        "venue": "Barsapara Cricket Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 4,
        "matchNumber": 4,
        "team1": "PBKS",
        "team2": "GT",
        "date": "2026-03-31",
        "venue": "Maharaja Yadavindra Singh International Cricket Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 5,
        "matchNumber": 5,
        "team1": "LSG",
        "team2": "DC",
        "date": "2026-04-01",
        "venue": "BRSABV Ekana Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 6,
        "matchNumber": 6,
        "team1": "KKR",
        "team2": "SRH",
        "date": "2026-04-02",
        "venue": "Eden Gardens",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 7,
        "matchNumber": 7,
        "team1": "CSK",
        "team2": "PBKS",
        "date": "2026-04-03",
        "venue": "MA Chidambaram Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 8,
        "matchNumber": 8,
        "team1": "DC",
        "team2": "MI",
        "date": "2026-04-04",
        "venue": "Arun Jaitley Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 9,
        "matchNumber": 9,
        "team1": "GT",
        "team2": "RR",
        "date": "2026-04-04",
        "venue": "Narendra Modi Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 10,
        "matchNumber": 10,
        "team1": "SRH",
        "team2": "LSG",
        "date": "2026-04-05",
        "venue": "Rajiv Gandhi International Cricket Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 11,
        "matchNumber": 11,
        "team1": "RCB",
        "team2": "CSK",
        "date": "2026-04-05",
        "venue": "M Chinnaswamy Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 12,
        "matchNumber": 12,
        "team1": "KKR",
        "team2": "PBKS",
        "date": "2026-04-06",
        "venue": "Eden Gardens",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 13,
        "matchNumber": 13,
        "team1": "RR",
        "team2": "MI",
        "date": "2026-04-07",
        "venue": "Barsapara Cricket Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 14,
        "matchNumber": 14,
        "team1": "DC",
        "team2": "GT",
        "date": "2026-04-08",
        "venue": "Arun Jaitley Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 15,
        "matchNumber": 15,
        "team1": "KKR",
        "team2": "LSG",
        "date": "2026-04-09",
        "venue": "Eden Gardens",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 16,
        "matchNumber": 16,
        "team1": "RR",
        "team2": "RCB",
        "date": "2026-04-10",
        "venue": "Barsapara Cricket Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 17,
        "matchNumber": 17,
        "team1": "PBKS",
        "team2": "SRH",
        "date": "2026-04-11",
        "venue": "Maharaja Yadavindra Singh International Cricket Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 18,
        "matchNumber": 18,
        "team1": "CSK",
        "team2": "DC",
        "date": "2026-04-11",
        "venue": "MA Chidambaram Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 19,
        "matchNumber": 19,
        "team1": "LSG",
        "team2": "GT",
        "date": "2026-04-12",
        "venue": "BRSABV Ekana Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 20,
        "matchNumber": 20,
        "team1": "MI",
        "team2": "RCB",
        "date": "2026-04-12",
        "venue": "Wankhede Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 21,
        "matchNumber": 21,
        "team1": "SRH",
        "team2": "RR",
        "date": "2026-04-13",
        "venue": "Rajiv Gandhi International Cricket Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 22,
        "matchNumber": 22,
        "team1": "CSK",
        "team2": "KKR",
        "date": "2026-04-14",
        "venue": "MA Chidambaram Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 23,
        "matchNumber": 23,
        "team1": "RCB",
        "team2": "LSG",
        "date": "2026-04-15",
        "venue": "M Chinnaswamy Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 24,
        "matchNumber": 24,
        "team1": "MI",
        "team2": "PBKS",
        "date": "2026-04-16",
        "venue": "Wankhede Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 25,
        "matchNumber": 25,
        "team1": "GT",
        "team2": "KKR",
        "date": "2026-04-17",
        "venue": "Narendra Modi Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 26,
        "matchNumber": 26,
        "team1": "RCB",
        "team2": "DC",
        "date": "2026-04-18",
        "venue": "M Chinnaswamy Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 27,
        "matchNumber": 27,
        "team1": "SRH",
        "team2": "CSK",
        "date": "2026-04-18",
        "venue": "Rajiv Gandhi International Cricket Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 28,
        "matchNumber": 28,
        "team1": "KKR",
        "team2": "RR",
        "date": "2026-04-19",
        "venue": "Eden Gardens",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 29,
        "matchNumber": 29,
        "team1": "PBKS",
        "team2": "LSG",
        "date": "2026-04-19",
        "venue": "Maharaja Yadavindra Singh International Cricket Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 30,
        "matchNumber": 30,
        "team1": "GT",
        "team2": "MI",
        "date": "2026-04-20",
        "venue": "Narendra Modi Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 31,
        "matchNumber": 31,
        "team1": "SRH",
        "team2": "DC",
        "date": "2026-04-21",
        "venue": "Rajiv Gandhi International Cricket Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 32,
        "matchNumber": 32,
        "team1": "LSG",
        "team2": "RR",
        "date": "2026-04-22",
        "venue": "BRSABV Ekana Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 33,
        "matchNumber": 33,
        "team1": "MI",
        "team2": "CSK",
        "date": "2026-04-23",
        "venue": "Wankhede Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 34,
        "matchNumber": 34,
        "team1": "RCB",
        "team2": "GT",
        "date": "2026-04-24",
        "venue": "M Chinnaswamy Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 35,
        "matchNumber": 35,
        "team1": "DC",
        "team2": "PBKS",
        "date": "2026-04-25",
        "venue": "Arun Jaitley Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 36,
        "matchNumber": 36,
        "team1": "RR",
        "team2": "SRH",
        "date": "2026-04-25",
        "venue": "Sawai Mansingh Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 37,
        "matchNumber": 37,
        "team1": "GT",
        "team2": "CSK",
        "date": "2026-04-26",
        "venue": "MA Chidambaram Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 38,
        "matchNumber": 38,
        "team1": "LSG",
        "team2": "KKR",
        "date": "2026-04-26",
        "venue": "BRSABV Ekana Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 39,
        "matchNumber": 39,
        "team1": "DC",
        "team2": "RCB",
        "date": "2026-04-27",
        "venue": "Arun Jaitley Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 40,
        "matchNumber": 40,
        "team1": "PBKS",
        "team2": "RR",
        "date": "2026-04-28",
        "venue": "Maharaja Yadavindra Singh International Cricket Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 41,
        "matchNumber": 41,
        "team1": "MI",
        "team2": "SRH",
        "date": "2026-04-29",
        "venue": "Wankhede Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 42,
        "matchNumber": 42,
        "team1": "GT",
        "team2": "RCB",
        "date": "2026-04-30",
        "venue": "Narendra Modi Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 43,
        "matchNumber": 43,
        "team1": "RR",
        "team2": "DC",
        "date": "2026-05-01",
        "venue": "Sawai Mansingh Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 44,
        "matchNumber": 44,
        "team1": "CSK",
        "team2": "MI",
        "date": "2026-05-02",
        "venue": "MA Chidambaram Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 45,
        "matchNumber": 45,
        "team1": "SRH",
        "team2": "KKR",
        "date": "2026-05-03",
        "venue": "Rajiv Gandhi International Cricket Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 46,
        "matchNumber": 46,
        "team1": "GT",
        "team2": "PBKS",
        "date": "2026-05-03",
        "venue": "Narendra Modi Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 47,
        "matchNumber": 47,
        "team1": "MI",
        "team2": "LSG",
        "date": "2026-05-04",
        "venue": "Wankhede Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 48,
        "matchNumber": 48,
        "team1": "DC",
        "team2": "CSK",
        "date": "2026-05-05",
        "venue": "Arun Jaitley Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 49,
        "matchNumber": 49,
        "team1": "SRH",
        "team2": "PBKS",
        "date": "2026-05-06",
        "venue": "Rajiv Gandhi International Cricket Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 50,
        "matchNumber": 50,
        "team1": "LSG",
        "team2": "RCB",
        "date": "2026-05-07",
        "venue": "BRSABV Ekana Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 51,
        "matchNumber": 51,
        "team1": "DC",
        "team2": "KKR",
        "date": "2026-05-08",
        "venue": "Arun Jaitley Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 52,
        "matchNumber": 52,
        "team1": "RR",
        "team2": "GT",
        "date": "2026-05-09",
        "venue": "Sawai Mansingh Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 53,
        "matchNumber": 53,
        "team1": "CSK",
        "team2": "LSG",
        "date": "2026-05-10",
        "venue": "MA Chidambaram Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 54,
        "matchNumber": 54,
        "team1": "RCB",
        "team2": "MI",
        "date": "2026-05-10",
        "venue": "Shaheed Veer Narayan Singh International Cricket Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 55,
        "matchNumber": 55,
        "team1": "PBKS",
        "team2": "DC",
        "date": "2026-05-11",
        "venue": "HPCA Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 56,
        "matchNumber": 56,
        "team1": "GT",
        "team2": "SRH",
        "date": "2026-05-12",
        "venue": "Narendra Modi Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 57,
        "matchNumber": 57,
        "team1": "RCB",
        "team2": "KKR",
        "date": "2026-05-13",
        "venue": "Shaheed Veer Narayan Singh International Cricket Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 58,
        "matchNumber": 58,
        "team1": "PBKS",
        "team2": "MI",
        "date": "2026-05-14",
        "venue": "HPCA Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 59,
        "matchNumber": 59,
        "team1": "LSG",
        "team2": "CSK",
        "date": "2026-05-15",
        "venue": "BRSABV Ekana Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 60,
        "matchNumber": 60,
        "team1": "KKR",
        "team2": "GT",
        "date": "2026-05-16",
        "venue": "Eden Gardens",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 61,
        "matchNumber": 61,
        "team1": "PBKS",
        "team2": "RCB",
        "date": "2026-05-17",
        "venue": "HPCA Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 62,
        "matchNumber": 62,
        "team1": "DC",
        "team2": "RR",
        "date": "2026-05-17",
        "venue": "Arun Jaitley Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    },
    {
        "id": 63,
        "matchNumber": 63,
        "team1": "CSK",
        "team2": "SRH",
        "date": "2026-05-18",
        "venue": "MA Chidambaram Stadium",
        "winner": "",
        "result": "Completed",
        "team1Score": "",
        "team2Score": ""
    }
],
  remainingMatches: [
    {
        "id": 64,
        "matchNumber": 64,
        "team1": "RR",
        "team2": "LSG",
        "date": "2026-05-19",
        "venue": "Sawai Mansingh Stadium"
    },
    {
        "id": 65,
        "matchNumber": 65,
        "team1": "KKR",
        "team2": "MI",
        "date": "2026-05-20",
        "venue": "Eden Gardens"
    },
    {
        "id": 66,
        "matchNumber": 66,
        "team1": "GT",
        "team2": "CSK",
        "date": "2026-05-21",
        "venue": "Narendra Modi Stadium"
    },
    {
        "id": 67,
        "matchNumber": 67,
        "team1": "SRH",
        "team2": "RCB",
        "date": "2026-05-22",
        "venue": "Rajiv Gandhi International Cricket Stadium"
    },
    {
        "id": 68,
        "matchNumber": 68,
        "team1": "LSG",
        "team2": "PBKS",
        "date": "2026-05-23",
        "venue": "BRSABV Ekana Stadium"
    },
    {
        "id": 69,
        "matchNumber": 69,
        "team1": "MI",
        "team2": "RR",
        "date": "2026-05-24",
        "venue": "Wankhede Stadium"
    },
    {
        "id": 70,
        "matchNumber": 70,
        "team1": "KKR",
        "team2": "DC",
        "date": "2026-05-24",
        "venue": "Eden Gardens"
    }
],
>>>>>>> 690742e97704e4e1cbcf283b3f55824ec5aeb5da
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
