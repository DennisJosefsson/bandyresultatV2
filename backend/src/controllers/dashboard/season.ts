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
import Metadata from '../../models/Metadata.js'
import Serie from '../../models/Serie.js'
import TeamSeason from '../../models/TeamSeason.js'

const dashboardSeasonRouter = Router()

const parsedSeasonId = z.coerce.number()
const parsedSerieId = z.coerce.number()

dashboardSeasonRouter.get('/gameform/:serieId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const serieId = parsedSerieId.parse(req.params.serieId)
  const teams = await Team.findAll({
    include: [
      {
        model: Serie,
        where: { serieId: serieId },
        
      },
    ],

    raw: true,
    nest: true,
  })

  const getSeasonId = await Serie.findByPk(serieId).then(res => res?.seasonId)

  const seasonId = parsedSeasonId.parse(getSeasonId)

  const series = await Serie.findAll({
    include: [{ model: Season, where: { seasonId: seasonId } }],
    raw: true,
    nest: true,
  })

  res.status(200).json({ teams, series })
}) as RequestHandler)

dashboardSeasonRouter.get('/season/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonId = parsedSeasonId.parse(req.params.seasonId)
  const metadata = await Metadata.findOne({ where: { seasonId } })
  const teams = await TeamSeason.findAll({ where: { seasonId }, include: Team })
  const series = await Serie.findAll({ where: { seasonId } })
  const season = await Season.findByPk(seasonId)

  res.status(200).json({ season, metadata, teams, series })
}) as RequestHandler)

export default dashboardSeasonRouter
