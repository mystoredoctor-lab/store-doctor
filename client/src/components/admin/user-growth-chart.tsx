import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "May", users: 400 },
  { month: "Jun", users: 580 },
  { month: "Jul", users: 720 },
  { month: "Aug", users: 950 },
  { month: "Sep", users: 1420 },
  { month: "Oct", users: 1890 },
];

export function AdminUserGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
