import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import Game from '../../models/Game.js'
import Season from '../../models/Season.js'
import Serie from '../../models/Serie.js'
import Team from '../../models/Team.js'

import { z } from 'zod'

const dashboardGameRouter = Router()

const parsedSerieId = z.coerce.number()

dashboardGameRouter.get('/games', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const serieId = parsedSerieId.parse(req.query.serieId)
  const games = await Game.findAll({
    include: [
      { model: Serie, where: { serieId: serieId } },
      {
        model: Season,
      },
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'homeTeam',
      },
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'awayTeam',
      },
    ],
    order: [
      ['played', 'ASC'],
      ['date', 'ASC'],
    ],
    raw: true,
    nest: true,
  })

  res.status(200).json(games)
}) as RequestHandler)

export default dashboardGameRouter
