import { motion } from 'framer-motion';

const TeamCard = ({ team, rank, onClick }) => {
  const isPlayoff = rank < 4;

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`glass-card p-3 sm:p-4 cursor-pointer transition-all duration-300 ${
        isPlayoff ? 'border-accent-green/30 bg-accent-green/5' : ''
      }`}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl"
            style={{ backgroundColor: `${team.color}30` }}
          >
            {team.logo}
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs font-bold ${
              isPlayoff
                ? 'bg-accent-green text-bg-primary'
                : 'bg-text-muted/30 text-text-muted'
            }`}
          >
            {rank + 1}
          </motion.div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary text-sm sm:text-base truncate">
            {team.shortName}
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary">{team.points} pts</p>
        </div>
        <div className="text-right">
          <p className={`font-mono text-xs sm:text-sm font-semibold ${
            team.nrr > 0 ? 'text-accent-green' : team.nrr < 0 ? 'text-accent-orange' : 'text-text-primary'
          }`}>
            {team.nrr > 0 ? '+' : ''}
            {team.nrr.toFixed(3)}
          </p>
          <p className="text-xs text-text-muted">NRR</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;
