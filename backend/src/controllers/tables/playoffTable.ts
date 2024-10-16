import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import sequelize, { Op } from 'sequelize'
import Game from '../../models/Game.js'
import Season from '../../models/Season.js'

import { z } from 'zod'
import Serie from '../../models/Serie.js'
import Team from '../../models/Team.js'
import TeamGame from '../../models/TeamGame.js'

import { leagueTableParser } from '../../utils/postFunctions/leagueTableParser.js'
import seasonIdCheck from '../../utils/postFunctions/seasonIdCheck.js'
import {
  getResultAndTeams,
  tableSortFunction,
} from '../../utils/postFunctions/sortLeagueTables.js'
import {
  leagueTable,
  miniTableItemArray,
} from '../../utils/responseTypes/tableTypes.js'

const parseWomen = z.enum(['true', 'false']).catch('false')

const playoffRouter = Router()

playoffRouter.get('/playoff/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonYear = seasonIdCheck.parse(req.params.seasonId)
  const women = parseWomen.parse(req.query.women)

  const getTeamArray = await TeamGame.findAll({
    where: { playoff: true, women: women === 'true' ? true : false },
    include: [
      {
        model: Season,
        where: { year: { [Op.eq]: seasonYear } },
        attributes: ['year', 'seasonId'],
      },
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'team',
      },
    ],
    attributes: [
      [sequelize.literal('DISTINCT (team)'), 'teamId'],
      'group',
      'category',
      'women',
    ],
    group: [
      'group',
      'teamId',
      'category',
      'team.name',
      'team.team_id',
      'team.casual_name',
      'team.short_name',
      'season.season_id',
      'season.year',
      'teamgame.women',
    ],
    raw: true,
    nest: true,
  })

  const teamArray = miniTableItemArray.parse(getTeamArray)

  const playoffGames = await Game.findAll({
    where: { playoff: true, women: women === 'true' ? true : false },
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'homeTeam',
      },
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'awayTeam',
      },
      {
        model: Season,
        where: { year: { [Op.eq]: seasonYear } },
        attributes: ['year', 'seasonId'],
      },
    ],
    order: [
      ['group', 'ASC'],
      ['date', 'ASC'],
    ],
  })

  const getTable = await TeamGame.findAll({
    where: {
      played: true,
      playoff: true,
      women: women === 'true' ? true : false,
    },
    attributes: [
      'teamId',
      'group',
      'women',
      'category',
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
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'team',
      },
      {
        model: Season,
        attributes: ['seasonId', 'year'],
        where: { year: { [Op.eq]: seasonYear } },
      },
    ],
    group: [
      'group',
      'team',
      'team.name',
      'team.team_id',
      'team.casual_name',
      'team.short_name',
      'category',
      'season.season_id',
      'season.year',
      'teamgame.women',
    ],
    order: [
      ['group', 'DESC'],
      ['totalPoints', 'DESC'],
      ['totalGoalDifference', 'DESC'],
      ['totalGoalsScored', 'DESC'],
    ],
    raw: true,
    nest: true,
  })

  const parsedTable = leagueTable.parse(getTable)

  const table = leagueTableParser(teamArray, parsedTable)

  const series = await Serie.findAll({
    where: { serieCategory: 'regular' },
    include: [{ model: Season, where: { year: seasonYear } }],
    raw: true,
    nest: true,
  })

  const seriesData = series.map((serie) => {
    return {
      group: serie.serieGroupCode,
      comment: serie.comment,
      name: serie.serieName,
      serieStructure: serie.serieStructure,
      level: serie.level,
    }
  })

  const final = playoffGames?.filter((games) => games.category === 'final')
  const unsortedSemiTables = table.filter((table) => table.category === 'semi')
  const unsortedQuarterTables = table.filter(
    (table) => table.category === 'quarter'
  )
  const unsortedEightTables = table.filter(
    (table) => table.category === 'eight'
  )

  const sortedSemiTables = tableSortFunction(unsortedSemiTables, seriesData)
  const sortedQuarterTables = tableSortFunction(
    unsortedQuarterTables,
    seriesData
  )
  const sortedEightTables = tableSortFunction(unsortedEightTables, seriesData)

  const semiResults = sortedSemiTables.map((table, _, array) => {
    return {
      group: table.group,
      games: playoffGames
        .filter((game) => game.group === table.group)
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
      result: getResultAndTeams(array, table.group),
    }
  })

  const quarterResults = sortedQuarterTables.map((table, _, array) => {
    return {
      group: table.group,
      games: playoffGames
        .filter((game) => game.group === table.group)
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
      result: getResultAndTeams(array, table.group),
    }
  })

  const eightResults = sortedEightTables.map((table, _, array) => {
    return {
      group: table.group,
      games: playoffGames
        .filter((game) => game.group === table.group)
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
      result: getResultAndTeams(array, table.group),
    }
  })

  res.status(200).json({
    results: { semiResults, quarterResults, eightResults },

    final,
  })
}) as RequestHandler)

export default playoffRouter
