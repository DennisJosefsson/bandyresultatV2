import { z } from 'zod'
import Season from '../../models/Season'

export const parseCompareRequest = (object: unknown, season: Season | null) => {
  if (!season) {
    throw new Error('Missing season')
  }

  const maxId = season.seasonId

  const compareObject = z.object({
    teamArray: z
      .array(z.number().int().positive(), {
        required_error: 'Måste ange minst två lag.',
      })
      .min(2, { message: 'Måste ange minst två lag.' })
      .max(4, { message: 'Får högst ange fyra lag.' }),
    categoryArray: z
      .array(
        z.enum([
          'qualification',
          'regular',
          'eight',
          'quarter',
          'semi',
          'final',
        ])
      )
      .min(1, { message: 'Måste ange minst en kategori.' })
      .catch(['qualification', 'regular', 'eight', 'quarter', 'semi', 'final']),
    startSeason: z.coerce.number().int().positive().catch(1),
    endSeason: z.coerce.number().int().positive().catch(maxId),
  })

  const parsedObject = compareObject.parse(object)

  return parsedObject
}
