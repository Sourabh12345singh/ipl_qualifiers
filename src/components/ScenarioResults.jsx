import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, Eye } from 'lucide-react';

const ScenarioResults = ({ result, onViewAll, getTeamById }) => {
  if (!result) return null;

  if (!result.possible) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 border-red-500/30"
      >
        <div className="flex items-center gap-3 mb-3">
          <XCircle className="w-6 h-6 text-accent-orange" />
          <h3 className="text-lg font-bold text-text-primary">Not Possible</h3>
        </div>
        <p className="text-text-secondary text-sm">{result.message}</p>
        <p className="text-xs text-text-muted mt-2">
          {result.totalSimulations?.toLocaleString()} scenarios checked
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-accent-green" />
          <h3 className="text-lg font-bold text-text-primary">
            {result.totalScenarios} way{result.totalScenarios > 1 ? 's' : ''} found
          </h3>
        </div>
        <span className="text-xs text-text-muted">
          {result.totalSimulations?.toLocaleString()} checked
        </span>
      </div>

      {result.scenarios.map((scenario, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card p-4 sm:p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-full bg-accent-green/20 text-accent-green flex items-center justify-center text-sm font-bold">
              {index + 1}
            </span>
            <h4 className="font-semibold text-text-primary">
              Scenario {index + 1}
            </h4>
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
                    <span className="text-sm">{meta?.logo}</span>
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

      {result.totalScenarios > result.scenarios.length && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onViewAll}
          className="w-full flex items-center justify-center gap-2 p-3 glass-card text-accent-blue font-medium hover:bg-bg-card-hover transition-colors"
        >
          <Eye className="w-4 h-4" />
          View all {result.totalScenarios} scenarios
        </motion.button>
      )}
    </motion.div>
  );
};

export default ScenarioResults;
