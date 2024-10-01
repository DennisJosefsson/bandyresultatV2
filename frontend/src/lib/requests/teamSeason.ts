import axios from 'axios'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'

import { z } from 'zod'
import { dashboardTeamSeason } from '../types/dashboard/dashboardTeamseason'
import { teamSeason } from '../types/teamSeason/teamSeason'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const teamseasonsApi = axios.create({
  baseURL: `${backendUrl}/api/teamSeasons`,
  headers: header,
})

export const getSingleSeasonTeamSeasons = async ({
  seasonId,
}: {
  seasonId: number
}): Promise<z.infer<typeof dashboardTeamSeason>[]> => {
  const response = await teamseasonsApi.get(`/dashboard/${seasonId}`)

  return response.data
}

export const postTeamSeason = async ({
  teamSeasons,
}: {
  teamSeasons: z.infer<typeof teamSeason>[]
}) => {
  const promise = await Promise.all(
    teamSeasons.map((teamSeason) => teamseasonsApi.post('/', teamSeason))
  )
  return promise
}

export const deleteTeamSeason = async ({
  teamSeasonId,
}: {
  teamSeasonId: number
}) => {
  const response = await teamseasonsApi.delete(`/${teamSeasonId}`)
  return response.data
}
