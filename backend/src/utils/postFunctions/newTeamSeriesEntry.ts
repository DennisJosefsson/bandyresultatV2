import { teamSerieInput } from '../../models/TeamSerie.js'
import BadRequestError from '../middleware/errors/BadRequestError.js'

import { z } from 'zod'

export const teamSeriesIdParser = z.coerce.number()

const teamSeriesUpsertPromise = (object: unknown) => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'teamSeasonUpsertPromise' },
    })
  }

  const teamSeriesEntries = teamSerieInput.parse(object)

  return teamSeriesEntries
}

export default teamSeriesUpsertPromise
