import { motion } from 'framer-motion';
import { ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react';

const PointsTable = ({ teams, sortBy, onSortChange }) => {
  const sortedTeams = [...teams].sort((a, b) => {
    if (sortBy === 'points') {
      if (b.points !== a.points) return b.points - a.points;
      return b.nrr - a.nrr;
    }
    return b.nrr - a.nrr;
  });

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-3 sm:p-4 lg:p-6 border-b border-border-glass">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg lg:text-xl font-bold text-text-primary">
            Points Table
          </h2>
          <div className="flex gap-1.5 sm:gap-2">
            {['points', 'nrr'].map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSortChange(option)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  sortBy === option
                    ? 'bg-accent-orange/20 text-accent-orange'
                    : 'text-text-secondary hover:bg-bg-card'
                }`}
              >
                {option === 'points' ? 'Pts' : 'NRR'}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-border-glass">
              <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                #
              </th>
              <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                Team
              </th>
              <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-center text-xs font-semibold text-text-muted uppercase tracking-wider">
                MP
              </th>
              <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-center text-xs font-semibold text-text-muted uppercase tracking-wider">
                W
              </th>
              <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-center text-xs font-semibold text-text-muted uppercase tracking-wider">
                L
              </th>
              <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-center text-xs font-semibold text-text-muted uppercase tracking-wider">
                Pts
              </th>
              <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-center text-xs font-semibold text-text-muted uppercase tracking-wider">
                NRR
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => {
              const isPlayoff = index < 4;
              const isDanger = index >= 4 && index < 6;
              const prevNRR = index > 0 ? sortedTeams[index - 1].nrr : team.nrr;
              const nrrTrend = team.nrr > prevNRR ? 'up' : 'down';

              return (
                <motion.tr
                  key={team.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  className={`border-b border-border-glass/50 transition-colors ${
                    isPlayoff
                      ? 'bg-accent-green/5'
                      : isDanger
                      ? 'bg-accent-gold/5'
                      : ''
                  }`}
                >
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                    <div
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                        isPlayoff
                          ? 'bg-accent-green/20 text-accent-green'
                          : isDanger
                          ? 'bg-accent-gold/20 text-accent-gold'
                          : 'bg-bg-card text-text-muted'
                      }`}
                    >
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-base sm:text-lg flex-shrink-0"
                        style={{ backgroundColor: `${team.color}30` }}
                      >
                        {team.logo}
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary text-xs sm:text-sm">
                          {team.shortName}
                        </p>
                        <p className="text-xs text-text-muted hidden sm:block">
                          {team.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-center font-mono text-text-secondary text-xs sm:text-sm">
                    {team.played}
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-center font-mono text-accent-green text-xs sm:text-sm">
                    {team.won}
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-center font-mono text-accent-orange text-xs sm:text-sm">
                    {team.lost}
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-center font-mono font-bold text-text-primary text-xs sm:text-sm">
                    {team.points}
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span
                        className={`font-mono text-xs sm:text-sm ${
                          team.nrr > 0 ? 'text-accent-green' : 'text-accent-orange'
                        }`}
                      >
                        {team.nrr > 0 ? '+' : ''}
                        {team.nrr.toFixed(2)}
                      </span>
                      {nrrTrend === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-accent-green hidden sm:block" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-accent-orange hidden sm:block" />
                      )}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-3 sm:p-4 flex flex-wrap gap-3 sm:gap-4 text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-green/30 border border-accent-green"></div>
          <span>Playoff Zone (Top 4)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-gold/30 border border-accent-gold"></div>
          <span>Danger Zone (5-6)</span>
        </div>
      </div>
    </div>
  );
};

export default PointsTable;
