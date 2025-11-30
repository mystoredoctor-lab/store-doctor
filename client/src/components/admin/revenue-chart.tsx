import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "May", revenue: 2400 },
  { month: "Jun", revenue: 2900 },
  { month: "Jul", revenue: 3200 },
  { month: "Aug", revenue: 4000 },
  { month: "Sep", revenue: 5200 },
  { month: "Oct", revenue: 6800 },
];

export function AdminRevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => `$${value}`} />
        <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: "#8b5cf6", r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
