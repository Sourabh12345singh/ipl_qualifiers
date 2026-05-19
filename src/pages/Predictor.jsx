import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, RefreshCw, Target, Clock, TrendingUp } from 'lucide-react';
import { teamMeta } from '../data/teams';
import { fetchIPLData, getLastUpdated, forceRefresh } from '../utils/iplData';
import { getPredictedTable, calculateQualificationStatus, generateInsights, sortTeams } from '../utils/calculations';
import { findQualificationScenarios } from '../utils/algo';
import PointsTable from '../components/PointsTable';
import MatchCard from '../components/MatchCard';
import TeamSelector from '../components/TeamSelector';
import ScenarioResults from '../components/ScenarioResults';

const Predictor = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState(getFallbackTeams());
  const [matches, setMatches] = useState(getFallbackMatches());
  const [matchPredictions, setMatchPredictions] = useState({});
  const [sortBy, setSortBy] = useState('points');
  const [lastUpdated, setLastUpdated] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [selectedTeams, setSelectedTeams] = useState([]);
  const [algoResult, setAlgoResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const loadData = async () => {
    try {
      const data = await fetchIPLData();
      const formattedTeams = data.pointsTable.map((t) => ({
        id: t.short.toLowerCase(),
        shortName: t.short,
        name: t.team,
        color: teamMeta[t.short]?.color || '#888888',
        logo: teamMeta[t.short]?.logo || '🏏',
        played: t.played,
        won: t.won,
        lost: t.lost,
        noResult: t.noResult || 0,
        points: t.points,
        nrr: t.nrr,
      }));
      setTeams(formattedTeams);

      const formattedMatches = data.remainingMatches.map((m, i) => ({
        id: m.id || i + 1,
        team1: m.team1.toLowerCase(),
        team2: m.team2.toLowerCase(),
        date: m.date,
        venue: m.venue || 'TBA',
      }));
      setMatches(formattedMatches);
      setLastUpdated(getLastUpdated());
    } catch {
      console.log('Using default data');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectWinner = (matchKey, winnerId) => {
    setMatchPredictions((prev) => ({
      ...prev,
      [matchKey]: prev[matchKey] === winnerId ? null : winnerId,
    }));
    setAlgoResult(null);
  };

  const handleReset = () => {
    setMatchPredictions({});
    setSelectedTeams([]);
    setAlgoResult(null);
  };

  const handleToggleTeam = (teamId) => {
    setSelectedTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : prev.length < 4
        ? [...prev, teamId]
        : prev
    );
  };

  const handleRunAnalysis = () => {
    if (selectedTeams.length === 0) return;
    setIsRunning(true);

    setTimeout(() => {
      const result = findQualificationScenarios(teams, matches, selectedTeams, 3);
      setAlgoResult(result);
      setIsRunning(false);
    }, 100);
  };

  const handleViewAllScenarios = () => {
    if (!algoResult || !algoResult.possible) return;
    const allResult = findQualificationScenarios(teams, matches, selectedTeams);
    navigate('/scenarios', {
      state: {
        scenarios: allResult.scenarios,
        totalScenarios: allResult.totalScenarios,
        totalSimulations: allResult.totalSimulations,
        selectedTeams,
      },
    });
  };

  const handleForceRefresh = async () => {
    setRefreshing(true);
    await forceRefresh();
    await loadData();
    setRefreshing(false);
  };

  const predictedTable = getPredictedTable(teams, matches, matchPredictions);
  const qualStatus = calculateQualificationStatus(teams, matches, matchPredictions);
  const insights = generateInsights(teams, matches, matchPredictions);
  const sortedTeams = sortTeams(teams, sortBy);

  const getTeamById = (id) => teams.find((t) => t.id === id);

  const predictedCount = Object.values(matchPredictions).filter(Boolean).length;

  const maxPoints = predictedTable.length > 0 ? predictedTable[0].predictedPoints : 20;

  return (
    <div className="min-h-screen bg-gradient-hero pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
                <span className="gradient-text-blue">Playoff Predictor</span>
              </h1>
              <div className="flex items-center gap-3">
                <p className="text-text-secondary">
                  Select match winners to predict playoff qualification
                </p>
                {lastUpdated && (
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <Clock className="w-3 h-3" />
                    {lastUpdated}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleForceRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 glass-card text-text-secondary text-sm hover:text-text-primary transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 glass-card text-text-secondary text-sm hover:text-text-primary transition-colors"
              >
                Reset
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="mb-8">
          <TeamSelector
            teams={teams}
            selected={selectedTeams}
            onToggle={handleToggleTeam}
            onRun={handleRunAnalysis}
            isRunning={isRunning}
          />
        </div>

        <AnimatePresence>
          {algoResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-accent-green" />
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
                  Qualification Analysis
                </h2>
              </div>
              <ScenarioResults
                result={algoResult}
                onViewAll={handleViewAllScenarios}
                getTeamById={getTeamById}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <PointsTable
                teams={sortedTeams}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4">
                Upcoming Matches
              </h2>

              {matches.length === 0 ? (
                <div className="glass-card p-8 text-center">
                  <p className="text-text-secondary">No remaining matches found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {matches.map((match) => {
                    const team1 = getTeamById(match.team1);
                    const team2 = getTeamById(match.team2);
                    if (!team1 || !team2) return null;
                    const matchKey = [match.team1, match.team2].sort().join('-');
                    return (
                      <MatchCard
                        key={match.id}
                        match={match}
                        team1={team1}
                        team2={team2}
                        winner={matchPredictions[matchKey]}
                        onSelectWinner={handleSelectWinner}
                      />
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-accent-green" />
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
                  Predicted Standings
                </h2>
              </div>

              <div className="glass-card overflow-hidden">
                <div className="p-4 border-b border-border-glass">
                  <p className="text-sm text-text-secondary">
                    {predictedCount > 0
                      ? `${predictedCount}/${matches.length} matches predicted`
                      : 'Select winners above'}
                  </p>
                </div>

                <div className="divide-y divide-border-glass/50">
                  {predictedTable.map((team, index) => {
                    const isPlayoff = index < 4;
                    const pointsChanged = team.predictedPoints !== team.points;
                    const barWidth = (team.predictedPoints / maxPoints) * 100;

                    return (
                      <motion.div
                        key={team.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-3 transition-colors ${
                          isPlayoff ? 'bg-accent-green/5' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                              isPlayoff
                                ? 'bg-accent-green/20 text-accent-green'
                                : 'bg-bg-card text-text-muted'
                            }`}
                          >
                            {index + 1}
                          </div>

                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                            style={{ backgroundColor: `${team.color}30` }}
                          >
                            {team.logo}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-text-primary text-sm truncate">
                              {team.shortName}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="font-mono font-bold text-text-primary text-sm">
                              {team.predictedPoints}
                            </p>
                            {pointsChanged && (
                              <p className="text-xs text-accent-green">
                                {team.predictedPoints > team.points ? '+' : ''}
                                {team.predictedPoints - team.points}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="relative h-2 bg-bg-card rounded-full overflow-hidden ml-10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${barWidth}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className={`h-full rounded-full ${
                              isPlayoff
                                ? 'bg-gradient-to-r from-accent-green to-emerald-400'
                                : 'bg-gradient-to-r from-text-muted/50 to-text-muted/30'
                            }`}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="p-3 border-t border-border-glass">
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <div className="w-3 h-3 rounded-full bg-accent-green/30 border border-accent-green"></div>
                    <span>Playoff Zone</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent-gold" />
                Insights
              </h2>
              <div className="glass-card p-5 space-y-4">
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent-gold mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-text-secondary">{insight}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getFallbackTeams = () => [
  { id: 'rcb', shortName: 'RCB', name: 'Royal Challengers Bengaluru', color: '#ec1c24', logo: '🔴', played: 13, won: 9, lost: 4, noResult: 0, points: 18, nrr: 1.065 },
  { id: 'gt', shortName: 'GT', name: 'Gujarat Titans', color: '#1c2841', logo: '🟡', played: 13, won: 8, lost: 5, noResult: 0, points: 16, nrr: 0.4 },
  { id: 'srh', shortName: 'SRH', name: 'Sunrisers Hyderabad', color: '#f7a721', logo: '☀️', played: 13, won: 8, lost: 5, noResult: 0, points: 16, nrr: 0.35 },
  { id: 'pbks', shortName: 'PBKS', name: 'Punjab Kings', color: '#dd1f2d', logo: '🔶', played: 13, won: 6, lost: 6, noResult: 1, points: 13, nrr: 0.227 },
  { id: 'rr', shortName: 'RR', name: 'Rajasthan Royals', color: '#ea1a85', logo: '👑', played: 12, won: 6, lost: 6, noResult: 0, points: 12, nrr: 0.027 },
  { id: 'csk', shortName: 'CSK', name: 'Chennai Super Kings', color: '#fdb913', logo: '🦁', played: 13, won: 6, lost: 7, noResult: 0, points: 12, nrr: -0.016 },
  { id: 'dc', shortName: 'DC', name: 'Delhi Capitals', color: '#004c93', logo: '🏛️', played: 13, won: 6, lost: 7, noResult: 0, points: 12, nrr: -0.871 },
  { id: 'kkr', shortName: 'KKR', name: 'Kolkata Knight Riders', color: '#3a225d', logo: '🟣', played: 12, won: 5, lost: 6, noResult: 1, points: 11, nrr: -0.038 },
  { id: 'mi', shortName: 'MI', name: 'Mumbai Indians', color: '#004ba0', logo: '🔵', played: 12, won: 4, lost: 8, noResult: 0, points: 8, nrr: -0.504 },
  { id: 'lsg', shortName: 'LSG', name: 'Lucknow Super Giants', color: '#00b2e3', logo: '⚡', played: 12, won: 4, lost: 8, noResult: 0, points: 8, nrr: -0.701 },
];

const getFallbackMatches = () => [
  { id: 1, team1: 'rr', team2: 'csk', date: '2026-05-20', venue: 'Sawai Mansingh Stadium' },
  { id: 2, team1: 'kkr', team2: 'mi', date: '2026-05-21', venue: 'Eden Gardens' },
  { id: 3, team1: 'lsg', team2: 'dc', date: '2026-05-22', venue: 'BRSABV Ekana Stadium' },
  { id: 4, team1: 'rcb', team2: 'gt', date: '2026-05-23', venue: 'M Chinnaswamy Stadium' },
  { id: 5, team1: 'srh', team2: 'pbks', date: '2026-05-24', venue: 'Rajiv Gandhi Stadium' },
  { id: 6, team1: 'mi', team2: 'rr', date: '2026-05-25', venue: 'Wankhede Stadium' },
];

export default Predictor;
