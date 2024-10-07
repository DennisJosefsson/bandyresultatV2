import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import Serie from '../../models/Serie.js'
import Team from '../../models/Team.js'

import { z } from 'zod'
import TeamTable from '../../models/TeamTable.js'

const dashboardSerieInfoRouter = Router()

const parsedSerieId = z.coerce.number()

dashboardSerieInfoRouter.get('/serieinfo', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const serieId = parsedSerieId.parse(req.query.serieId)
  const serie = await Serie.findByPk(serieId, {
    include: [Team, { model: TeamTable, include: [Team] }],
  })

  res.status(200).json(serie)
}) as RequestHandler)

export default dashboardSerieInfoRouter
