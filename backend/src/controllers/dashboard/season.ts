import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import Season from '../../models/Season.js'
import Team from '../../models/Team.js'

import { z } from 'zod'
import Serie from '../../models/Serie.js'

// import authControl from '../../utils/middleware/authControl.js'

const dashboardSeasonRouter = Router()

const parsedSeasonId = z.coerce.number()

dashboardSeasonRouter.get('/gameform/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonId = parsedSeasonId.parse(req.params.seasonId)
  const teams = await Team.findAll({
    include: [
      {
        model: Season,
        where: { seasonId: seasonId },
        attributes: { exclude: ['teamseason'] },
      },
    ],

    raw: true,
    nest: true,
  })
  const series = await Serie.findAll({
    include: [{ model: Season, where: { seasonId: seasonId } }],
    raw: true,
    nest: true,
  })

  res.status(200).json({ teams, series })
}) as RequestHandler)

export default dashboardSeasonRouter
