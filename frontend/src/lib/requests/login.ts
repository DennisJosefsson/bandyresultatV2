import axios from 'axios'
import { z } from 'zod'
import {
  baseUrl,
  header,
  mobileBaseUrl,
} from '../config/requestConfig'
import { login } from '../types/login/login'

const backendUrl =
  import.meta.env.MODE === 'mobile'
    ? mobileBaseUrl
    : baseUrl

const loginApi = axios.create({
  baseURL: `${backendUrl}/api/login`,
  headers: header,
  withCredentials: true,
})

export const logout = async (): Promise<
  z.infer<typeof login>
> => {
  const response = await loginApi.get('/logout')
  return response.data
}

export const getLogin = async (
  userName: string,
  password: string
): Promise<z.infer<typeof login>> => {
  const response = await loginApi.post('/', {
    userName,
    password,
  })
  return response.data
}

export default loginApi
