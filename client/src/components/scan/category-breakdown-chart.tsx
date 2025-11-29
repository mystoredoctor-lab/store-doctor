import { categoryBreakdownData } from "@/lib/data";

export function CategoryBreakdownChart() {
  const total = categoryBreakdownData.reduce((acc, d) => acc + d.value, 0);
  
  let cumulativePercent = 0;

  return (
    <div className="h-[200px] w-full flex items-center justify-center" data-testid="category-breakdown-chart">
      <div className="relative w-36 h-36">
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          {categoryBreakdownData.map((data) => {
            const percent = (data.value / total) * 100;
            const dashArray = `${percent} ${100 - percent}`;
            const dashOffset = -cumulativePercent;
            cumulativePercent += percent;
            
            return (
              <circle
                key={data.name}
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={data.color}
                strokeWidth="12"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{total}</span>
        </div>
      </div>
      <div className="ml-4 space-y-1">
        {categoryBreakdownData.map((data) => (
          <div key={data.name} className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
            <span className="text-muted-foreground">{data.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
