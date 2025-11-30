import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", tokens: 8234 },
  { day: "Tue", tokens: 10456 },
  { day: "Wed", tokens: 9876 },
  { day: "Thu", tokens: 11234 },
  { day: "Fri", tokens: 12890 },
  { day: "Sat", tokens: 7654 },
  { day: "Sun", tokens: 6432 },
];

export function AdminTokenUsageChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip formatter={(value) => `${value.toLocaleString()} tokens`} />
        <Bar dataKey="tokens" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  );
}
