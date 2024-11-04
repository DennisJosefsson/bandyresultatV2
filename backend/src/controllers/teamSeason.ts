import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import { Op } from 'sequelize'
import { z } from 'zod'
import Season from '../models/Season.js'
import Team from '../models/Team.js'
import TeamSeason from '../models/TeamSeason.js'
import authControl from '../utils/middleware/authControl.js'
import NotFoundError from '../utils/middleware/errors/NotFoundError.js'
import teamSeasonUpsertPromise, {
  teamSeasonIdParser,
} from '../utils/postFunctions/newTeamSeasonEntry.js'
import seasonIdCheck from '../utils/postFunctions/seasonIdCheck.js'

const teamSeasonRouter = Router()

teamSeasonRouter.get('/team/:teamId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const teamId = z.coerce.number().parse(req.params.teamId)

  const teamSeasons = await TeamSeason.findAll({
    where: { teamId },
    include: Season,
    order: [['seasonId', 'desc']],
  }).then((res) => {
    return res.map((item) => {
      return {
        seasonId: item.season.year.includes('/')
          ? parseInt(item.season.year.split('/')[1])
          : parseInt(item.season.year),
        year: item.season.year,
      }
    })
  })
  if (!teamSeasons || teamSeasons.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'Laget har inga säsonger, alt. laget finns inte.',
      logging: false,
      context: { origin: 'Get Single Team Teamseasons' },
    })
  }

  if (teamSeasons.length > 10) {
    const copy = [...teamSeasons]
    const head = copy.splice(0, 8)
    return res.status(200).json({
      seasons: head,
      rest: copy,
    })
  }
  res.status(200).json({ seasons: teamSeasons, rest: [] })
}) as RequestHandler)

teamSeasonRouter.get('/dashboard/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonId = z.coerce.number().parse(req.params.seasonId)

  const teamSeasons = await TeamSeason.findAll({
    where: { seasonId },
    include: Team,
  })
  if (!teamSeasons || teamSeasons.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No teamseason',
      logging: false,
      context: { origin: 'Get Single Season Teamseasons' },
    })
  }
  res.status(200).json(teamSeasons)
}) as RequestHandler)

teamSeasonRouter.get('/single/:teamseasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const teamseasonId = z.coerce.number().parse(req.params.teamseasonId)

  const teamSeason = await TeamSeason.findByPk(teamseasonId, {
    include: Team,
  })
  if (!teamSeason) {
    throw new NotFoundError({
      code: 404,
      message: 'No teamseasons',
      logging: false,
      context: { origin: 'Get Single Season Teamseasons' },
    })
  }
  res.status(200).json(teamSeason)
}) as RequestHandler)

teamSeasonRouter.get('/:id', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonYear = seasonIdCheck.safeParse(req.params.seasonId)

  const teamSeasons = await TeamSeason.findAll({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear.success && seasonYear.data } },
    },
  })
  if (!teamSeasons || teamSeasons.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No teamseasons',
      logging: false,
      context: { origin: 'Get Single Season Teamseasons' },
    })
  }
  res.status(200).json(teamSeasons)
}) as RequestHandler)

teamSeasonRouter.get('/', (async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const teamSeasons = await TeamSeason.findAll()
  if (!teamSeasons || teamSeasons.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No teamseasons',
      logging: false,
      context: { origin: 'Get All Teamseasons' },
    })
  }
  res.status(200).json(teamSeasons)
}) as RequestHandler)

teamSeasonRouter.post('/', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const parsedData = teamSeasonUpsertPromise(req.body)
  if (!parsedData.teamseasonId) {
    const teamSeasons = await TeamSeason.create(parsedData)
    return res.status(201).json(teamSeasons)
  } else {
    const teamSeasons = await TeamSeason.update(parsedData, {
      where: { teamseasonId: parsedData.teamseasonId },
    })
    return res.status(201).json(teamSeasons)
  }
}) as RequestHandler)

teamSeasonRouter.delete('/:teamseasonId', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const teamseasonId = teamSeasonIdParser.parse(req.params.teamseasonId)
  const teamseason = await TeamSeason.findByPk(teamseasonId)
  if (!teamseason) {
    res.status(404).json({ message: 'TeamSeason finns inte.' })
  } else {
    await teamseason.destroy()
    res.status(204).json({ message: 'TeamSeason borttagen.' })
  }
}) as RequestHandler)

export default teamSeasonRouter
