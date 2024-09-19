import axios from 'axios'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const municipalityApi = axios.create({
  baseURL: `${backendUrl}/api/municipality`,
  headers: header,
})

type Municipality = {
  municipalityId: number
  name: string
  countyId: number
}

export const getMunicipalities = async ({
  countyId,
}: {
  countyId: number | null
}): Promise<Municipality[]> => {
  const response = await municipalityApi.get(`/${countyId}`)
  return response.data
}
