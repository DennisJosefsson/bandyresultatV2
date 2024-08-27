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
import { maratonTable } from '../../utils/responseTypes/tableTypes.js'

const maratonRouter = Router()

import { z } from 'zod'

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

  const getMaratonTabell = await TeamGame.findAll({
    where: where,
    attributes: [
      'team',
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
        as: 'lag',
      },
    ],
    group: [
      'team',
      'lag.name',
      'lag.team_id',
      'lag.casual_name',
      'lag.short_name',
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

  const maratonTabell = maratonTable.parse(getMaratonTabell)

  // const getMaratonHemmaTabell = await TeamGame.findAll({
  //   where: { category: 'regular', played: true, homeGame: true },
  //   attributes: [
  //     'team',
  //     'women',
  //     [sequelize.fn('count', sequelize.col('team_game_id')), 'totalGames'],
  //     [sequelize.fn('sum', sequelize.col('points')), 'totalPoints'],
  //     [sequelize.fn('sum', sequelize.col('goals_scored')), 'totalGoalsScored'],
  //     [
  //       sequelize.fn('sum', sequelize.col('goals_conceded')),
  //       'totalGoalsConceded',
  //     ],
  //     [
  //       sequelize.fn('sum', sequelize.col('goal_difference')),
  //       'totalGoalDifference',
  //     ],
  //     [sequelize.literal(`(count(*) filter (where win))`), 'totalWins'],
  //     [sequelize.literal(`(count(*) filter (where draw))`), 'totalDraws'],
  //     [sequelize.literal(`(count(*) filter (where lost))`), 'totalLost'],
  //   ],
  //   include: [
  //     {
  //       model: Team,
  //       attributes: ['name', 'teamId', 'casualName', 'shortName', 'women'],
  //       as: 'lag',
  //     },
  //   ],
  //   group: [
  //     'team',
  //     'lag.name',
  //     'lag.team_id',
  //     'lag.casual_name',
  //     'lag.short_name',
  //     'teamgame.women',
  //   ],
  //   order: [
  //     ['totalPoints', 'DESC'],
  //     ['totalGoalDifference', 'DESC'],
  //     ['totalGoalsScored', 'DESC'],
  //   ],
  //   raw: true,
  //   nest: true,
  // })

  // const maratonHemmaTabell = maratonTable.parse(getMaratonHemmaTabell)

  // const getMaratonBortaTabell = await TeamGame.findAll({
  //   where: { category: 'regular', played: true, homeGame: false },
  //   attributes: [
  //     'team',
  //     'women',
  //     [sequelize.fn('count', sequelize.col('team_game_id')), 'totalGames'],
  //     [sequelize.fn('sum', sequelize.col('points')), 'totalPoints'],
  //     [sequelize.fn('sum', sequelize.col('goals_scored')), 'totalGoalsScored'],
  //     [
  //       sequelize.fn('sum', sequelize.col('goals_conceded')),
  //       'totalGoalsConceded',
  //     ],
  //     [
  //       sequelize.fn('sum', sequelize.col('goal_difference')),
  //       'totalGoalDifference',
  //     ],
  //     [sequelize.literal(`(count(*) filter (where win))`), 'totalWins'],
  //     [sequelize.literal(`(count(*) filter (where draw))`), 'totalDraws'],
  //     [sequelize.literal(`(count(*) filter (where lost))`), 'totalLost'],
  //   ],
  //   include: [
  //     {
  //       model: Team,
  //       attributes: ['name', 'teamId', 'casualName', 'shortName', 'women'],
  //       as: 'lag',
  //     },
  //   ],
  //   group: [
  //     'team',
  //     'lag.name',
  //     'lag.team_id',
  //     'lag.casual_name',
  //     'lag.short_name',
  //     'teamgame.women',
  //   ],
  //   order: [
  //     ['totalPoints', 'DESC'],
  //     ['totalGoalDifference', 'DESC'],
  //     ['totalGoalsScored', 'DESC'],
  //   ],
  //   raw: true,
  //   nest: true,
  // })

  // const maratonBortaTabell = maratonTable.parse(getMaratonBortaTabell)
  res.status(200).json(maratonTabell)
}) as RequestHandler)

export default maratonRouter
