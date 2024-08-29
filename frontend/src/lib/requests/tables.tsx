import axios from 'axios'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'
import {
  MaratonTabell,
  SingleSeasonPlayoffType,
  SingleSeasonTableType,
} from '../types/tables/tables'
import {
  CompareResponseObjectType,
  compareResponseObject,
} from '../types/teams/compare'
import { CompareFormState } from '../types/teams/teams'
import { compareAllTeamData, compareSortFunction } from '../utils/sortFunction'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const tablesApi = axios.create({
  baseURL: `${backendUrl}/api/tables`,
  headers: header,
})

type MaratonQueryType = 'all' | 'home' | 'away'

export const maratonTabell = async (
  query: MaratonQueryType
): Promise<MaratonTabell[]> => {
  const response = await tablesApi.get(`/maraton?table=${query}`)
  return response.data
}

const getTime = (date?: Date): number => {
  return date != null ? date.getTime() : 0
}

export const compareTeams = async (
  compObject: CompareFormState
): Promise<CompareResponseObjectType> => {
  if (compObject === null || compObject === undefined) {
    throw new Error('nullObject')
  }
  const response = await tablesApi.post('/compare', compObject)

  const parsedResponseObject = compareResponseObject.safeParse(response.data)
  if (!parsedResponseObject.success) {
    throw new Error(parsedResponseObject.error.message)
  }
  const categoryData = compareSortFunction(parsedResponseObject.data.tabeller)
  const allData = parsedResponseObject.data.compareAllGames
  const sortedData = compareAllTeamData(
    parsedResponseObject.data.compareAllGames
  )
  const firstGames = parsedResponseObject.data.firstAndLatestGames.filter(
    (game) => game.ranked_first_games === '1'
  )

  const latestGames =
    compObject.teamArray && compObject.teamArray.length === 2
      ? parsedResponseObject.data.firstAndLatestGames
          .filter((game) => game.ranked_first_games !== '1')
          .sort(
            (a, b) => getTime(new Date(b.date)) - getTime(new Date(a.date))
          ) || []
      : parsedResponseObject.data.firstAndLatestGames
          .filter((game) => game.ranked_last_games === '1')
          .sort(
            (a, b) => getTime(new Date(b.date)) - getTime(new Date(a.date))
          ) || []

  return {
    seasonNames: parsedResponseObject.data.seasonNames,
    compareAllGames: parsedResponseObject.data.compareAllGames,
    golds: parsedResponseObject.data.golds,
    playoffs: parsedResponseObject.data.playoffs,
    allPlayoffs: parsedResponseObject.data.allPlayoffs,
    seasons: parsedResponseObject.data.seasons,
    allSeasons: parsedResponseObject.data.allSeasons,
    allData,
    sortedData,
    categoryData,
    firstGames,
    latestGames,
    compareHeaderText: parsedResponseObject.data.compareHeaderText,
  }
}

export const getSingleSeasonTable = async ({
  seasonId,
  table,
  women,
}: {
  seasonId: string
  table: string
  women: boolean
}): Promise<SingleSeasonTableType> => {
  const response = await tablesApi.get(
    `/league/${seasonId}?table=${table}&women=${women}`
  )
  return response.data
}

export const getSingleSeasonPlayoff = async ({
  seasonId,
  women,
}: {
  seasonId: string
  women: boolean
}): Promise<SingleSeasonPlayoffType> => {
  const response = await tablesApi.get(`/playoff/${seasonId}?women=${women}`)
  return response.data
}

// export const postTable = async (table) => {
//   return await tablesApi.post('/', table)
// }

// export const updateTable = async (table) => {
//   return await tablesApi.put(`/${table.id}`, table)
// }

export const deleteTable = async ({ tableId }: { tableId: number }) => {
  return await tablesApi.delete(`/${tableId}`)
}

export default tablesApi
