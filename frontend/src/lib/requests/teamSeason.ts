import axios from 'axios'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'

import { DashBoardTeamSeason, TeamSeasonAttributes } from '../types/teams/teams'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const teamseasonsApi = axios.create({
  baseURL: `${backendUrl}/api/teamSeasons`,
  headers: header,
})

export const getSingleSeasonTeamSeasons = async ({
  seasonId,
}: {
  seasonId: number
}): Promise<DashBoardTeamSeason[]> => {
  const response = await teamseasonsApi.get(`/dashboard/${seasonId}`)

  return response.data
}

export const postTeamSeason = async ({
  teamSeasons,
}: {
  teamSeasons: TeamSeasonAttributes[]
}) => {
  const promise = await Promise.all(
    teamSeasons.map((teamSeason) => teamseasonsApi.post('/', teamSeason))
  )
  return promise
}

type DeleteReturnType = {
  status: number | undefined
  message: string
}

export const deleteTeamSeason = async ({
  teamSeasonId,
}: {
  teamSeasonId: number
}): Promise<DeleteReturnType> => {
  const response = await teamseasonsApi.delete(`/${teamSeasonId}`)
  return response.data
}
