import { z } from 'zod'

export const bandyError = z.object({
  errorId: z.number(),
  date: z.string(),
  name: z.string(),
  message: z.string(),
  origin: z.string(),
  body: z.string(),
  production: z.boolean(),
  backend: z.boolean(),
})

export const newBandyError = bandyError.omit({ errorId: true })

export const bandyErrorResponse = z.object({
  frontendErrors: z.array(bandyError),
  backendErrors: z.array(bandyError),
})
