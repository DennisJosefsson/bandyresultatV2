import axios from 'axios'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'
import { NewSerie, SerieAttributes } from '../types/series/series'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const seriesApi = axios.create({
  baseURL: `${backendUrl}/api/series`,
  headers: header,
})

export const getSeasonSeries = async (
  seasonId: number
): Promise<SerieAttributes[]> => {
  const response = await seriesApi.get(`/serie/${seasonId}`)
  return response.data
}

export const getSingleSeries = async ({
  serieId,
}: {
  serieId: number
}): Promise<SerieAttributes> => {
  const response = await seriesApi.get(`/${serieId}`)
  return response.data
}

export const addSerie = async ({ formState }: { formState: NewSerie }) => {
  const response = await seriesApi.post('/', formState)
  return response.data
}

export const editSerie = async ({
  formState,
}: {
  formState: SerieAttributes
}) => {
  const response = await seriesApi.post('/', formState)
  return response.data
}

export const postSerie = async (serieData: SerieAttributes | null) => {
  const response = await seriesApi.post('/', serieData)

  return response.data
}

export default seriesApi
