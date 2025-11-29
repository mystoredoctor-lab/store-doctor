import { scanHistoryData } from "@/lib/data";

export function ScanHistoryChart() {
  const maxScore = Math.max(...scanHistoryData.map(d => d.score));
  
  return (
    <div className="h-[200px] w-full flex flex-col" data-testid="scan-history-chart">
      <div className="flex-1 flex items-end gap-2 relative">
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground pr-2">
          <span>100</span>
          <span>50</span>
          <span>0</span>
        </div>
        <div className="flex-1 flex items-end gap-2 pl-8">
          {scanHistoryData.map((data, index) => (
            <div key={data.date} className="flex-1 flex flex-col items-center gap-1">
              <div 
                className="w-full bg-primary/80 rounded-t transition-all duration-500"
                style={{ 
                  height: `${(data.score / 100) * 160}px`,
                  animationDelay: `${index * 100}ms`
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-2 pl-8">
        {scanHistoryData.map((data) => (
          <div key={data.date} className="flex-1 text-center text-xs text-muted-foreground">
            {data.date}
          </div>
        ))}
      </div>
    </div>
  );
}
