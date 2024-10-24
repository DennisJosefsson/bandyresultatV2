import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import { Op } from 'sequelize'
import { z } from 'zod'
import Season from '../../models/Season.js'
import Serie from '../../models/Serie.js'
import Team from '../../models/Team.js'
import TeamGame from '../../models/TeamGame.js'
import TeamTable from '../../models/TeamTable.js'
import { sequelize } from '../../utils/db.js'
import NotFoundError from '../../utils/middleware/errors/NotFoundError.js'
import { leagueTableParser } from '../../utils/postFunctions/leagueTableParser.js'
import seasonIdCheck from '../../utils/postFunctions/seasonIdCheck.js'
import {
  staticTableSortFunction,
  tableSortFunction,
} from '../../utils/postFunctions/sortLeagueTables.js'
import {
  leagueTable,
  miniTableItemArray,
} from '../../utils/responseTypes/tableTypes.js'

const parseParam = z.object({
  table: z.enum(['all', 'home', 'away']).catch('all'),
  women: z.enum(['true', 'false']).catch('false'),
})

const parseSubParam = z.object({
  women: z.enum(['true', 'false']).catch('false'),
})

type BonusPoints = {
  [key: string]: number
}

type Where = {
  played: true
  playoff: false
  homeGame?: boolean
  women: boolean
}

const leagueTableRouter = Router()

leagueTableRouter.get('/league/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonYear = seasonIdCheck.parse(req.params.seasonId)

  const { table, women } = parseParam.parse(req.query)

  const lowerLevel = await Serie.findAll({
    where: { level: [2, 3, 4, 5], serieCategory: 'regular' },
    include: {
      model: Season,
      where: {
        year: { [Op.eq]: seasonYear },
        women: women === 'true' ? true : false,
      },
      attributes: ['year', 'seasonId'],
    },
  })

  const hasLowerLevel = lowerLevel.length > 0 ? true : false

  if (
    women === 'true' &&
    seasonYear &&
    ['1972/1973', '1973/1974'].includes(seasonYear)
  ) {
    const tables = await TeamTable.findAll({
      include: [
        {
          model: Season,
          where: { year: { [Op.eq]: seasonYear } },
          attributes: ['year', 'seasonId'],
        },
        Team,
        Serie,
      ],
      raw: true,
      nest: true,
    })
    const series = await Serie.findAll({
      where: { serieCategory: 'regular' },
      include: [{ model: Season, where: { year: seasonYear, women: true } }],
      raw: true,
      nest: true,
    })
    const seriesData = series.map((serie) => {
      return {
        comment: serie.comment,
        name: serie.serieName,
        group: serie.serieGroupCode,
        serieStructure: serie.serieStructure,
        level: serie.level,
      }
    })
    const staticTables = staticTableSortFunction(tables, seriesData)
    return res.status(200).json({ hasLowerLevel, staticTables })
  }

  const getTeamArray = await TeamGame.findAll({
    where: { playoff: false, women: women },
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
      { model: Serie, where: { level: 1 }, attributes: ['level'] },
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
      'serie.level',
    ],
    raw: true,
    nest: true,
  })

  const teamArray = miniTableItemArray.parse(getTeamArray)

  let where: Where = {
    played: true,
    women: women === 'true' ? true : false,
    playoff: false,
  }
  if (table === 'home') {
    where = { ...where, homeGame: true }
  } else if (table === 'away') {
    where = { ...where, homeGame: false }
  }

  const getTable = await TeamGame.findAll({
    where: where,
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
      {
        model: Serie,
        where: { level: 1 },
        attributes: ['level'],
      },
    ],
    group: [
      'group',
      'teamId',
      'team.name',
      'team.team_id',
      'team.casual_name',
      'team.short_name',
      'category',
      'season.season_id',
      'season.year',
      'teamgame.women',
      'serie.level',
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

  const tabell = leagueTableParser(teamArray, parsedTable)

  const series = await Serie.findAll({
    where: { serieCategory: ['regular', 'qualification'], level: 1 },
    include: [
      { model: Season, where: { year: seasonYear, women: women === 'true' } },
    ],
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

  const seriesWithBonusPoints = series.find(
    (serie) => serie.bonusPoints !== null
  )

  if (seriesWithBonusPoints && table === 'all') {
    const bonusPointsObject = JSON.parse(
      seriesWithBonusPoints.bonusPoints
    ) as BonusPoints

    const updatedTable = tabell.map((table) => {
      return table.group === seriesWithBonusPoints.serieGroupCode &&
        table.women === seriesWithBonusPoints.season.women
        ? {
            ...table,
            totalPoints:
              table.totalPoints + bonusPointsObject[table.teamId.toString()],
          }
        : table
    })

    const tables = tableSortFunction(updatedTable, seriesData)

    return res.status(200).json({ hasLowerLevel, tables })
  }

  if (seasonYear && ['1933', '1937'].includes(seasonYear)) {
    const games = await TeamGame.findAll({
      where: {
        ...where,
        group: {
          [Op.startsWith]: seasonYear === '1933' ? 'Div' : 'Avd',
        },
        [Op.not]: {
          opponentId: seasonYear === '1933' ? [5, 31, 57, 29] : [5, 64, 57, 17],
        },
      },
      include: [
        {
          model: Season,
          attributes: ['seasonId', 'year'],
          where: { year: { [Op.eq]: seasonYear } },
        },
        { model: Serie, where: { level: 1 } },
      ],
      raw: true,
      nest: true,
    })

    games.forEach((game) => {
      const tableIndex = tabell.findIndex(
        (table) =>
          table.team === game.team && table.group.includes('Nedflyttning')
      )

      if (tableIndex === -1) return

      tabell[tableIndex].totalGames = tabell[tableIndex].totalGames + 1
      tabell[tableIndex].totalWins =
        tabell[tableIndex].totalWins + (game.win ? 1 : 0)
      tabell[tableIndex].totalDraws =
        tabell[tableIndex].totalDraws + (game.draw ? 1 : 0)
      tabell[tableIndex].totalLost =
        tabell[tableIndex].totalLost + (game.lost ? 1 : 0)
      tabell[tableIndex].totalGoalsScored =
        tabell[tableIndex].totalGoalsScored + game.goalsScored
      tabell[tableIndex].totalGoalsConceded =
        tabell[tableIndex].totalGoalsConceded + game.goalsConceded
      tabell[tableIndex].totalGoalDifference =
        tabell[tableIndex].totalGoalDifference + game.goalDifference
      tabell[tableIndex].totalPoints =
        tabell[tableIndex].totalPoints + game.points
    })

    const tables = tableSortFunction(tabell, seriesData)

    return res.status(200).json({ hasLowerLevel, tables })
  }

  const tables = tableSortFunction(tabell, seriesData)

  res.status(200).json({ hasLowerLevel, tables })
}) as RequestHandler)

const parseGroupCode = z.string()

leagueTableRouter.get('/sub/:seasonId/:groupCode', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonYear = seasonIdCheck.parse(req.params.seasonId)
  const groupCode = parseGroupCode.parse(req.params.groupCode)
  const { women } = parseSubParam.parse(req.query)

  const hasGames = await TeamGame.findOne({
    where: { group: groupCode, women: women === 'true' },
    include: [
      {
        model: Season,
        attributes: ['seasonId', 'year'],
        where: { year: { [Op.eq]: seasonYear } },
      },
      {
        model: Serie,
        where: { level: [2, 3, 4] },
        attributes: ['level'],
      },
    ],
  })

  if (!hasGames) {
    const tables = await TeamTable.findAll({
      where: { group: { [Op.eq]: groupCode } },
      include: [
        {
          model: Season,
          where: {
            year: { [Op.eq]: seasonYear },
            women: women === 'true' ? true : false,
          },
        },
        Team,
        { model: Serie, where: { level: [2, 3, 4] } },
      ],
      order: [['position', 'asc']],
      raw: true,
      nest: true,
    })

    if (tables.length === 0) {
      throw new NotFoundError({
        code: 404,
        message: 'Inga tabeller',
        logging: false,
        context: { origin: 'GET Sub league tables' },
      })
    }

    const series = await Serie.findAll({
      where: {
        level: [2, 3, 4],
        serieGroupCode: { [Op.eq]: groupCode },
      },
      include: [
        {
          model: Season,
          where: { year: seasonYear, women: women === 'true' ? true : false },
        },
      ],
      raw: true,
      nest: true,
    })
    const seriesData = series.map((serie) => {
      return {
        comment: serie.comment,
        name: serie.serieName,
        group: serie.serieGroupCode,
        serieStructure: serie.serieStructure,
        level: serie.level,
      }
    })
    const subTables = staticTableSortFunction(tables, seriesData).sort(
      (a, b) => a.level - b.level
    )

    return res.status(200).json({ staticTables: subTables })
  }

  const getTable = await TeamGame.findAll({
    where: { group: groupCode, women: women, played: true },
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
      {
        model: Serie,
        where: { level: [2, 3, 4] },
        attributes: ['level'],
      },
    ],
    group: [
      'group',
      'teamId',
      'team.name',
      'team.team_id',
      'team.casual_name',
      'team.short_name',
      'category',
      'season.season_id',
      'season.year',
      'teamgame.women',
      'serie.level',
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

  const getTeamArray = await TeamGame.findAll({
    where: { group: groupCode, women: women },
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
      { model: Serie, where: { level: [2, 3, 4] }, attributes: ['level'] },
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
      'serie.level',
    ],
    raw: true,
    nest: true,
  })

  const series = await Serie.findAll({
    where: {
      level: [2, 3, 4],
      serieGroupCode: { [Op.eq]: groupCode },
    },
    include: [
      {
        model: Season,
        where: { year: seasonYear, women: women === 'true' ? true : false },
      },
    ],
    raw: true,
    nest: true,
  })
  const seriesData = series.map((serie) => {
    return {
      comment: serie.comment,
      name: serie.serieName,
      group: serie.serieGroupCode,
      serieStructure: serie.serieStructure,
      level: serie.level,
    }
  })

  const teamArray = miniTableItemArray.parse(getTeamArray)

  const parsedTable = leagueTable.parse(getTable)

  const tabell = leagueTableParser(teamArray, parsedTable)

  const tables = tableSortFunction(tabell, seriesData)

  res.status(200).json({ tables })
}) as RequestHandler)

export default leagueTableRouter
