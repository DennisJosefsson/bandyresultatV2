import axios from 'axios'
import { z } from 'zod'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'
import {
  dashboardDataObjects,
  dashboardSingleSeason,
} from '../types/dashboard/dashboard'
import { gameFormData, gameObject } from '../types/games/games'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const dashboardApi = axios.create({
  baseURL: `${backendUrl}/api/dashboard`,
  headers: header,
})

export const getGamesBySerieId = async ({
  serieId,
}: {
  serieId: number
}): Promise<z.infer<typeof gameObject>[]> => {
  const response = await dashboardApi.get(`/games?serieId=${serieId}`)

  return response.data
}

export const getGameFormData = async ({
  seasonId,
}: {
  seasonId: number
}): Promise<z.infer<typeof gameFormData>> => {
  const response = await dashboardApi.get(`/gameform/${seasonId}`)

  return response.data
}

export const getDashBoardData = async (): Promise<
  z.infer<typeof dashboardDataObjects>
> => {
  const response = await dashboardApi.get('/data')

  return response.data
}

export const getDashBoardSingleSeason = async ({
  seasonId,
}: {
  seasonId: number
}): Promise<z.infer<typeof dashboardSingleSeason>> => {
  const response = await dashboardApi.get(`/season/${seasonId}`)
  return response.data
}
