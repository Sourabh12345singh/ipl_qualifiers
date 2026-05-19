import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Zap } from 'lucide-react';

const TeamSelector = ({ teams, selected, onToggle, onRun, isRunning }) => {
  const sortedTeams = [...teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.nrr - a.nrr;
  });

  return (
    <div className="glass-card p-4 sm:p-5 lg:p-6">
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-accent-gold" />
        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-text-primary">
          Pick Your Playoff Teams
        </h3>
      </div>
      <p className="text-xs sm:text-sm text-text-secondary mb-4">
        Select 1 to 4 teams you want to see qualify together
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-4 sm:mb-5">
        {sortedTeams.map((team) => {
          const isSelected = selected.includes(team.id);
          return (
            <motion.button
              key={team.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onToggle(team.id)}
              disabled={!isSelected && selected.length >= 4}
              className={`relative p-2 sm:p-3 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-accent-green bg-accent-green/10'
                  : selected.length >= 4
                  ? 'border-border-glass/30 bg-bg-card/50 opacity-40 cursor-not-allowed'
                  : 'border-border-glass bg-bg-card hover:border-border-glass/50'
              }`}
            >
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg sm:text-xl"
                  style={{ backgroundColor: `${team.color}30` }}
                >
                  {team.logo}
                </div>
                <p className="font-semibold text-text-primary text-xs sm:text-sm truncate w-full text-center">
                  {team.shortName}
                </p>
                <p className="text-xs text-text-muted">{team.points} pts</p>
              </div>
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-accent-green rounded-full flex items-center justify-center"
                  >
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-bg-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-text-secondary">
            {selected.length} / 4 selected
          </span>
          {selected.length > 0 && (
            <button
              onClick={() => selected.forEach((id) => onToggle(id))}
              className="flex items-center gap-1 text-xs text-text-muted hover:text-accent-orange transition-colors"
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>
        <motion.button
          whileHover={{ scale: selected.length > 0 ? 1.05 : 1 }}
          whileTap={{ scale: selected.length > 0 ? 0.95 : 1 }}
          onClick={onRun}
          disabled={selected.length === 0 || isRunning}
          className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
            selected.length > 0 && !isRunning
              ? 'bg-gradient-to-r from-accent-orange to-accent-gold text-bg-primary shadow-lg shadow-accent-orange/30'
              : 'bg-bg-card text-text-muted cursor-not-allowed'
          }`}
        >
          {isRunning ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Running...
            </span>
          ) : (
            'Run Analysis'
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default TeamSelector;
