import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { competitionBenchmark } from "@/lib/data";

const categoryChartData = [
  {
    category: "SEO",
    "Your Store": competitionBenchmark.yourStore.seo,
    "Industry Avg": competitionBenchmark.industry.seo,
    "Top Performer": competitionBenchmark.topPerformer.seo,
  },
  {
    category: "Speed",
    "Your Store": competitionBenchmark.yourStore.speed,
    "Industry Avg": competitionBenchmark.industry.speed,
    "Top Performer": competitionBenchmark.topPerformer.speed,
  },
  {
    category: "UX",
    "Your Store": competitionBenchmark.yourStore.ux,
    "Industry Avg": competitionBenchmark.industry.ux,
    "Top Performer": competitionBenchmark.topPerformer.ux,
  },
  {
    category: "CRO",
    "Your Store": competitionBenchmark.yourStore.cro,
    "Industry Avg": competitionBenchmark.industry.cro,
    "Top Performer": competitionBenchmark.topPerformer.cro,
  },
  {
    category: "Security",
    "Your Store": competitionBenchmark.yourStore.security,
    "Industry Avg": competitionBenchmark.industry.security,
    "Top Performer": competitionBenchmark.topPerformer.security,
  },
  {
    category: "Mobile",
    "Your Store": competitionBenchmark.yourStore.mobile,
    "Industry Avg": competitionBenchmark.industry.mobile,
    "Top Performer": competitionBenchmark.topPerformer.mobile,
  },
];

const radarData = categoryChartData.map(item => ({
  name: item.category,
  "Your Store": item["Your Store"],
  "Industry Avg": item["Industry Avg"],
  "Top Performer": item["Top Performer"],
}));

const overallData = [
  {
    name: competitionBenchmark.yourStore.name,
    score: competitionBenchmark.yourStore.overallScore,
    fill: "hsl(var(--primary))",
  },
  {
    name: competitionBenchmark.industry.name,
    score: competitionBenchmark.industry.overallScore,
    fill: "hsl(45 96% 56%)",
  },
  {
    name: competitionBenchmark.topPerformer.name,
    score: competitionBenchmark.topPerformer.overallScore,
    fill: "hsl(120 73% 75%)",
  },
];

export function CompetitionBenchmarkChart() {
  const yourScore = competitionBenchmark.yourStore.overallScore;
  const industryScore = competitionBenchmark.industry.overallScore;
  const topScore = competitionBenchmark.topPerformer.overallScore;
  const scoreDiff = yourScore - industryScore;
  const gapToTop = topScore - yourScore;

  return (
    <div className="space-y-6">
      {/* Overall Score Comparison Card */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Your Store</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{yourScore}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {scoreDiff > 0 ? '+' : ''}{scoreDiff} vs industry
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Industry Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">{industryScore}</div>
            <p className="text-xs text-muted-foreground mt-1">Benchmark</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-500">{topScore}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {gapToTop > 0 ? '+' : ''}{gapToTop} gap
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Category Performance Comparison</CardTitle>
          <CardDescription>How each category stacks up against benchmarks</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
              <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                cursor={{ fill: "hsl(var(--muted) / 0.1)" }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: "20px" }}
                iconType="square"
              />
              <Bar dataKey="Your Store" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Industry Avg" fill="hsl(45 96% 56%)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Top Performer" fill="hsl(120 73% 75%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Radar</CardTitle>
          <CardDescription>Multi-dimensional performance analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="name" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
              <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} angle={90} domain={[0, 100]} />
              <Radar name="Your Store" dataKey="Your Store" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.25} />
              <Radar name="Industry Avg" dataKey="Industry Avg" stroke="hsl(45 96% 56%)" fill="hsl(45 96% 56%)" fillOpacity={0.15} />
              <Radar name="Top Performer" dataKey="Top Performer" stroke="hsl(120 73% 75%)" fill="hsl(120 73% 75%)" fillOpacity={0.15} />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="bg-primary/5 border-primary/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">Performance Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <p className="text-sm font-medium">
              {yourScore > industryScore ? "✓ Above Industry Average" : "• Below Industry Average"}
            </p>
            <p className="text-sm text-muted-foreground">
              Your overall score is {scoreDiff > 0 ? `+${scoreDiff}` : scoreDiff} compared to the industry average of {industryScore}.
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">
              Top Opportunity: {
                ["seo", "speed", "ux", "cro", "security", "mobile"].reduce((prev, curr) => {
                  const prevGap = competitionBenchmark.topPerformer[prev as keyof typeof competitionBenchmark.topPerformer] as number - 
                                 (competitionBenchmark.yourStore[prev as keyof typeof competitionBenchmark.yourStore] as number);
                  const currGap = competitionBenchmark.topPerformer[curr as keyof typeof competitionBenchmark.topPerformer] as number - 
                                 (competitionBenchmark.yourStore[curr as keyof typeof competitionBenchmark.yourStore] as number);
                  return currGap > prevGap ? curr : prev;
                }).toUpperCase()
              }
            </p>
            <p className="text-sm text-muted-foreground">
              This category has the largest gap to top performers. Focus here to improve competitiveness.
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
              Advanced Feature
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
