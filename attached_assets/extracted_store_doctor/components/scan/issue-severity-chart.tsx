"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { issueSeverityData } from "@/lib/mock-data"

export function IssueSeverityChart() {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={issueSeverityData} layout="vertical">
          <XAxis type="number" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            type="category"
            dataKey="severity"
            stroke="#71717a"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={60}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            labelStyle={{ color: "#fafafa" }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {issueSeverityData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
