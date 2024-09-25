import axios from 'axios'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'
import { DashboardSingleSeason } from '../types/dashboard/dashboard'
import { GameObjectType } from '../types/games/games'
import { SerieAttributes } from '../types/series/series'
import { TeamAndSeasonAttributes } from '../types/teams/teams'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const dashboardApi = axios.create({
  baseURL: `${backendUrl}/api/dashboard`,
  headers: header,
})

export const getGamesBySerieId = async ({
  serieId,
}: {
  serieId: number
}): Promise<GameObjectType[]> => {
  const response = await dashboardApi.get(`/games?serieId=${serieId}`)

  return response.data
}

export type GameFormData = {
  teams: TeamAndSeasonAttributes[]
  series: SerieAttributes[]
}

export const getGameFormData = async ({
  seasonId,
}: {
  seasonId: number
}): Promise<GameFormData> => {
  const response = await dashboardApi.get(`/gameform/${seasonId}`)

  return response.data
}

export type DashBoardData =
  | {
      women: false
      count: number
    }
  | { women: true; count: number }
  | { women: null; count: number }

type DashboardDataObjects = {
  gameCount: DashBoardData[]
  seasonCount: DashBoardData[]
  teamCount: DashBoardData[]
  goalCount: DashBoardData[]
}

export const getDashBoardData = async (): Promise<DashboardDataObjects> => {
  const response = await dashboardApi.get('/data')

  return response.data
}

export const getDashBoardSingleSeason = async ({
  seasonId,
}: {
  seasonId: number
}): Promise<DashboardSingleSeason> => {
  const response = await dashboardApi.get(`/season/${seasonId}`)
  return response.data
}
