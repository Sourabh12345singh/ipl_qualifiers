import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

const MatchCard = ({ match, team1, team2, winner, onSelectWinner }) => {
  const matchKey = [match.team1, match.team2].sort().join('-');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="glass-card p-5 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-text-muted text-sm">
          <Calendar className="w-4 h-4" />
          <span>{match.date}</span>
        </div>
        <div className="flex items-center gap-2 text-text-muted text-sm">
          <MapPin className="w-4 h-4" />
          <span className="hidden sm:inline">{match.venue}</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectWinner(matchKey, match.team1)}
          className={`flex-1 flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
            winner === match.team1
              ? 'bg-accent-green/20 border-2 border-accent-green'
              : 'bg-bg-card hover:bg-bg-card-hover border-2 border-transparent'
          }`}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{ backgroundColor: `${team1.color}30` }}
          >
            {team1.logo}
          </div>
          <div className="text-left">
            <p className="font-semibold text-text-primary text-sm sm:text-base">
              {team1.shortName}
            </p>
            <p className="text-xs text-text-secondary hidden sm:block">
              {team1.name}
            </p>
          </div>
        </motion.button>

        <div className="flex flex-col items-center">
          <span className="text-text-muted font-bold text-sm">VS</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectWinner(matchKey, match.team2)}
          className={`flex-1 flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
            winner === match.team2
              ? 'bg-accent-green/20 border-2 border-accent-green'
              : 'bg-bg-card hover:bg-bg-card-hover border-2 border-transparent'
          }`}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{ backgroundColor: `${team2.color}30` }}
          >
            {team2.logo}
          </div>
          <div className="text-left">
            <p className="font-semibold text-text-primary text-sm sm:text-base">
              {team2.shortName}
            </p>
            <p className="text-xs text-text-secondary hidden sm:block">
              {team2.name}
            </p>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MatchCard;
