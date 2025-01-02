import axios from 'axios'
import { z } from 'zod'
import {
  baseUrl,
  header,
  mobileBaseUrl,
} from '../config/requestConfig'

import { metadata } from '../types/metadata/metadata'

const backendUrl =
  import.meta.env.MODE === 'mobile'
    ? mobileBaseUrl
    : baseUrl

const metadataApi = axios.create({
  baseURL: `${backendUrl}/api/metadata`,
  headers: header,
  withCredentials: true,
})

export const getMetadata = async () => {
  const response = await metadataApi.get('/')
  return response.data
}

export const getSingleMetadata = async (
  year: string
): Promise<z.infer<typeof metadata>[]> => {
  const seasonId = year.slice(-4)
  const response = await metadataApi.get(`/${seasonId}`)
  return response.data
}

export const postMetadata = async (
  formData: z.infer<typeof metadata>
) => {
  return await metadataApi.post('/', formData)
}

export default metadataApi
