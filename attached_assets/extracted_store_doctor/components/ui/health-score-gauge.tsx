"use client"

import { cn } from "@/lib/utils"

interface HealthScoreGaugeProps {
  score: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

export function HealthScoreGauge({ score, size = "md", showLabel = true, className }: HealthScoreGaugeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getStrokeColor = (score: number) => {
    if (score >= 80) return "#10b981"
    if (score >= 60) return "#f59e0b"
    return "#ef4444"
  }

  const sizeConfig = {
    sm: { width: 80, strokeWidth: 6, fontSize: "text-lg" },
    md: { width: 140, strokeWidth: 10, fontSize: "text-3xl" },
    lg: { width: 200, strokeWidth: 14, fontSize: "text-5xl" },
  }

  const config = sizeConfig[size]
  const radius = (config.width - config.strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (score / 100) * circumference

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: config.width, height: config.width }}>
        <svg className="transform -rotate-90" width={config.width} height={config.width}>
          {/* Background circle */}
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            fill="none"
            className="text-muted"
          />
          {/* Progress circle */}
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            stroke={getStrokeColor(score)}
            strokeWidth={config.strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn(config.fontSize, "font-bold", getScoreColor(score))}>{score}</span>
        </div>
      </div>
      {showLabel && <span className="text-sm text-muted-foreground">Health Score</span>}
    </div>
  )
}
