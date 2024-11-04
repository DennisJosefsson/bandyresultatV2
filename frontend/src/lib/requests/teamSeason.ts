import axios from 'axios'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'

import { z } from 'zod'
import { dashboardTeamSeason } from '../types/dashboard/dashboardTeamseason'
import { teamSeason } from '../types/teamSeason/teamSeason'
import { singleTeamSeasons } from '../types/teams/singleTeam'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const teamseasonsApi = axios.create({
  baseURL: `${backendUrl}/api/teamSeasons`,
  headers: header,
})

export const getSingleTeamseason = async ({
  teamseasonId,
}: {
  teamseasonId: number
}): Promise<z.infer<typeof dashboardTeamSeason>> => {
  const response = await teamseasonsApi.get(`/single/${teamseasonId}`)
  return response.data
}

export const getSingleTeamTeamSeasons = async ({
  teamId,
}: {
  teamId: number
}): Promise<z.infer<typeof singleTeamSeasons>> => {
  const response = await teamseasonsApi.get(`/team/${teamId}`)

  return response.data
}

export const getSingleSeasonTeamSeasons = async ({
  seasonId,
}: {
  seasonId: number
}): Promise<z.infer<typeof dashboardTeamSeason>[]> => {
  const response = await teamseasonsApi.get(`/dashboard/${seasonId}`)

  return response.data
}

export const postTeamSeason = async ({
  formState,
}: {
  formState: z.infer<typeof teamSeason>
}) => {
  const response = await teamseasonsApi.post('/', formState)

  return response.data
}

export const deleteTeamSeason = async ({
  teamSeasonId,
}: {
  teamSeasonId: number
}) => {
  const response = await teamseasonsApi.delete(`/${teamSeasonId}`)
  return response.data
}
