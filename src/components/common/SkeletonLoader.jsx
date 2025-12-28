export const SkeletonLoader = ({ count = 1, width = 'w-full', height = 'h-12' }) => {
  return (
    <>
      {Array(count).fill(0).map((_, i) => (
        <div
          key={i}
          className={`${width} ${height} bg-gray-700 rounded-lg animate-pulse mb-4`}
        />
      ))}
    </>
  );
};

export const CardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="bg-gray-800 rounded-lg p-6 animate-pulse mb-4">
          <div className="h-48 bg-gray-700 rounded-lg mb-4" />
          <div className="h-6 bg-gray-700 rounded w-3/4 mb-3" />
          <div className="h-4 bg-gray-700 rounded w-full mb-2" />
          <div className="h-4 bg-gray-700 rounded w-5/6" />
        </div>
      ))}
    </>
  );
};

export const TableSkeleton = ({ rows = 5, cols = 4 }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-3">
      {Array(rows).fill(0).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array(cols).fill(0).map((_, j) => (
            <div key={j} className="flex-1 h-10 bg-gray-700 rounded animate-pulse" />
          ))}
        </div>
      ))}
    </div>
  );
};
