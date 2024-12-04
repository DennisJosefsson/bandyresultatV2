import axios from 'axios'
import { z } from 'zod'
import {
  baseUrl,
  header,
  mobileBaseUrl,
} from '../config/requestConfig'
import {
  bandyErrorResponse,
  newBandyError,
} from '../types/error/error'

const backendUrl =
  import.meta.env.MODE === 'mobile'
    ? mobileBaseUrl
    : baseUrl

const errorApi = axios.create({
  baseURL: `${backendUrl}/api/errors`,
  headers: header,
  withCredentials: true,
})

export const getErrors = async (): Promise<
  z.infer<typeof bandyErrorResponse>
> => {
  const response = await errorApi.get('/')
  return response.data
}

export const postError = async (
  errorData: z.infer<typeof newBandyError>
) => {
  const response = await errorApi.post('/', errorData)
  return response.data
}

export default errorApi
