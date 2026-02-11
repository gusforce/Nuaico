import {
  TrendingUp,
  Activity,
  Zap,
  Factory,
  Cpu,
  Landmark,
  Search,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Clock,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Info,
} from 'lucide-react'
import type { Sector } from './types'

export const SectorIcons: Record<Sector, typeof TrendingUp> = {
  Finance: TrendingUp,
  Healthcare: Activity,
  Technology: Cpu,
  Energy: Zap,
  Government: Landmark,
  Industry: Factory,
}

export const Icons = {
  ...SectorIcons,
  Search,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Clock,
  Chart: BarChart3,
  Check: CheckCircle,
  Alert: AlertTriangle,
  Info,
  Activity,
  Zap,
  TrendingUp,
}
