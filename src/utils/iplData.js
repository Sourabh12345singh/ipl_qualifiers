const defaultData = {
  lastUpdated: '2026-05-20T01:30:00.000Z',
  pointsTable: [
    { team: 'Royal Challengers Bengaluru', short: 'RCB', played: 13, won: 9, lost: 4, noResult: 0, points: 18, nrr: 1.065 },
    { team: 'Gujarat Titans', short: 'GT', played: 13, won: 8, lost: 5, noResult: 0, points: 16, nrr: 0.4 },
    { team: 'Sunrisers Hyderabad', short: 'SRH', played: 13, won: 8, lost: 5, noResult: 0, points: 16, nrr: 0.35 },
    { team: 'Rajasthan Royals', short: 'RR', played: 13, won: 7, lost: 6, noResult: 0, points: 14, nrr: 0.083 },
    { team: 'Punjab Kings', short: 'PBKS', played: 13, won: 6, lost: 6, noResult: 1, points: 13, nrr: 0.227 },
    { team: 'Chennai Super Kings', short: 'CSK', played: 13, won: 6, lost: 7, noResult: 0, points: 12, nrr: -0.016 },
    { team: 'Delhi Capitals', short: 'DC', played: 13, won: 6, lost: 7, noResult: 0, points: 12, nrr: -0.871 },
    { team: 'Kolkata Knight Riders', short: 'KKR', played: 12, won: 5, lost: 6, noResult: 1, points: 11, nrr: -0.038 },
    { team: 'Mumbai Indians', short: 'MI', played: 12, won: 4, lost: 8, noResult: 0, points: 8, nrr: -0.504 },
    { team: 'Lucknow Super Giants', short: 'LSG', played: 13, won: 4, lost: 9, noResult: 0, points: 8, nrr: -0.702 },
  ],
  completedMatches: [
    { id: 64, matchNumber: 64, team1: 'RR', team2: 'LSG', date: '2026-05-19', time: '19:30', venue: 'Sawai Mansingh Stadium', status: 'RR won by 7 wickets', winner: 'RR', team1Score: '', team2Score: '' },
    { id: 63, matchNumber: 63, team1: 'CSK', team2: 'SRH', date: '2026-05-18', time: '19:30', venue: 'MA Chidambaram Stadium', status: 'SRH won by 5 wickets', winner: 'SRH', team1Score: '', team2Score: '' },
    { id: 62, matchNumber: 62, team1: 'DC', team2: 'RR', date: '2026-05-17', time: '19:30', venue: 'Arun Jaitley Stadium', status: 'DC won by 5 wickets', winner: 'DC', team1Score: '', team2Score: '' },
    { id: 61, matchNumber: 61, team1: 'PBKS', team2: 'RCB', date: '2026-05-17', time: '15:30', venue: 'HPCA Stadium', status: 'RCB won by 23 runs', winner: 'RCB', team1Score: '', team2Score: '' },
    { id: 60, matchNumber: 60, team1: 'KKR', team2: 'GT', date: '2026-05-16', time: '19:30', venue: 'Eden Gardens', status: 'KKR won by 29 runs', winner: 'KKR', team1Score: '', team2Score: '' },
    { id: 59, matchNumber: 59, team1: 'LSG', team2: 'CSK', date: '2026-05-15', time: '19:30', venue: 'BRSABV Ekana Stadium', status: 'LSG won by 7 wickets', winner: 'LSG', team1Score: '', team2Score: '' },
    { id: 58, matchNumber: 58, team1: 'PBKS', team2: 'MI', date: '2026-05-14', time: '19:30', venue: 'HPCA Stadium', status: 'MI won by 6 wickets', winner: 'MI', team1Score: '', team2Score: '' },
    { id: 57, matchNumber: 57, team1: 'RCB', team2: 'KKR', date: '2026-05-13', time: '19:30', venue: 'Shaheed Veer Narayan Singh International Cricket Stadium', status: 'RCB won by 6 wickets', winner: 'RCB', team1Score: '', team2Score: '' },
    { id: 56, matchNumber: 56, team1: 'GT', team2: 'SRH', date: '2026-05-12', time: '19:30', venue: 'Narendra Modi Stadium', status: 'GT won by 82 runs', winner: 'GT', team1Score: '', team2Score: '' },
    { id: 55, matchNumber: 55, team1: 'PBKS', team2: 'DC', date: '2026-05-11', time: '19:30', venue: 'HPCA Stadium', status: 'DC won by 3 wickets', winner: 'DC', team1Score: '', team2Score: '' },
    { id: 54, matchNumber: 54, team1: 'RCB', team2: 'MI', date: '2026-05-10', time: '19:30', venue: 'Shaheed Veer Narayan Singh International Cricket Stadium', status: 'RCB won by 2 wickets', winner: 'RCB', team1Score: '', team2Score: '' },
    { id: 53, matchNumber: 53, team1: 'CSK', team2: 'LSG', date: '2026-05-10', time: '15:30', venue: 'MA Chidambaram Stadium', status: 'CSK won by 5 wickets', winner: 'CSK', team1Score: '', team2Score: '' },
    { id: 52, matchNumber: 52, team1: 'RR', team2: 'GT', date: '2026-05-09', time: '19:30', venue: 'Sawai Mansingh Stadium', status: 'GT won by 77 runs', winner: 'GT', team1Score: '', team2Score: '' },
    { id: 51, matchNumber: 51, team1: 'DC', team2: 'KKR', date: '2026-05-08', time: '19:30', venue: 'Arun Jaitley Stadium', status: 'KKR won by 8 wickets', winner: 'KKR', team1Score: '', team2Score: '' },
    { id: 50, matchNumber: 50, team1: 'LSG', team2: 'RCB', date: '2026-05-07', time: '19:30', venue: 'BRSABV Ekana Stadium', status: 'LSG won by 9 runs (DLS)', winner: 'LSG', team1Score: '', team2Score: '' },
    { id: 49, matchNumber: 49, team1: 'SRH', team2: 'PBKS', date: '2026-05-06', time: '19:30', venue: 'Rajiv Gandhi International Cricket Stadium', status: 'SRH won by 33 runs', winner: 'SRH', team1Score: '', team2Score: '' },
    { id: 48, matchNumber: 48, team1: 'DC', team2: 'CSK', date: '2026-05-05', time: '19:30', venue: 'Arun Jaitley Stadium', status: 'CSK won by 8 wickets', winner: 'CSK', team1Score: '', team2Score: '' },
    { id: 47, matchNumber: 47, team1: 'MI', team2: 'LSG', date: '2026-05-04', time: '19:30', venue: 'Wankhede Stadium', status: 'MI won by 6 wickets', winner: 'MI', team1Score: '', team2Score: '' },
    { id: 46, matchNumber: 46, team1: 'GT', team2: 'PBKS', date: '2026-05-03', time: '19:30', venue: 'Narendra Modi Stadium', status: 'GT won by 4 wickets', winner: 'GT', team1Score: '', team2Score: '' },
    { id: 45, matchNumber: 45, team1: 'SRH', team2: 'KKR', date: '2026-05-03', time: '15:30', venue: 'Rajiv Gandhi International Cricket Stadium', status: 'KKR won by 7 wickets', winner: 'KKR', team1Score: '', team2Score: '' },
    { id: 44, matchNumber: 44, team1: 'CSK', team2: 'MI', date: '2026-05-02', time: '19:30', venue: 'MA Chidambaram Stadium', status: 'CSK won by 8 wickets', winner: 'CSK', team1Score: '', team2Score: '' },
    { id: 43, matchNumber: 43, team1: 'RR', team2: 'DC', date: '2026-05-01', time: '19:30', venue: 'Sawai Mansingh Stadium', status: 'DC won by 7 wickets', winner: 'DC', team1Score: '', team2Score: '' },
    { id: 42, matchNumber: 42, team1: 'GT', team2: 'RCB', date: '2026-04-30', time: '19:30', venue: 'Narendra Modi Stadium', status: 'GT won by 4 wickets', winner: 'GT', team1Score: '', team2Score: '' },
    { id: 41, matchNumber: 41, team1: 'MI', team2: 'SRH', date: '2026-04-29', time: '19:30', venue: 'Wankhede Stadium', status: 'SRH won by 6 wickets', winner: 'SRH', team1Score: '', team2Score: '' },
    { id: 40, matchNumber: 40, team1: 'PBKS', team2: 'RR', date: '2026-04-28', time: '19:30', venue: 'Maharaja Yadavindra Singh International Cricket Stadium', status: 'RR won by 6 wickets', winner: 'RR', team1Score: '', team2Score: '' },
    { id: 39, matchNumber: 39, team1: 'DC', team2: 'RCB', date: '2026-04-27', time: '19:30', venue: 'Arun Jaitley Stadium', status: 'RCB won by 9 wickets', winner: 'RCB', team1Score: '', team2Score: '' },
    { id: 38, matchNumber: 38, team1: 'LSG', team2: 'KKR', date: '2026-04-26', time: '19:30', venue: 'BRSABV Ekana Stadium', status: 'KKR won the Super Over', winner: 'KKR', team1Score: '', team2Score: '' },
    { id: 37, matchNumber: 37, team1: 'CSK', team2: 'GT', date: '2026-04-26', time: '15:30', venue: 'MA Chidambaram Stadium', status: 'GT won by 8 wickets', winner: 'GT', team1Score: '', team2Score: '' },
    { id: 36, matchNumber: 36, team1: 'RR', team2: 'SRH', date: '2026-04-25', time: '19:30', venue: 'Sawai Mansingh Stadium', status: 'SRH won by 5 wickets', winner: 'SRH', team1Score: '', team2Score: '' },
    { id: 35, matchNumber: 35, team1: 'DC', team2: 'PBKS', date: '2026-04-25', time: '15:30', venue: 'Arun Jaitley Stadium', status: 'PBKS won by 6 wickets', winner: 'PBKS', team1Score: '', team2Score: '' },
    { id: 34, matchNumber: 34, team1: 'RCB', team2: 'GT', date: '2026-04-24', time: '19:30', venue: 'M Chinnaswamy Stadium', status: 'RCB won by 5 wickets', winner: 'RCB', team1Score: '', team2Score: '' },
    { id: 33, matchNumber: 33, team1: 'CSK', team2: 'MI', date: '2026-04-23', time: '19:30', venue: 'Wankhede Stadium', status: 'CSK won by 103 runs', winner: 'CSK', team1Score: '', team2Score: '' },
    { id: 32, matchNumber: 32, team1: 'RR', team2: 'LSG', date: '2026-04-22', time: '19:30', venue: 'BRSABV Ekana Stadium', status: 'RR won by 40 runs', winner: 'RR', team1Score: '', team2Score: '' },
    { id: 31, matchNumber: 31, team1: 'SRH', team2: 'DC', date: '2026-04-21', time: '19:30', venue: 'Rajiv Gandhi International Cricket Stadium', status: 'SRH won by 47 runs', winner: 'SRH', team1Score: '', team2Score: '' },
    { id: 30, matchNumber: 30, team1: 'MI', team2: 'GT', date: '2026-04-20', time: '19:30', venue: 'Narendra Modi Stadium', status: 'MI won by 99 runs', winner: 'MI', team1Score: '', team2Score: '' },
    { id: 29, matchNumber: 29, team1: 'PBKS', team2: 'LSG', date: '2026-04-19', time: '19:30', venue: 'Maharaja Yadavindra Singh International Cricket Stadium', status: 'PBKS won by 54 runs', winner: 'PBKS', team1Score: '', team2Score: '' },
    { id: 28, matchNumber: 28, team1: 'RR', team2: 'KKR', date: '2026-04-19', time: '15:30', venue: 'Eden Gardens', status: 'KKR won by 4 wickets', winner: 'KKR', team1Score: '', team2Score: '' },
    { id: 27, matchNumber: 27, team1: 'SRH', team2: 'CSK', date: '2026-04-18', time: '19:30', venue: 'Rajiv Gandhi International Cricket Stadium', status: 'SRH won by 10 runs', winner: 'SRH', team1Score: '', team2Score: '' },
    { id: 26, matchNumber: 26, team1: 'RCB', team2: 'DC', date: '2026-04-18', time: '15:30', venue: 'M Chinnaswamy Stadium', status: 'DC won by 6 wickets', winner: 'DC', team1Score: '', team2Score: '' },
    { id: 25, matchNumber: 25, team1: 'KKR', team2: 'GT', date: '2026-04-17', time: '19:30', venue: 'Narendra Modi Stadium', status: 'GT won by 5 wickets', winner: 'GT', team1Score: '', team2Score: '' },
    { id: 24, matchNumber: 24, team1: 'MI', team2: 'PBKS', date: '2026-04-16', time: '19:30', venue: 'Wankhede Stadium', status: 'PBKS won by 7 wickets', winner: 'PBKS', team1Score: '', team2Score: '' },
    { id: 23, matchNumber: 23, team1: 'RCB', team2: 'LSG', date: '2026-04-15', time: '19:30', venue: 'M Chinnaswamy Stadium', status: 'RCB won by 5 wickets', winner: 'RCB', team1Score: '', team2Score: '' },
    { id: 22, matchNumber: 22, team1: 'CSK', team2: 'KKR', date: '2026-04-14', time: '19:30', venue: 'MA Chidambaram Stadium', status: 'CSK won by 32 runs', winner: 'CSK', team1Score: '', team2Score: '' },
    { id: 21, matchNumber: 21, team1: 'SRH', team2: 'RR', date: '2026-04-13', time: '19:30', venue: 'Rajiv Gandhi International Cricket Stadium', status: 'SRH won by 57 runs', winner: 'SRH', team1Score: '', team2Score: '' },
    { id: 20, matchNumber: 20, team1: 'RCB', team2: 'MI', date: '2026-04-12', time: '19:30', venue: 'Wankhede Stadium', status: 'RCB won by 18 runs', winner: 'RCB', team1Score: '', team2Score: '' },
    { id: 19, matchNumber: 19, team1: 'LSG', team2: 'GT', date: '2026-04-12', time: '15:30', venue: 'BRSABV Ekana Stadium', status: 'GT won by 7 wickets', winner: 'GT', team1Score: '', team2Score: '' },
    { id: 18, matchNumber: 18, team1: 'CSK', team2: 'DC', date: '2026-04-11', time: '19:30', venue: 'MA Chidambaram Stadium', status: 'CSK won by 23 runs', winner: 'CSK', team1Score: '', team2Score: '' },
    { id: 17, matchNumber: 17, team1: 'PBKS', team2: 'SRH', date: '2026-04-11', time: '15:30', venue: 'Maharaja Yadavindra Singh International Cricket Stadium', status: 'PBKS won by 6 wickets', winner: 'PBKS', team1Score: '', team2Score: '' },
    { id: 16, matchNumber: 16, team1: 'RR', team2: 'RCB', date: '2026-04-10', time: '19:30', venue: 'Barsapara Cricket Stadium', status: 'RR won by 6 wickets', winner: 'RR', team1Score: '', team2Score: '' },
    { id: 15, matchNumber: 15, team1: 'KKR', team2: 'LSG', date: '2026-04-09', time: '19:30', venue: 'Eden Gardens', status: 'LSG won by 3 wickets', winner: 'LSG', team1Score: '', team2Score: '' },
    { id: 14, matchNumber: 14, team1: 'DC', team2: 'GT', date: '2026-04-08', time: '19:30', venue: 'Arun Jaitley Stadium', status: 'GT won by 1 run', winner: 'GT', team1Score: '', team2Score: '' },
    { id: 13, matchNumber: 13, team1: 'RR', team2: 'MI', date: '2026-04-07', time: '19:30', venue: 'Barsapara Cricket Stadium', status: 'RR won by 27 runs', winner: 'RR', team1Score: '', team2Score: '' },
    { id: 12, matchNumber: 12, team1: 'KKR', team2: 'PBKS', date: '2026-04-06', time: '19:30', venue: 'Eden Gardens', status: 'No result', winner: '', team1Score: '', team2Score: '' },
    { id: 11, matchNumber: 11, team1: 'RCB', team2: 'CSK', date: '2026-04-05', time: '19:30', venue: 'M Chinnaswamy Stadium', status: 'RCB won by 43 runs', winner: 'RCB', team1Score: '', team2Score: '' },
    { id: 10, matchNumber: 10, team1: 'SRH', team2: 'LSG', date: '2026-04-05', time: '15:30', venue: 'Rajiv Gandhi International Cricket Stadium', status: 'LSG won by 5 wickets', winner: 'LSG', team1Score: '', team2Score: '' },
    { id: 9, matchNumber: 9, team1: 'GT', team2: 'RR', date: '2026-04-04', time: '19:30', venue: 'Narendra Modi Stadium', status: 'RR won by 6 runs', winner: 'RR', team1Score: '', team2Score: '' },
    { id: 8, matchNumber: 8, team1: 'DC', team2: 'MI', date: '2026-04-04', time: '15:30', venue: 'Arun Jaitley Stadium', status: 'DC won by 6 wickets', winner: 'DC', team1Score: '', team2Score: '' },
    { id: 7, matchNumber: 7, team1: 'CSK', team2: 'PBKS', date: '2026-04-03', time: '19:30', venue: 'MA Chidambaram Stadium', status: 'PBKS won by 5 wickets', winner: 'PBKS', team1Score: '', team2Score: '' },
    { id: 6, matchNumber: 6, team1: 'KKR', team2: 'SRH', date: '2026-04-02', time: '19:30', venue: 'Eden Gardens', status: 'SRH won by 65 runs', winner: 'SRH', team1Score: '', team2Score: '' },
    { id: 5, matchNumber: 5, team1: 'LSG', team2: 'DC', date: '2026-04-01', time: '19:30', venue: 'BRSABV Ekana Stadium', status: 'DC won by 6 wickets', winner: 'DC', team1Score: '', team2Score: '' },
    { id: 4, matchNumber: 4, team1: 'PBKS', team2: 'GT', date: '2026-03-31', time: '19:30', venue: 'Maharaja Yadavindra Singh International Cricket Stadium', status: 'PBKS won by 3 wickets', winner: 'PBKS', team1Score: '', team2Score: '' },
    { id: 3, matchNumber: 3, team1: 'RR', team2: 'CSK', date: '2026-03-30', time: '19:30', venue: 'Barsapara Cricket Stadium', status: 'RR won by 8 wickets', winner: 'RR', team1Score: '', team2Score: '' },
    { id: 2, matchNumber: 2, team1: 'MI', team2: 'KKR', date: '2026-03-29', time: '19:30', venue: 'Wankhede Stadium', status: 'MI won by 6 wickets', winner: 'MI', team1Score: '', team2Score: '' },
    { id: 1, matchNumber: 1, team1: 'RCB', team2: 'SRH', date: '2026-03-28', time: '19:30', venue: 'M Chinnaswamy Stadium', status: 'RCB won by 6 wickets', winner: 'RCB', team1Score: '', team2Score: '' },
  ],
  remainingMatches: [
    { id: 65, matchNumber: 65, team1: 'KKR', team2: 'MI', date: '2026-05-20', time: '19:30', venue: 'Eden Gardens', status: 'Upcoming', winner: '', team1Score: '', team2Score: '' },
    { id: 66, matchNumber: 66, team1: 'GT', team2: 'CSK', date: '2026-05-21', time: '19:30', venue: 'Narendra Modi Stadium', status: 'Upcoming', winner: '', team1Score: '', team2Score: '' },
    { id: 67, matchNumber: 67, team1: 'SRH', team2: 'RCB', date: '2026-05-22', time: '19:30', venue: 'Rajiv Gandhi International Cricket Stadium', status: 'Upcoming', winner: '', team1Score: '', team2Score: '' },
    { id: 68, matchNumber: 68, team1: 'LSG', team2: 'PBKS', date: '2026-05-23', time: '19:30', venue: 'BRSABV Ekana Stadium', status: 'Upcoming', winner: '', team1Score: '', team2Score: '' },
    { id: 69, matchNumber: 69, team1: 'MI', team2: 'RR', date: '2026-05-24', time: '15:30', venue: 'Wankhede Stadium', status: 'Upcoming', winner: '', team1Score: '', team2Score: '' },
    { id: 70, matchNumber: 70, team1: 'KKR', team2: 'DC', date: '2026-05-24', time: '19:30', venue: 'Eden Gardens', status: 'Upcoming', winner: '', team1Score: '', team2Score: '' },
  ],
};

export const fetchIPLData = async () => {
  return defaultData;
};

export const fetchRemainingMatches = async () => {
  return defaultData.remainingMatches;
};

export const fetchCompletedMatches = async () => {
  return defaultData.completedMatches;
};

export const getLastUpdated = () => {
  const d = new Date(defaultData.lastUpdated);
  return d.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const forceRefresh = async () => {
  return defaultData;
};

export const updateDataManually = (newData) => {
  return {
    ...defaultData,
    ...newData,
    lastUpdated: newData.lastUpdated || new Date().toISOString(),
  };
};
