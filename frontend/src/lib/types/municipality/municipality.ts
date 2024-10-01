import { z } from 'zod'

export const municipality = z.object({
  municipalityId: z.number(),
  name: z.string(),
  countyId: z.number(),
})
