import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'

import Team from '../models/Team.js'
import TeamSerie from '../models/TeamSerie.js'
import authControl from '../utils/middleware/authControl.js'
import IDCheck from '../utils/postFunctions/IDCheck.js'
import teamSeriesUpsertPromise, {
  teamSeriesIdParser,
} from '../utils/postFunctions/newTeamSeriesEntry.js'

const teamSeriesRouter = Router()

teamSeriesRouter.get('/teams/:serieId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const serieId = IDCheck.parse(req.params.serieId)
  const teams = await TeamSerie.findAll({ where: { serieId }, include: Team })

  res.status(200).json(teams)
}) as RequestHandler)

teamSeriesRouter.post('/', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const parsedData = teamSeriesUpsertPromise(req.body)
  await TeamSerie.create(parsedData)
  res.status(201).json({ message: 'Teamseries created' })
}) as RequestHandler)

teamSeriesRouter.delete('/:teamseriesId', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const teamseriesId = teamSeriesIdParser.parse(req.params.teamseriesId)
  const teamseries = await TeamSerie.findByPk(teamseriesId)
  if (!teamseries) {
    res.status(404).json({ message: 'TeamSeries finns inte.' })
  } else {
    await teamseries.destroy()
    res.status(204).json({ message: 'TeamSeries borttagen.' })
  }
}) as RequestHandler)

export default teamSeriesRouter
