import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type HostName = 'localhost' | 'dev.bandyresultat.se' | 'bandyresultat.se'

export const getBaseUrl = () => {
  let apiBaseUrl: string
  let serverBaseUrl: string
  const hostname = location.hostname as HostName

  switch (hostname) {
    case 'localhost':
      apiBaseUrl = import.meta.env.VITE_API_LOCALHOST_URL
      serverBaseUrl = import.meta.env.VITE_SITE_LOCALHOST_URL
      break
    case 'dev.bandyresultat.se':
      apiBaseUrl = import.meta.env.VITE_API_DEV_URL
      serverBaseUrl = import.meta.env.VITE_SITE_DEV_URL
      break
    case 'bandyresultat.se':
      apiBaseUrl = import.meta.env.VITE_API_PROD_URL
      serverBaseUrl = import.meta.env.VITE_SITE_PROD_URL
      break
    default:
      apiBaseUrl = import.meta.env.VITE_API_LOCALHOST_URL
      serverBaseUrl = import.meta.env.VITE_SITE_LOCALHOST_URL
      break
  }

  return { apiBaseUrl, serverBaseUrl }
}
