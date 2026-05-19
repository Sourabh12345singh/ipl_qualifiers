import { motion } from 'framer-motion';

const ProbabilityBar = ({ team, index }) => {
  const getColor = (prob) => {
    if (prob >= 75) return 'from-accent-green to-emerald-400';
    if (prob >= 50) return 'from-accent-gold to-yellow-400';
    if (prob >= 25) return 'from-accent-orange to-orange-400';
    return 'from-red-500 to-red-400';
  };

  const getLabel = (prob) => {
    if (prob >= 75) return 'Strong';
    if (prob >= 50) return 'Good';
    if (prob >= 25) return 'Risky';
    return 'Unlikely';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.01 }}
      className="glass-card p-4 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
            style={{ backgroundColor: `${team.color}30` }}
          >
            {team.logo}
          </div>
          <div>
            <p className="font-semibold text-text-primary">{team.name}</p>
            <p className="text-xs text-text-muted">{getLabel(team.probability)}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl font-bold text-text-primary">
            {team.probability.toFixed(0)}%
          </p>
        </div>
      </div>

      <div className="relative h-3 bg-bg-card rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${team.probability}%` }}
          transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
          className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${getColor(
            team.probability
          )}`}
        />
      </div>
    </motion.div>
  );
};

export default ProbabilityBar;
