import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import { Op } from 'sequelize'
import County from '../../models/County.js'
import Game from '../../models/Game.js'
import Municipality from '../../models/Municipality.js'
import Season from '../../models/Season.js'
import Serie from '../../models/Serie.js'
import Team from '../../models/Team.js'
import TeamSeason from '../../models/TeamSeason.js'

import NotFoundError from '../../utils/middleware/errors/NotFoundError.js'
import seasonIdCheck from '../../utils/postFunctions/seasonIdCheck.js'
import { teamIdChecker } from '../../utils/postFunctions/teamRequest.js'
import {
  getSeasonGames,
  getTeamSeasonStaticTables,
  getTeamSeasonTables,
} from './singleSeasonTeam/getTables.js'
import { getChartData } from './singleTeam/getChartData.js'
import { getLatestFiveSeasons } from './singleTeam/getLatestFiveSeasons.js'
import { getStreaks } from './singleTeam/getStreaks.js'
import { getStrings } from './singleTeam/getStrings.js'
import { getTables } from './singleTeam/getTables.js'

const singleTeamRouter = Router()

singleTeamRouter.get('/:teamId/edit', (async (req: Request, res: Response) => {
  const teamId = teamIdChecker.parse(req.params.teamId)

  const team = await Team.findByPk(teamId)

  if (!team) {
    throw new NotFoundError({
      code: 404,
      message: 'Inget sådant lag finns.',
      logging: false,
      context: { origin: 'GET Single Team Router' },
    })
  }

  res.status(200).json(team)
}) as RequestHandler)

singleTeamRouter.get('/:teamId/:seasonId', (async (
  req: Request,
  res: Response
) => {
  const teamId = teamIdChecker.parse(req.params.teamId)

  const team = await Team.findByPk(teamId)

  if (!team) {
    throw new NotFoundError({
      code: 404,
      message: 'Inget sådant lag finns.',
      logging: false,
      context: { origin: 'GET Single Team Season Router' },
    })
  }

  const seasonYear = seasonIdCheck.parse(req.params.seasonId)

  const season = await Season.findOne({
    where: { women: team.women, year: seasonYear },
  })

  if (!season) {
    throw new NotFoundError({
      code: 404,
      message: 'Finns ingen sådan säsong',
      logging: false,
      context: { origin: 'GET Single Team Router' },
    })
  }

  const teamSeason = await TeamSeason.findOne({
    where: { teamId },
    include: [{ model: Season, where: { year: seasonYear } }],
  })

  if (!teamSeason) {
    throw new NotFoundError({
      code: 404,
      message: 'Laget har ingen sådan säsong',
      logging: false,
      context: { origin: 'GET Single Team Router' },
    })
  }

  const games = await Game.findAll({
    where: { [Op.or]: [{ homeTeamId: teamId }, { awayTeamId: teamId }] },
    include: [
      { model: Season, where: { year: seasonYear } },
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
    ],
    order: [['date', 'desc']],
  })

  const hasGames = games.length !== 0

  const series = await Serie.findAll({
    include: [
      { model: Team, where: { teamId } },
      { model: Season, where: { year: seasonYear } },
    ],
  })

  const tableSeriesArray = series
    .filter((serie) =>
      ['regular', 'qualification'].includes(serie.serieCategory)
    )
    .map((serie) => serie.serieGroupCode)
  // const playoffSeriesArray = series
  //   .filter(
  //     (serie) => !['regular', 'qualification'].includes(serie.serieCategory)
  //   )
  //   .map((serie) => serie.serieGroupCode)

  const staticTables = await getTeamSeasonStaticTables(
    seasonYear,
    team.women,
    tableSeriesArray
  )
  const tables = await getTeamSeasonTables(
    seasonYear,
    team.women,
    tableSeriesArray
  )

  const returnGames = getSeasonGames(games, series)

  const firstSeason = await TeamSeason.findOne({
    where: { teamId },
    order: [['seasonId', 'asc']],
    limit: 1,
    attributes: [],
    include: [{ model: Season, attributes: ['year'] }],
  }).then((season) => {
    if (season?.season.year.includes('/')) {
      return {
        year: season.season.year,
        seasonId: parseInt(season.season.year.split('/')[1]),
      }
    } else if (season?.season.year) {
      return {
        year: season.season.year,
        seasonId: parseInt(season.season.year),
      }
    }
  })
  const lastSeason = await TeamSeason.findOne({
    where: { teamId },
    order: [['seasonId', 'desc']],
    limit: 1,
    attributes: [],
    include: [{ model: Season, attributes: ['year'] }],
  }).then((season) => {
    if (season?.season.year.includes('/')) {
      return {
        year: season.season.year,
        seasonId: parseInt(season.season.year.split('/')[1]),
      }
    } else if (season?.season.year) {
      return {
        year: season.season.year,
        seasonId: parseInt(season.season.year),
      }
    }
  })

  const nextSeason = await TeamSeason.findOne({
    where: { teamId, seasonId: { [Op.gt]: season.seasonId } },
    order: [['seasonId', 'asc']],
    limit: 1,
    attributes: [],
    include: [{ model: Season, attributes: ['year'] }],
  }).then((season) => {
    if (season?.season.year.includes('/')) {
      return {
        year: season.season.year,
        seasonId: parseInt(season.season.year.split('/')[1]),
      }
    } else if (season?.season.year) {
      return {
        year: season.season.year,
        seasonId: parseInt(season.season.year),
      }
    }
  })

  const previousSeason = await TeamSeason.findOne({
    where: { teamId, seasonId: { [Op.lt]: season.seasonId } },
    order: [['seasonId', 'desc']],
    limit: 1,
    attributes: [],
    include: [{ model: Season, attributes: ['year'] }],
  }).then((season) => {
    if (season?.season.year.includes('/')) {
      return {
        year: season.season.year,
        seasonId: parseInt(season.season.year.split('/')[1]),
      }
    } else if (season?.season.year) {
      return {
        year: season.season.year,
        seasonId: parseInt(season.season.year),
      }
    }
  })

  res.status(200).json({
    firstSeason,
    lastSeason,
    nextSeason,
    previousSeason,
    team,
    seasonYear,
    games: returnGames,
    series,
    tables,
    staticTables,
    hasGames,
  })
}) as RequestHandler)

singleTeamRouter.get('/:teamId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const teamId = teamIdChecker.parse(req.params.teamId)

  res.locals.origin = 'GET Single Team router'
  const team = await Team.findByPk(teamId, {
    include: [
      {
        model: Season,
        attributes: ['year', 'seasonId'],
        through: {
          attributes: ['qualification'],
        },
        as: 'seasonteam',
      },
      County,
      Municipality,
    ],
    order: [[{ model: Season, as: 'seasonteam' }, 'seasonId', 'DESC']],
  })

  if (!team || teamId === 176) {
    throw new NotFoundError({
      code: 404,
      message: 'Inget sådant lag finns.',
      logging: false,
      context: { origin: 'GET Single Team Router' },
    })
  }

  const allSeasons = await TeamSeason.findAndCountAll({
    where: { teamId },
    attributes: ['teamId', 'seasonId'],
    include: [{ model: Season, attributes: ['year', 'seasonId'] }],
    order: [['seasonId', 'asc']],
  })

  const strings = await getStrings({ team, allSeasons })

  const tables = await getTables({
    teamId,
    seasonIdArray: allSeasons.rows.map((season) => season.seasonId),
  })

  const streaks = await getStreaks({ teamId })

  const sortedFiveSeasons = await getLatestFiveSeasons({
    teamId,
  })

  const chartData = await getChartData({ team })

  res.json({
    seasonString: strings.seasonString,
    team,
    tables,
    streaks,
    finalsAndWinsString: strings.finalsAndWinsString,
    playoffCountString: strings.playoffCountString,
    sortedFiveSeasons,
    barChartData: chartData.barChartData,
    chartDataLength: chartData.chartDataLength,
    renderData: chartData.renderData,
  })
}) as RequestHandler)

export default singleTeamRouter
