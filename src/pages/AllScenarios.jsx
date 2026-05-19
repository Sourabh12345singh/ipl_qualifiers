import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';
import { teamMeta } from '../data/teams';

const AllScenarios = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scenarios, selectedTeams } = location.state || {};

  if (!scenarios) {
    navigate('/predictor');
    return null;
  }

  const getTeamById = (id) => ({
    shortName: id.toUpperCase(),
    logo: teamMeta[id.toUpperCase()]?.logo || '🏏',
    color: teamMeta[id.toUpperCase()]?.color || '#888',
  });

  return (
    <div className="min-h-screen bg-gradient-hero pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/predictor')}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Predictor
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
            <span className="gradient-text-blue">All Scenarios</span>
          </h1>
          <p className="text-text-secondary">
            {scenarios.length} ways for{' '}
            {selectedTeams.map((t) => t.toUpperCase()).join(', ')} to qualify
          </p>
        </motion.div>

        <div className="space-y-4">
          {scenarios.map((scenario, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-accent-green" />
                <h3 className="font-bold text-text-primary">
                  Scenario {index + 1}
                </h3>
              </div>

              <div className="space-y-2 mb-4">
                {scenario.scenarioText.map((line, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-accent-gold mt-1 flex-shrink-0" />
                    <p className="text-sm text-text-secondary">{line}</p>
                  </div>
                ))}
              </div>

              <div className="bg-bg-card/50 rounded-lg p-3">
                <p className="text-xs text-text-muted mb-2 font-semibold uppercase tracking-wider">
                  Final Top 4
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {scenario.finalStandings.map((team, i) => {
                    const meta = getTeamById(team.id);
                    return (
                      <div
                        key={team.id}
                        className="flex items-center gap-2 bg-bg-primary/50 rounded-lg p-2"
                      >
                        <span className="text-xs text-text-muted font-mono">
                          #{i + 1}
                        </span>
                        <span className="text-sm">{meta.logo}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-text-primary truncate">
                            {team.shortName}
                          </p>
                          <p className="text-xs text-text-muted">
                            {team.points} pts
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllScenarios;
