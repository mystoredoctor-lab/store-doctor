import type React from "react"
import { cn } from "@/lib/utils"
import { Search, Zap, Layout, TrendingUp, Shield, Smartphone } from "lucide-react"

interface Category {
  name: string
  score: number
  icon: string
  color: string
}

interface CategoryScoreGridProps {
  categories: Category[]
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  search: Search,
  zap: Zap,
  layout: Layout,
  "trending-up": TrendingUp,
  shield: Shield,
  smartphone: Smartphone,
}

export function CategoryScoreGrid({ categories }: CategoryScoreGridProps) {
  const getScoreClass = (score: number) => {
    if (score >= 80) return "text-green-500 bg-green-500/10"
    if (score >= 60) return "text-yellow-500 bg-yellow-500/10"
    return "text-red-500 bg-red-500/10"
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {categories.map((category) => {
        const Icon = iconMap[category.icon] || Search
        return (
          <div
            key={category.name}
            className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className={cn("p-2 rounded-lg", getScoreClass(category.score))}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{category.name}</p>
              <p className={cn("text-2xl font-bold", getScoreClass(category.score).split(" ")[0])}>{category.score}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
