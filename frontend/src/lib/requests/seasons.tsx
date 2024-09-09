import axios from 'axios'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'
import { PostNewSeasonType, SeasonObjectType } from '../types/season/seasons'

import { SerieAttributes } from '../types/series/series'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const seasonsApi = axios.create({
  baseURL: `${backendUrl}/api/seasons`,
  headers: header,
})

export const getSeasons = async (): Promise<SeasonObjectType[]> => {
  const response = await seasonsApi.get('/')
  return response.data
}

type PaginatedSeason = {
  rows: SeasonObjectType[]
  count: number
}

export const getPaginatedSeasons = async ({
  page,
}: {
  page: number
}): Promise<PaginatedSeason> => {
  const response = await seasonsApi.get(`/paginated?page=${page}`)
  return response.data
}

export const getSingleSeason = async (
  seasonId: number
): Promise<SeasonObjectType[]> => {
  const response = await seasonsApi.get(`/${seasonId}`, {
    validateStatus: (status) => {
      return status < 500
    },
  })
  return response.data
}

type PostNewSeasonReturnType = {
  womenSeason: PostNewSeasonType
  menSeason: PostNewSeasonType
  newSeries: SerieAttributes[]
}

export const postSeason = async ({
  yearString,
}: {
  yearString: string
}): Promise<PostNewSeasonReturnType> => {
  const response = await seasonsApi.post('/', { yearString })
  return response.data
}

export default seasonsApi
