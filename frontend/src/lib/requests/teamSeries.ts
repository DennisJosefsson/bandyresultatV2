import axios from 'axios'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'

import { z } from 'zod'
import { newTeamSeries } from '../types/series/teamSeries'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const teamseriesApi = axios.create({
  baseURL: `${backendUrl}/api/teamseries`,
  headers: header,
})

export const postTeamSerie = async (
  teamSerie: z.infer<typeof newTeamSeries>
) => {
  const response = await teamseriesApi.post('/', teamSerie)
  return response.data
}
