import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import { Op } from 'sequelize'
import { z } from 'zod'
import County from '../../models/County.js'
import Team from '../../models/Team.js'
import TeamSeason from '../../models/TeamSeason.js'
import { sequelize } from '../../utils/db.js'
import authControl from '../../utils/middleware/authControl.js'
import NotFoundError from '../../utils/middleware/errors/NotFoundError.js'
import IDCheck from '../../utils/postFunctions/IDCheck.js'
import newTeamEntry from '../../utils/postFunctions/newTeamEntry.js'
import { sortMapTeams } from '../../utils/postFunctions/sortMapTeams.js'
const teamRouter = Router()

teamRouter.get('/', (async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const teams = await Team.findAll({
    order: [[sequelize.literal(`casual_name collate "se-SE-x-icu"`), 'ASC']],
  })
  if (!teams || teams.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No teams',
      logging: false,
      context: { origin: 'Get All Teams Router' },
    })
  }
  res.status(200).json(teams)
}) as RequestHandler)

const parseWomen = z.enum(['true', 'false']).catch('false')

teamRouter.get('/map', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const women = parseWomen.parse(req.query.women)
  const teams = await Team.findAll({
    where: { women: women === 'true' ? true : false, teamId: { [Op.ne]: 176 } },
    include: [County],
    group: ['countyId', 'county.county_id', 'teamId'],
    order: [
      ['countyId', 'ASC'],
      [sequelize.literal(`casual_name collate "se-SE-x-icu"`), 'ASC'],
    ],
    raw: true,
    nest: true,
  })
  if (!teams || teams.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No teams',
      logging: false,
      context: { origin: 'Get All Teams Router' },
    })
  }

  const returnTeams = sortMapTeams(teams)
  res.status(200).json(returnTeams)
}) as RequestHandler)

teamRouter.get('/latest', (async (_req, res, _next) => {
  res.locals.origin = 'GET Latest Season router'
  const women = false
  const teams = await TeamSeason.findAll({
    where: {
      seasonId: [
        sequelize.literal(
          `SELECT MAX("season_id") FROM "teamseasons" WHERE "women" = $women`
        ),
      ],
    },
    bind: { women },
  })

  res.status(200).json(teams)
}) as RequestHandler)

teamRouter.post('/', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const newTeamObject = newTeamEntry(req.body)

  const [newTeam] = await Team.upsert(newTeamObject)
  return res.status(201).json(newTeam)
}) as RequestHandler)

teamRouter.delete('/:teamId', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const teamId = IDCheck.parse(req.params.teamId)
  const team = await Team.findByPk(teamId)
  if (!team) {
    throw new NotFoundError({
      code: 404,
      message: 'No team',
      logging: false,
      context: { origin: 'Delete team Router' },
    })
  } else {
    await team.destroy()
    res.status(200).json({ message: 'team deleted' })
  }
}) as RequestHandler)

export default teamRouter
