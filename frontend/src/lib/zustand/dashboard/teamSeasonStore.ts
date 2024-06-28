import { TeamSeasonAttributes } from '@/lib/types/teams/teams'
import { create } from 'zustand'

type DashboardTeamSeason = {
  year: string
  women: boolean
  teamSeasonData: TeamSeasonAttributes[] | undefined
}

type DashboardTeamSeasonStore = {
  dashboardTeamSeason: DashboardTeamSeason
}

export const useDashboardTeamSeasonStore = create<DashboardTeamSeasonStore>()(
  () => ({
    dashboardTeamSeason: { women: false, year: '', teamSeasonData: undefined },
  })
)

export const setDashboardTeamSeason = (
  dashboardTeamSeason: DashboardTeamSeason
) => useDashboardTeamSeasonStore.setState({ dashboardTeamSeason })
export const resetDashboardTeamSeason = () =>
  useDashboardTeamSeasonStore.setState({
    dashboardTeamSeason: { women: false, year: '', teamSeasonData: undefined },
  })
