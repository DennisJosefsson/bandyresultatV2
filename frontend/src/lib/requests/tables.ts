import axios from 'axios'
import { z } from 'zod'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'
import {
  maratonTable,
  singleSeasonPlayoff,
  singleSeasonTable,
} from '../types/tables/tables'
import { compareResponseObject } from '../types/teams/compare'
import { compareFormState } from '../types/teams/teams'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const tablesApi = axios.create({
  baseURL: `${backendUrl}/api/tables`,
  headers: header,
})

type MaratonQueryType = 'all' | 'home' | 'away'

export const maratonTabell = async (
  query: MaratonQueryType
): Promise<z.infer<typeof maratonTable>[]> => {
  const response = await tablesApi.get(`/maraton?table=${query}`)
  return response.data
}

export const compareTeams = async (
  compObject: z.infer<typeof compareFormState>
): Promise<
  z.infer<typeof compareResponseObject> | { status: number; error: string }
> => {
  if (compObject === null || compObject === undefined) {
    throw new Error('nullObject')
  }
  const response = await tablesApi.post('/compare', compObject, {
    validateStatus: (status) => {
      return status < 500
    },
  })

  if (response.status === 404) {
    return { status: 404, error: response.data.errors }
  }

  return response.data
}

export const getSingleSeasonTable = async ({
  seasonId,
  table,
  women,
}: {
  seasonId: number
  table: string
  women: boolean
}): Promise<z.infer<typeof singleSeasonTable>> => {
  const response = await tablesApi.get(
    `/league/${seasonId}?table=${table}&women=${women}`
  )
  return response.data
}

export const getSingleSeasonPlayoff = async ({
  seasonId,
  women,
}: {
  seasonId: number
  women: boolean
}): Promise<z.infer<typeof singleSeasonPlayoff>> => {
  const response = await tablesApi.get(`/playoff/${seasonId}?women=${women}`)
  return response.data
}

export const deleteTable = async ({ tableId }: { tableId: number }) => {
  return await tablesApi.delete(`/${tableId}`)
}

export default tablesApi
