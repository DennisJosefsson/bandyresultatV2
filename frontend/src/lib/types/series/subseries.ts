import { z } from 'zod'
import { serie } from './series'

export const subSeries = z.object({
  gameSeries: z.array(serie),
  allSeries: z.array(serie),
})

export const developmentSeries = z.object({
  gameSeries: z.array(serie),
})
