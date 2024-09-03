import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import { Op } from 'sequelize'
import Game from '../../models/Game.js'
import Season from '../../models/Season.js'
import Serie from '../../models/Serie.js'
import Team from '../../models/Team.js'
import seasonIdCheck from '../../utils/postFunctions/seasonIdCheck.js'
//import TeamSeason from '../../models/TeamSeason.js'
import { z } from 'zod'
import {
  animationData,
  gameSortFunction,
} from '../../utils/postFunctions/animationData.js'

const animationRouter = Router()

const getTime = (date?: Date): number => {
  return date != null ? date.getTime() : 0
}

const parseWomen = z.enum(['true', 'false']).catch('false')

animationRouter.get('/animation/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonYear = seasonIdCheck.parse(req.params.seasonId)
  const parsedSeasonId = parseInt(req.params.seasonId)
  const women = parseWomen.parse(req.query.women)

  const series = await Serie.findAll({
    where: { serieCategory: 'regular' },
    include: [
      {
        model: Season,
        where: { year: seasonYear, women: women === 'true' ? true : false },
      },
    ],
    raw: true,
    nest: true,
  })

  const teams = await Team.findAll({
    where: {
      '$seasonteam.year$': seasonYear,
      '$seasonteam.teamseason.qualification$': { [Op.not]: true },
      '$seasonteam.women$': women === 'true' ? true : false,
    },
    include: [
      {
        model: Season,
        as: 'seasonteam',
      },
    ],
    raw: true,
    nest: true,
  })

  const games = await Game.findAll({
    where: { category: 'regular' },
    include: [
      {
        model: Season,
        where: {
          year: { [Op.eq]: seasonYear },
          women: women === 'true' ? true : false,
        },
      },
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
    order: [
      ['group', 'ASC'],
      ['date', 'ASC'],
    ],
    raw: true,
    nest: true,
  })
  if (!games || games.length === 0) {
    res.status(200).json({
      games: [],
      length: 0,
      series: series,
    })
  }

  if (seasonYear && ['1933', '1937'].includes(seasonYear)) {
    const excludeTeams =
      seasonYear === '1933' ? [5, 31, 57, 29] : [5, 64, 57, 17]
    const groupName = seasonYear === '1933' ? 'Div' : 'Avd'
    const selectedGames = games.filter((game) => {
      if (
        game.group.includes(groupName) &&
        !excludeTeams.includes(game.homeTeamId) &&
        !excludeTeams.includes(game.awayTeamId)
      )
        return true
      return false
    })

    const newGameArray = selectedGames.map((game) => {
      let newGroup: string
      switch (game.group) {
        case 'AvdA':
        case 'AvdB':
        case 'Div1NorrA':
        case 'Div1NorrB':
          newGroup = 'NedflyttningNorr'
          break
        case 'AvdC':
        case 'AvdD':
        case 'Div1SydA':
        case 'Div1SydB':
          newGroup = 'NedflyttningSyd'
          break
        default:
          newGroup = ''
      }

      return { ...game, group: newGroup }
    })
    newGameArray.forEach((game) => games.push(game as Game))
    games.sort((a, b) => getTime(new Date(a.date)) - getTime(new Date(b.date)))
  }

  const teamArray = teams
    ? teams.map((team) => {
        return {
          casualName: team.casualName,
          teamId: team.teamId,
        }
      })
    : []

  const regularGames = gameSortFunction(
    games.filter((game) => game.result !== null)
  )

  const animationArray = animationData(
    regularGames,
    teamArray,
    series,
    parsedSeasonId
  )

  const gameArray = regularGames
    .filter((group) => group.group !== 'mix')
    .map((group) => {
      const animationObject = animationArray.find(
        (aniGroup) => aniGroup.group === group.group
      )
      if (
        !animationObject ||
        !animationObject.serieName ||
        !animationObject.tables
      ) {
        throw new Error('Missing data from Animation')
      }
      return {
        group: group.group,
        serieName: animationObject.serieName,
        dates: group.dates.map((date) => {
          const tableObject = animationObject.tables.find(
            (tableDate) => tableDate.date === date.date
          )
          if (!tableObject || !tableObject.table) {
            throw new Error('Missing table data from Animation')
          }
          return {
            date: date.date,
            games: [...date.games],
            table: tableObject.table,
          }
        }),
      }
    })

  res.status(200).json({
    games: gameArray,
    length: gameArray.length,
    series: series,
  })
}) as RequestHandler)

export default animationRouter
