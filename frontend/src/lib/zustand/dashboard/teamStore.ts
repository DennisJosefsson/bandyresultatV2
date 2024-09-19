import { TeamAttributes } from '@/lib/types/teams/teams'
import { create } from 'zustand'

type Team = Omit<TeamAttributes, 'seasonteam'>

export type TeamStore = {
  team: Team | null
}

export const useTeamStore = create<TeamStore>()(() => ({
  team: null,
}))

export const setTeam = (team: Team) => useTeamStore.setState({ team })
export const getTeam = () => useTeamStore.getState()
export const resetTeam = () => useTeamStore.setState({ team: null })
