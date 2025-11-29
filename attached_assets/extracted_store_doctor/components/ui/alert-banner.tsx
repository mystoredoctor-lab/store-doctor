import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"

interface AlertBannerProps {
  type: "info" | "success" | "warning" | "error"
  title: string
  message?: string
  className?: string
}

export function AlertBanner({ type, title, message, className }: AlertBannerProps) {
  const config = {
    info: {
      icon: Info,
      className: "bg-blue-500/10 border-blue-500/20 text-blue-500",
    },
    success: {
      icon: CheckCircle,
      className: "bg-green-500/10 border-green-500/20 text-green-500",
    },
    warning: {
      icon: AlertCircle,
      className: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
    },
    error: {
      icon: XCircle,
      className: "bg-red-500/10 border-red-500/20 text-red-500",
    },
  }

  const Icon = config[type].icon

  return (
    <div className={cn("flex items-start gap-3 rounded-lg border p-4", config[type].className, className)}>
      <Icon className="h-5 w-5 shrink-0 mt-0.5" />
      <div>
        <p className="font-medium">{title}</p>
        {message && <p className="text-sm opacity-80 mt-1">{message}</p>}
      </div>
    </div>
  )
}
