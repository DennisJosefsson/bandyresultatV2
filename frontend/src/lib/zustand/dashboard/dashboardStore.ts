import { SerieAttributes } from '@/lib/types/series/series'
import { TeamSeasonAttributes } from '@/lib/types/teams/teams'
import { create } from 'zustand'

type Dashboard = {
  year: string
  women: boolean
  teamSeasonData: TeamSeasonAttributes[] | undefined
  seriesData: SerieAttributes | undefined
}

type DashboardStore = {
  dashboard: Dashboard
}

export const useDashboardStore = create<DashboardStore>()(() => ({
  dashboard: {
    women: false,
    year: '',
    teamSeasonData: undefined,
    seriesData: undefined,
  },
}))

export const setDashboard = (dashboard: Dashboard) =>
  useDashboardStore.setState({ dashboard })
export const resetDashboard = () =>
  useDashboardStore.setState({
    dashboard: {
      women: false,
      year: '',
      teamSeasonData: undefined,
      seriesData: undefined,
    },
  })
