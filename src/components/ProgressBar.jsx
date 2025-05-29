const ProgressBar = ({ completedCount, totalCount }) => {
  const percent = (completedCount / totalCount) * 100;

  return (
    <div className="w-full sm:w-[300px] space-y-1">
      <div className="flex justify-between text-xs font-medium text-gray-600">
        <span></span>
        <span>
          {completedCount} of {totalCount} done
        </span>
      </div>
      <div className="relative h-3 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-blue-700 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
