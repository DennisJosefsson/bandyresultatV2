//OBS! DEV.bandyresultat.se

export const baseUrl = import.meta.env.PROD
  ? 'https://dev.bandyresultat.se'
  : 'http://localhost:3001'

export const mobileBaseUrl = 'http://192.168.38.191:3001'

export const header = { Authorization: true }
