import axios, { AxiosError } from 'axios'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'
import { Game } from '../types/games/addGames'
import { AnimationObject } from '../types/games/animation'
import { InputGameObjectType, SeasonGames } from '../types/games/games'
import { SearchParamsObject, SearchResponseObject } from '../types/games/search'
import { SeasonStatsObjectType } from '../types/games/stats'
import { StreakObjectTypes, StreakParams } from '../types/games/streaks'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const gamesApi = axios.create({
  baseURL: `${backendUrl}/api/games`,
  headers: header,
})

export const getGames = async () => {
  const response = await gamesApi.get('/')

  if (response instanceof AxiosError) {
    return response
  }
  return response.data
}

export const getStreaks = async (
  params: StreakParams
): Promise<StreakObjectTypes> => {
  const response = await gamesApi.post('/streaks', params)

  return response.data
}

export const getSearch = async (
  searchParams: SearchParamsObject | null
): Promise<SearchResponseObject> => {
  const response = await gamesApi.post('/search', searchParams)

  return response.data
}

export const getSeasonGames = async ({
  seasonId,
  women,
}: {
  seasonId: string
  women: boolean
}): Promise<SeasonGames> => {
  const response = await gamesApi.get(`/season/${seasonId}?women=${women}`)

  return response.data
}

export const getSeasonStats = async ({
  seasonId,
  women,
}: {
  seasonId: string
  women: boolean
}): Promise<SeasonStatsObjectType> => {
  const response = await gamesApi.get(`/stats/${seasonId}?women=${women}`)

  return response.data
}

export const getAnimation = async ({
  seasonId,
  women,
}: {
  seasonId: string
  women: boolean
}): Promise<AnimationObject> => {
  const response = await gamesApi.get(`/animation/${seasonId}?women=${women}`)

  return response.data
}

export const getSingleGame = async ({ gameId }: { gameId: number }) => {
  const response = await gamesApi.get(`/${gameId}`)
  return response.data
}

export const postGame = async (newGameData: InputGameObjectType | null) => {
  const response = await gamesApi.post('/', newGameData)
  if (response instanceof AxiosError) {
    return response
  }
  return response.data
}

export const postBulkGames = async (games: Game[]) => {
  const promise = Promise.all(games.map((game) => gamesApi.post('/', game)))

  return promise
}

export const deleteGame = async (gameId: number) => {
  return await gamesApi.delete(`/${gameId}`)
}

export default gamesApi
