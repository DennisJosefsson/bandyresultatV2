import axios from 'axios'
import { baseUrl, header, mobileBaseUrl } from '../config/requestConfig'

const backendUrl = import.meta.env.MODE === 'mobile' ? mobileBaseUrl : baseUrl

const countyApi = axios.create({
  baseURL: `${backendUrl}/api/county`,
  headers: header,
})

type County = {
  countyId: number
  name: string
}

export const getCounties = async (): Promise<County[]> => {
  const response = await countyApi.get('/')
  return response.data
}
