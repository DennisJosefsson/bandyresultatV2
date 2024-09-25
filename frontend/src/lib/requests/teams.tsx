import axios from 'axios'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'
import {
  NewTeamType,
  SingleTeam,
  Team,
  TeamAttributes,
} from '../types/teams/teams'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const teamsApi = axios.create({
  baseURL: `${backendUrl}/api/teams`,
  headers: header,
})

export const getTeams = async (): Promise<TeamAttributes[]> => {
  const response = await teamsApi.get('/')
  return response.data
}

type MapTeams = {
  county: string
  teams: TeamAttributes[]
}

export const getMapTeams = async (women: boolean): Promise<MapTeams[]> => {
  const response = await teamsApi.get(`/map?women=${women}`)

  return response.data
}

export const getSingleTeam = async (teamId: string): Promise<SingleTeam> => {
  const response = await teamsApi.get(`/${teamId}`, {
    validateStatus: (status) => {
      return status < 500
    },
  })

  return response.data
}

export const getSingleTeamForEdit = async (teamId: number): Promise<Team> => {
  const response = await teamsApi.get(`/${teamId}/edit`, {
    validateStatus: (status) => {
      return status < 500
    },
  })

  return response.data
}

export const editTeam = async ({ formState }: { formState: Team }) => {
  return await teamsApi.post('/', formState)
}

export const addTeam = async ({ formState }: { formState: NewTeamType }) => {
  return await teamsApi.post('/', formState)
}

export const deleteTeam = async ({ teamId }: { teamId: number }) => {
  const response = await teamsApi.delete(`/${teamId}`)
  return response.data
}

export default teamsApi
