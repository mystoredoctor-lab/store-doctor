import { issueSeverityData } from "@/lib/data";

export function IssueSeverityChart() {
  const maxCount = Math.max(...issueSeverityData.map(d => d.count));

  return (
    <div className="h-[200px] w-full flex flex-col justify-center gap-3" data-testid="issue-severity-chart">
      {issueSeverityData.map((data) => (
        <div key={data.severity} className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-16 text-right">{data.severity}</span>
          <div className="flex-1 h-6 bg-muted rounded-md overflow-hidden">
            <div
              className="h-full rounded-md transition-all duration-500"
              style={{
                width: `${(data.count / maxCount) * 100}%`,
                backgroundColor: data.color,
              }}
            />
          </div>
          <span className="text-xs font-medium w-8">{data.count}</span>
        </div>
      ))}
    </div>
  );
}
