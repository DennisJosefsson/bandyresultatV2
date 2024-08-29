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
      }
    })
    const staticTables = staticTableSortFunction(tables, seriesData)
    return res.status(200).json({ staticTables })
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
        as: 'lag',
      },
    ],
    attributes: [
      [sequelize.literal('DISTINCT (team)'), 'team'],
      'group',
      'category',
      'women',
    ],
    group: [
      'group',
      'team',
      'category',
      'lag.name',
      'lag.team_id',
      'lag.casual_name',
      'lag.short_name',
      'season.season_id',
      'season.year',
      'teamgame.women',
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
      'team',
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
        as: 'lag',
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
      'lag.name',
      'lag.team_id',
      'lag.casual_name',
      'lag.short_name',
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

  const tabell = leagueTableParser(teamArray, parsedTable)

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
              table.totalPoints + bonusPointsObject[table.team.toString()],
          }
        : table
    })

    const tabeller = tableSortFunction(updatedTable, seriesData)

    return res.status(200).json({ tabeller })
  }

  if (seasonYear && ['1933', '1937'].includes(seasonYear)) {
    const games = await TeamGame.findAll({
      where: {
        ...where,
        group: {
          [Op.startsWith]: seasonYear === '1933' ? 'Div' : 'Avd',
        },
        [Op.not]: {
          opponent: seasonYear === '1933' ? [5, 31, 57, 29] : [5, 64, 57, 17],
        },
      },
      include: [
        {
          model: Season,
          attributes: ['seasonId', 'year'],
          where: { year: { [Op.eq]: seasonYear } },
        },
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

    const tabeller = tableSortFunction(tabell, seriesData)

    return res.status(200).json({
      tabeller,
    })
  }

  const tabeller = tableSortFunction(tabell, seriesData)

  res.status(200).json({ tabeller })
}) as RequestHandler)

export default leagueTableRouter
