import axios from 'axios'
import { z } from 'zod'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'
import { singleTeam } from '../types/teams/singleTeam'
import { newTeam, team } from '../types/teams/teams'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const teamsApi = axios.create({
  baseURL: `${backendUrl}/api/teams`,
  headers: header,
})

export const getTeams = async (): Promise<z.infer<typeof team>[]> => {
  const response = await teamsApi.get('/')
  return response.data
}

export const getMapTeams = async (
  women: boolean
): Promise<{ county: string; teams: z.infer<typeof team>[] }[]> => {
  const response = await teamsApi.get(`/map?women=${women}`)

  return response.data
}

export const getSingleTeam = async (
  teamId: string
): Promise<z.infer<typeof singleTeam>> => {
  const response = await teamsApi.get(`/${teamId}`, {
    validateStatus: (status) => {
      return status < 500
    },
  })

  return response.data
}

export const getSingleTeamForEdit = async (
  teamId: number
): Promise<z.infer<typeof team>> => {
  const response = await teamsApi.get(`/${teamId}/edit`, {
    validateStatus: (status) => {
      return status < 500
    },
  })

  return response.data
}

export const editTeam = async ({
  formState,
}: {
  formState: z.infer<typeof team>
}) => {
  return await teamsApi.post('/', formState)
}

export const addTeam = async ({
  formState,
}: {
  formState: z.infer<typeof newTeam>
}) => {
  return await teamsApi.post('/', formState)
}

export const deleteTeam = async ({ teamId }: { teamId: number }) => {
  const response = await teamsApi.delete(`/${teamId}`)
  return response.data
}

export default teamsApi
