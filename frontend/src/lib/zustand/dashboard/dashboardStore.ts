import { MetadataType } from '@/lib/types/metadata/metadata'
import { SerieAttributes } from '@/lib/types/series/series'
import { TeamAndSeasonAttributes } from '@/lib/types/teams/teams'
import { create } from 'zustand'

type Dashboard = {
  year: string
  women: boolean
  teamSeasonData: TeamAndSeasonAttributes[] | undefined
  seriesData: SerieAttributes | undefined
  seriesArray: SerieAttributes[] | undefined
  metadataData: MetadataType | undefined
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
    seriesArray: undefined,
    metadataData: undefined,
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
      seriesArray: undefined,
      metadataData: undefined,
    },
  })
