import axios, { AxiosError } from 'axios'
import { z } from 'zod'
import {
  baseUrl,
  header,
  mobileBaseUrl,
} from '../config/requestConfig'
import {
  developmentData,
  subDevelopmentData,
} from '../types/games/development'
import { seasonGames } from '../types/games/gameObject'
import { bulkGame, game } from '../types/games/games'
import {
  editGame as editGameType,
  newGame,
} from '../types/games/newGame'
import {
  searchParams,
  searchResponse,
} from '../types/games/search'
import { statsObject } from '../types/games/stats'
import {
  streakParams,
  streakReturn,
} from '../types/games/streaks'

const backendUrl =
  import.meta.env.MODE === 'mobile'
    ? mobileBaseUrl
    : baseUrl

const gamesApi = axios.create({
  baseURL: `${backendUrl}/api/games`,
  headers: header,
  withCredentials: true,
})

export const getStreaks = async (
  params: z.infer<typeof streakParams>
): Promise<z.infer<typeof streakReturn>> => {
  const response = await gamesApi.get(
    `/streaks?record=${params.record}&women=${params.women}`
  )

  return response.data
}

export const getSearch = async (
  formState: z.infer<typeof searchParams>
): Promise<z.infer<typeof searchResponse>> => {
  const response = await gamesApi.post('/search', formState)

  return response.data
}

export const getSeasonGames = async ({
  seasonId,
  women,
}: {
  seasonId: number
  women: boolean
}): Promise<z.infer<typeof seasonGames>> => {
  const response = await gamesApi.get(
    `/season/${seasonId}?women=${women}`
  )

  return response.data
}

export const getSeasonSubGames = async ({
  seasonId,
  women,
  group,
}: {
  seasonId: number
  women: boolean
  group: string
}): Promise<z.infer<typeof seasonGames>> => {
  const response = await gamesApi.get(
    `/subseason/${seasonId}/${group}?women=${women}`
  )

  return response.data
}

export const getSeasonStats = async ({
  seasonId,
  women,
}: {
  seasonId: number
  women: boolean
}): Promise<z.infer<typeof statsObject>> => {
  const response = await gamesApi.get(
    `/stats/${seasonId}?women=${women}`
  )

  return response.data
}

export const getSubAnimation = async ({
  seasonId,
  women,
  group,
}: {
  seasonId: number
  women: boolean
  group: string
}): Promise<z.infer<typeof subDevelopmentData>> => {
  const response = await gamesApi.get(
    `/subanimation/${seasonId}/${group}?women=${women}`,
    {
      validateStatus: (status) => {
        return status < 500
      },
    }
  )

  return response.data
}

export const getAnimation = async ({
  seasonId,
  women,
}: {
  seasonId: number
  women: boolean
}): Promise<z.infer<typeof developmentData>> => {
  const response = await gamesApi.get(
    `/animation/${seasonId}?women=${women}`
  )

  return response.data
}

export const getSingleGame = async ({
  gameId,
}: {
  gameId: number
}): Promise<z.infer<typeof game>> => {
  const response = await gamesApi.get(`/${gameId}`)
  return response.data
}

export const addGame = async ({
  formState,
}: {
  formState: z.infer<typeof newGame>
}) => {
  const response = await gamesApi.post('/', formState)
  if (response instanceof AxiosError) {
    return response
  }
  return response.data
}

export const editGame = async ({
  formState,
}: {
  formState: z.infer<typeof editGameType>
}) => {
  const response = await gamesApi.post('/', formState)
  if (response instanceof AxiosError) {
    return response
  }
  return response.data
}

export const postBulkGames = async (
  games: z.infer<typeof bulkGame>['games']
) => {
  const promise = Promise.all(
    games.map((game) => gamesApi.post('/', game))
  )

  return promise
}

export const deleteGame = async (gameId: number) => {
  return await gamesApi.delete(`/${gameId}`)
}

export default gamesApi
