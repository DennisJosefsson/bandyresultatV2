import axios from 'axios'
import { z } from 'zod'
import {
  baseUrl,
  header,
  mobileBaseUrl,
} from '../config/requestConfig'
import { county } from '../types/county/county'

const backendUrl =
  import.meta.env.MODE === 'mobile'
    ? mobileBaseUrl
    : baseUrl

const countyApi = axios.create({
  baseURL: `${backendUrl}/api/county`,
  headers: header,
  withCredentials: true,
})

export const getCounties = async (): Promise<
  z.infer<typeof county>[]
> => {
  const response = await countyApi.get('/')
  return response.data
}
