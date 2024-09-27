import axios from 'axios'
import { z } from 'zod'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'
import { newSerie, serie } from '../types/series/series'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const seriesApi = axios.create({
  baseURL: `${backendUrl}/api/series`,
  headers: header,
})

export const getSeasonSeries = async (
  seasonId: number
): Promise<z.infer<typeof serie>[]> => {
  const response = await seriesApi.get(`/serie/${seasonId}`)
  return response.data
}

export const getSingleSeries = async ({
  serieId,
}: {
  serieId: number
}): Promise<z.infer<typeof serie>> => {
  const response = await seriesApi.get(`/${serieId}`)
  return response.data
}

export const addSerie = async ({
  formState,
}: {
  formState: z.infer<typeof newSerie>
}) => {
  const response = await seriesApi.post('/', formState)
  return response.data
}

export const editSerie = async ({
  formState,
}: {
  formState: z.infer<typeof serie>
}) => {
  const response = await seriesApi.post('/', formState)
  return response.data
}

export default seriesApi
