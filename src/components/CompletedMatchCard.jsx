import { motion } from 'framer-motion';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const CompletedMatchCard = ({ match }) => {
  const team1 = match.team1;
  const team2 = match.team2;
  const winner = match.winner;
  const result = match.result;
  const team1Score = match.team1Score;
  const team2Score = match.team2Score;

  const isTeam1Winner = winner?.toLowerCase() === team1.toLowerCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-3 sm:p-4 opacity-80 hover:opacity-100 transition-opacity"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-text-muted text-xs">
          <Calendar className="w-3 h-3" />
          <span>{match.date}</span>
        </div>
        <div className="flex items-center gap-1 text-text-muted text-xs">
          <MapPin className="w-3 h-3" />
          <span className="hidden sm:inline">{match.venue}</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className={`flex-1 text-center ${isTeam1Winner ? 'text-accent-green' : 'text-text-secondary'}`}>
          <p className="font-bold text-sm">{team1}</p>
          {team1Score && (
            <p className="text-xs text-text-muted font-mono">{team1Score}</p>
          )}
          {isTeam1Winner && (
            <CheckCircle2 className="w-4 h-4 mx-auto mt-1 text-accent-green" />
          )}
        </div>

        <div className="text-center px-2">
          <span className="text-text-muted font-bold text-xs">VS</span>
        </div>

        <div className={`flex-1 text-center ${!isTeam1Winner ? 'text-accent-green' : 'text-text-secondary'}`}>
          <p className="font-bold text-sm">{team2}</p>
          {team2Score && (
            <p className="text-xs text-text-muted font-mono">{team2Score}</p>
          )}
          {!isTeam1Winner && (
            <CheckCircle2 className="w-4 h-4 mx-auto mt-1 text-accent-green" />
          )}
        </div>
      </div>

      {result && (
        <p className="text-center text-xs text-accent-gold mt-2 font-medium">
          {result}
        </p>
      )}
    </motion.div>
  );
};

export default CompletedMatchCard;
