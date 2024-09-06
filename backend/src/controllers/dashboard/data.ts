import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import { z } from 'zod'
import Game from '../../models/Game.js'
import Season from '../../models/Season.js'
import Team from '../../models/Team.js'
import TeamGame from '../../models/TeamGame.js'
import { sequelize } from '../../utils/db.js'
const parseNumber = z.coerce.number()

const dashboardDataRouter = Router()

dashboardDataRouter.get('/data', (async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const gameCount = await Game.count({ group: ['women'] })
  const seasonCount = await Season.count({ group: ['women'] })
  const teamCount = await Team.count({ group: ['women'] })
  const goalCountMen = await TeamGame.findOne({
    where: { homeGame: true, women: false },
    attributes: [
      [sequelize.fn('SUM', sequelize.col('total_goals')), 'totalGoals'],
    ],
    raw: true,
    nest: true,
  })
  const goalCountWomen = await TeamGame.findOne({
    where: { homeGame: true, women: true },
    attributes: [
      [sequelize.fn('SUM', sequelize.col('total_goals')), 'totalGoals'],
    ],
    raw: true,
    nest: true,
  })

  const goalCount = [
    {
      women: false,
      count: parseNumber.parse(goalCountMen && goalCountMen.totalGoals),
    },
    {
      women: true,
      count: parseNumber.parse(goalCountWomen && goalCountWomen.totalGoals),
    },
  ]

  res.status(200).json({
    gameCount: [
      ...gameCount,
      {
        women: null,
        count: gameCount.reduce((acc, curr) => acc + curr.count, 0),
      },
    ],
    seasonCount: [
      ...seasonCount,
      {
        women: null,
        count: seasonCount.reduce((acc, curr) => acc + curr.count, 0),
      },
    ],
    teamCount: [
      ...teamCount,
      {
        women: null,
        count: teamCount.reduce((acc, curr) => acc + curr.count, 0),
      },
    ],
    goalCount: [
      ...goalCount,
      {
        women: null,
        count: goalCount.reduce((acc, curr) => acc + curr.count, 0),
      },
    ],
  })
}) as RequestHandler)

export default dashboardDataRouter
