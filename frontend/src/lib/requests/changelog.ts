import axios from 'axios'
import { z } from 'zod'
import {
  baseUrl,
  header,
  mobileBaseUrl,
} from '../config/requestConfig'
import { changelog } from '../types/changelog'

const backendUrl =
  import.meta.env.MODE === 'mobile'
    ? mobileBaseUrl
    : baseUrl

const changelogApi = axios.create({
  baseURL: `${backendUrl}/api/changelog`,
  headers: header,
  withCredentials: true,
})

export const getChangelog = async (): Promise<
  z.infer<typeof changelog>
> => {
  const response = await changelogApi.get('/')
  return response.data
}
