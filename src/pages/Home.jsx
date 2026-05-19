import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, TrendingUp, Users, Zap, Clock } from 'lucide-react';
import { fetchIPLData, getLastUpdated } from '../utils/iplData';
import { teamMeta } from '../data/teams';
import TeamCard from '../components/TeamCard';

const Home = () => {
  const [top4, setTop4] = useState(getFallbackTop4());
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchIPLData();
        const sorted = [...data.pointsTable].sort((a, b) => {
          if (b.points !== a.points) return b.points - a.points;
          return b.nrr - a.nrr;
        });
        const formatted = sorted.slice(0, 4).map((t) => ({
          id: t.short.toLowerCase(),
          shortName: t.short,
          name: t.team,
          color: teamMeta[t.short]?.color || '#888888',
          logo: teamMeta[t.short]?.logo || '🏏',
          played: t.played,
          won: t.won,
          lost: t.lost,
          points: t.points,
          nrr: t.nrr,
        }));
        setTop4(formatted);
        setLastUpdated(getLastUpdated());
      } catch {
        console.log('Using cached standings');
      }
    };
    loadData();
  }, []);

  const stats = [
    { icon: Trophy, label: 'Teams', value: '10' },
    { icon: TrendingUp, label: 'Matches Left', value: '6' },
    { icon: Users, label: 'Playoff Spots', value: '4' },
    { icon: Zap, label: 'Predictions', value: '∞' },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-orange/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-sm font-medium mb-6"
            >
              <Trophy className="w-4 h-4" />
              <span>IPL 2026 Playoff Race</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">Predict The Playoffs</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-8">
              Analyze the points table, predict match winners, and see which teams
              make it to the IPL 2026 playoffs. Your predictions, your insights.
            </p>

            <Link to="/predictor">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-orange to-accent-gold rounded-xl text-bg-primary font-bold text-lg shadow-lg shadow-accent-orange/30 hover:shadow-accent-orange/50 transition-shadow"
              >
                Start Predicting
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="glass-card p-5 text-center"
                >
                  <Icon className="w-8 h-8 mx-auto mb-2 text-accent-orange" />
                  <p className="text-2xl font-bold text-text-primary font-mono">
                    {stat.value}
                  </p>
                  <p className="text-sm text-text-muted">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
              Current Top 4
            </h2>
            <div className="flex items-center justify-center gap-2">
              <p className="text-text-secondary">Teams leading the playoff race</p>
              {lastUpdated && (
                <span className="flex items-center gap-1 text-xs text-text-muted">
                  <Clock className="w-3 h-3" />
                  {lastUpdated}
                </span>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {top4.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <TeamCard team={team} rank={index} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-8"
          >
            <Link to="/predictor">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 glass-card text-text-primary font-medium hover:bg-bg-card-hover transition-colors"
              >
                View Full Points Table
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const getFallbackTop4 = () => [
  { id: 'rcb', shortName: 'RCB', name: 'Royal Challengers Bengaluru', color: '#ec1c24', logo: '🔴', played: 13, won: 9, lost: 4, points: 18, nrr: 1.065 },
  { id: 'gt', shortName: 'GT', name: 'Gujarat Titans', color: '#1c2841', logo: '🟡', played: 13, won: 8, lost: 5, points: 16, nrr: 0.4 },
  { id: 'srh', shortName: 'SRH', name: 'Sunrisers Hyderabad', color: '#f7a721', logo: '☀️', played: 13, won: 8, lost: 5, points: 16, nrr: 0.35 },
  { id: 'pbks', shortName: 'PBKS', name: 'Punjab Kings', color: '#dd1f2d', logo: '🔶', played: 13, won: 6, lost: 6, points: 13, nrr: 0.227 },
];

export default Home;
