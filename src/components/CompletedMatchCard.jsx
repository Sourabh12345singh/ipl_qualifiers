import { motion } from 'framer-motion';
import { Calendar, MapPin, CheckCircle2, Trophy } from 'lucide-react';

const CompletedMatchCard = ({ match }) => {
  const team1 = match.team1;
  const team2 = match.team2;
  const winner = match.winner;
  const status = match.status;
  const team1Score = match.team1Score;
  const team2Score = match.team2Score;

  const isTeam1Winner = winner?.toLowerCase() === team1.toLowerCase();
  const isNoResult = status?.toLowerCase().includes('no result');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card p-3 sm:p-4 group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-text-muted text-xs">
          <Calendar className="w-3 h-3" />
          <span>{match.date}</span>
        </div>
        <span className={`status-badge ${isNoResult ? 'upcoming' : 'completed'}`}>
          {isNoResult ? 'No Result' : 'Completed'}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 mb-3">
        <div className={`flex-1 text-center transition-all duration-300 ${isTeam1Winner && !isNoResult ? 'text-accent-green font-bold' : 'text-text-secondary'}`}>
          <p className="text-sm sm:text-base">{team1}</p>
          {team1Score && (
            <p className="text-xs text-text-muted font-mono mt-0.5">{team1Score}</p>
          )}
        </div>

        <div className="text-center px-2">
          <span className="text-text-muted font-bold text-xs">VS</span>
        </div>

        <div className={`flex-1 text-center transition-all duration-300 ${!isTeam1Winner && !isNoResult ? 'text-accent-green font-bold' : 'text-text-secondary'}`}>
          <p className="text-sm sm:text-base">{team2}</p>
          {team2Score && (
            <p className="text-xs text-text-muted font-mono mt-0.5">{team2Score}</p>
          )}
        </div>
      </div>

      {status && !isNoResult && (
        <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-border-glass/50">
          <Trophy className="w-3 h-3 text-accent-gold" />
          <p className="text-xs text-accent-gold font-medium">
            {status}
          </p>
        </div>
      )}

      {isNoResult && (
        <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-border-glass/50">
          <span className="text-xs text-text-muted">
            Match abandoned without result
          </span>
        </div>
      )}

      {(isTeam1Winner || (!isTeam1Winner && !isNoResult)) && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <CheckCircle2 className="w-4 h-4 text-accent-green" />
        </div>
      )}
    </motion.div>
  );
};

export default CompletedMatchCard;
