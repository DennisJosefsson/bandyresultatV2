import { z } from 'zod'

export const changelog = z.object({ changelog: z.string() })
