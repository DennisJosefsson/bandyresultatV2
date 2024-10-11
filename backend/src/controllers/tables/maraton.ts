import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import { sequelize } from '../../utils/db.js'

import Team from '../../models/Team.js'
import TeamGame from '../../models/TeamGame.js'
import { maratonTableSchema } from '../../utils/responseTypes/tableTypes.js'

const maratonRouter = Router()

import { z } from 'zod'
import Serie from '../../models/Serie.js'

const parseParam = z.enum(['all', 'home', 'away']).catch('all')

type Where = { category: 'regular'; played: boolean; homeGame?: boolean }

maratonRouter.get('/maraton', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'GET Maraton router'

  const table = parseParam.parse(req.query.table)

  let where: Where = { category: 'regular', played: true }
  if (table === 'home') {
    where = { ...where, homeGame: true }
  } else if (table === 'away') {
    where = { ...where, homeGame: false }
  }

  const getMaratonTable = await TeamGame.findAll({
    where: where,
    attributes: [
      ['team', 'teamId'],
      'women',
      [sequelize.fn('count', sequelize.col('team_game_id')), 'totalGames'],
      [sequelize.fn('sum', sequelize.col('points')), 'totalPoints'],
      [sequelize.fn('sum', sequelize.col('goals_scored')), 'totalGoalsScored'],
      [
        sequelize.fn('sum', sequelize.col('goals_conceded')),
        'totalGoalsConceded',
      ],
      [
        sequelize.fn('sum', sequelize.col('goal_difference')),
        'totalGoalDifference',
      ],
      [sequelize.literal(`(count(*) filter (where win))`), 'totalWins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'totalDraws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'totalLost'],
    ],
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName', 'women'],
        as: 'team',
      },
      { model: Serie, where: { level: 1 } },
    ],
    group: [
      'teamId',
      'team.name',
      'team.team_id',
      'team.casual_name',
      'team.short_name',
      'teamgame.women',
    ],
    order: [
      ['totalPoints', 'DESC'],
      ['totalGoalDifference', 'DESC'],
      ['totalGoalsScored', 'DESC'],
    ],
    raw: true,
    nest: true,
  })

  const maratonTable = maratonTableSchema.parse(getMaratonTable)

  res.status(200).json(maratonTable)
}) as RequestHandler)

export default maratonRouter
