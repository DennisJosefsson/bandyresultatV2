import axios from 'axios'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'
import { NewTeamType, SingleTeam, TeamAttributes } from '../types/teams/teams'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const teamsApi = axios.create({
  baseURL: `${backendUrl}/api/teams`,
  headers: header,
})

export const getTeams = async (): Promise<TeamAttributes[]> => {
  const response = await teamsApi.get('/')
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

export const postTeam = async ({ formState }: { formState: NewTeamType }) => {
  return await teamsApi.post('/', formState)
}

// export const updateTeam = async (team) => {
//   return await teamsApi.put(`/${team.teamId}`, team)
// }

// export const deleteTeam = async ({ teamId }: { teamId: number }) => {
//   return await teamsApi.delete(`/${teamId}`)
// }

export default teamsApi
