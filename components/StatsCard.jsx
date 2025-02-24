import { Suspense } from "react";

const StatsCard = ({
  icon: Icon,
  title,
  count,
  color,
  shadowColor,
  percentage,
  trendIcon: TrendIcon,
}) => {
  return (
    <div className="flex flex-1 gap-4 flex-col w-48 h-40 bg-white rounded-lg shadow-lg py-4">
      <div className="flex gap-4 pr-3">
        <div className="flex gap-6 flex-1">
          <div
            className="w-1 h-10 rounded-full"
            style={{ backgroundColor: color }}
          />
          <Icon
            className="p-2 rounded-full size-10 text-white shadow-lg"
            style={{
              backgroundColor: color,
              boxShadow: `0 8px 12px ${shadowColor}`,
            }}
          />
        </div>
        {TrendIcon && (
          <div
            className="flex items-center gap-2 rounded-full px-[7px] self-start"
            style={{ backgroundColor: `${color}1A` }}
          >
            <TrendIcon className="size-3" style={{ color }} />
            <p className="text-[14px]" style={{ color }}>
              {percentage}%
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col p-4">
        <p className="text-gray-400">{title}</p>
        {/* Show skeleton while count is still loading */}
        {count === null || count === undefined ? (
          "..."
        ) : (
          <p className="font-bold text-[1.15rem]">{count}</p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
