import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'

import TeamSerie from '../models/TeamSerie.js'
import authControl from '../utils/middleware/authControl.js'
import teamSeriesUpsertPromise, {
  teamSeriesIdParser,
} from '../utils/postFunctions/newTeamSeriesEntry.js'

const teamSeriesRouter = Router()

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
