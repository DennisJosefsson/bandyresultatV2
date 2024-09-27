import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import { Op } from 'sequelize'
import Season from '../models/Season.js'
import Team from '../models/Team.js'
import TeamGame from '../models/TeamGame.js'
import NotFoundError from '../utils/middleware/errors/NotFoundError.js'
import seasonIdCheck from '../utils/postFunctions/seasonIdCheck.js'

const teamgameRouter = Router()

teamgameRouter.get('/season/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonYear = seasonIdCheck.parse(req.params.seasonId)
  const teamgames = await TeamGame.findAll({
    include: [
      {
        model: Season,
        where: { year: { [Op.eq]: seasonYear } },
      },
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'team',
      },
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'opponent',
      },
    ],
    order: [
      ['group', 'ASC'],
      ['date', 'ASC'],
    ],
  })
  if (!teamgames || teamgames.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No games',
      logging: false,
      context: { origin: 'GET Games Season Router' },
    })
  }
  res.status(200).json(teamgames)
}) as RequestHandler)

export default teamgameRouter
