import axios from 'axios'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'
import { GameObjectType } from '../types/games/games'
import { SerieAttributes } from '../types/series/series'
import { TeamAndSeasonAttributes } from '../types/teams/teams'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const dashboardGamesApi = axios.create({
  baseURL: `${backendUrl}/api/dashboard`,
  headers: header,
})

export const getGamesBySerieId = async ({
  serieId,
}: {
  serieId: string
}): Promise<GameObjectType[]> => {
  const response = await dashboardGamesApi.get(`/games?serieId=${serieId}`)

  return response.data
}

type GameFormData = {
  teams: TeamAndSeasonAttributes[]
  series: SerieAttributes[]
}

export const getGameFormData = async ({
  seasonId,
}: {
  seasonId: string
}): Promise<GameFormData> => {
  const response = await dashboardGamesApi.get(`/gameform/${seasonId}`)

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
  const response = await dashboardGamesApi.get('/data')

  return response.data
}
