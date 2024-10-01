import { z } from 'zod'

export const county = z.object({ countyId: z.number(), name: z.string() })
