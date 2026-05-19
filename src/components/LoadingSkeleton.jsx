const LoadingSkeleton = ({ type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="glass-card p-5 animate-shimmer">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-24 bg-bg-card rounded"></div>
          <div className="h-4 w-20 bg-bg-card rounded"></div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-3 p-3">
            <div className="w-10 h-10 rounded-full bg-bg-card"></div>
            <div className="space-y-2">
              <div className="h-4 w-16 bg-bg-card rounded"></div>
              <div className="h-3 w-24 bg-bg-card rounded"></div>
            </div>
          </div>
          <div className="h-6 w-8 bg-bg-card rounded"></div>
          <div className="flex-1 flex items-center gap-3 p-3">
            <div className="w-10 h-10 rounded-full bg-bg-card"></div>
            <div className="space-y-2">
              <div className="h-4 w-16 bg-bg-card rounded"></div>
              <div className="h-3 w-24 bg-bg-card rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="glass-card p-6 animate-shimmer">
        <div className="h-8 w-40 bg-bg-card rounded mb-6"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-bg-card"></div>
              <div className="flex-1 h-4 bg-bg-card rounded"></div>
              <div className="w-12 h-4 bg-bg-card rounded"></div>
              <div className="w-12 h-4 bg-bg-card rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 animate-shimmer">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-bg-card"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-bg-card rounded"></div>
          <div className="h-3 w-20 bg-bg-card rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
