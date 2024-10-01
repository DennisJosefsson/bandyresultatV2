import axios from 'axios'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'
import { paginatedSeasons, season } from '../types/season/seasons'

import { z } from 'zod'
import { newSeasonReturn } from '../types/season/newSeason'
import { singleSeason } from '../types/season/singleSeason'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const seasonsApi = axios.create({
  baseURL: `${backendUrl}/api/seasons`,
  headers: header,
})

export const getSeasons = async (): Promise<z.infer<typeof season>[]> => {
  const response = await seasonsApi.get('/')
  return response.data
}

export const getPaginatedSeasons = async ({
  page,
}: {
  page: number
}): Promise<z.infer<typeof paginatedSeasons>> => {
  const response = await seasonsApi.get(`/paginated?page=${page}`)
  return response.data
}

export const getSingleSeason = async (
  seasonId: number
): Promise<z.infer<typeof singleSeason>[]> => {
  const response = await seasonsApi.get(`/${seasonId}`, {
    validateStatus: (status) => {
      return status < 500
    },
  })
  return response.data
}

export const postSeason = async ({
  yearString,
}: {
  yearString: string
}): Promise<z.infer<typeof newSeasonReturn>> => {
  const response = await seasonsApi.post('/', { yearString })
  return response.data
}

export default seasonsApi
