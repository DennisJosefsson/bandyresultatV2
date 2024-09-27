import axios from 'axios'
import { z } from 'zod'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'
import { municipality } from '../types/municipality/municipality'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const municipalityApi = axios.create({
  baseURL: `${backendUrl}/api/municipality`,
  headers: header,
})

export const getMunicipalities = async ({
  countyId,
}: {
  countyId: number | null
}): Promise<z.infer<typeof municipality>[]> => {
  const response = await municipalityApi.get(`/${countyId}`)
  return response.data
}
