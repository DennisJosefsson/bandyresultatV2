import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import County from '../../models/County.js'
import Municipality from '../../models/Municipality.js'
import Season from '../../models/Season.js'
import Team from '../../models/Team.js'
import TeamSeason from '../../models/TeamSeason.js'
import NotFoundError from '../../utils/middleware/errors/NotFoundError.js'
import { teamIdChecker } from '../../utils/postFunctions/teamRequest.js'
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
