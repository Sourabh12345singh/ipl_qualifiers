import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

const MatchCard = ({ match, team1, team2, winner, onSelectWinner }) => {
  const matchKey = [match.team1, match.team2].sort().join('-');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="glass-card p-4 sm:p-5 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-1.5 text-text-muted text-xs sm:text-sm">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{match.date}</span>
        </div>
        <div className="flex items-center gap-1.5 text-text-muted text-xs sm:text-sm">
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">{match.venue}</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectWinner(matchKey, match.team1)}
          className={`flex-1 flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl transition-all duration-200 ${
            winner === match.team1
              ? 'bg-accent-green/20 border-2 border-accent-green'
              : 'bg-bg-card hover:bg-bg-card-hover border-2 border-transparent'
          }`}
        >
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-xl flex-shrink-0"
            style={{ backgroundColor: `${team1.color}30` }}
          >
            {team1.logo}
          </div>
          <div className="text-left min-w-0">
            <p className="font-semibold text-text-primary text-xs sm:text-sm truncate">
              {team1.shortName}
            </p>
            <p className="text-xs text-text-secondary hidden sm:block truncate">
              {team1.name}
            </p>
          </div>
        </motion.button>

        <div className="flex flex-col items-center px-1">
          <span className="text-text-muted font-bold text-xs sm:text-sm">VS</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectWinner(matchKey, match.team2)}
          className={`flex-1 flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl transition-all duration-200 ${
            winner === match.team2
              ? 'bg-accent-green/20 border-2 border-accent-green'
              : 'bg-bg-card hover:bg-bg-card-hover border-2 border-transparent'
          }`}
        >
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-xl flex-shrink-0"
            style={{ backgroundColor: `${team2.color}30` }}
          >
            {team2.logo}
          </div>
          <div className="text-left min-w-0">
            <p className="font-semibold text-text-primary text-xs sm:text-sm truncate">
              {team2.shortName}
            </p>
            <p className="text-xs text-text-secondary hidden sm:block truncate">
              {team2.name}
            </p>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MatchCard;
