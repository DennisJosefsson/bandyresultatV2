import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import { Op, QueryTypes } from 'sequelize'
import { z } from 'zod'
import Game from '../../models/Game.js'
import Season from '../../models/Season.js'
import Serie from '../../models/Serie.js'
import Team from '../../models/Team.js'
import { sequelize } from '../../utils/db.js'
import NotFoundError from '../../utils/middleware/errors/NotFoundError.js'
import {
  animationData,
  gameSortFunction,
  subGroupAnimationData,
} from '../../utils/postFunctions/animationData.js'
import seasonIdCheck from '../../utils/postFunctions/seasonIdCheck.js'

const animationRouter = Router()

const getTime = (date?: Date): number => {
  return date != null ? date.getTime() : 0
}

const parseWomen = z.enum(['true', 'false']).catch('false')

const parseGroup = z.string()

const parseTeamArray = z.array(
  z
    .object({
      casual_name: z.string(),
      team_id: z.number(),
    })
    .transform((object) => ({
      casualName: object.casual_name,
      teamId: object.team_id,
    }))
)

animationRouter.get('/subanimation/:seasonId/:group', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonYear = seasonIdCheck.parse(req.params.seasonId)
  const parsedSeasonId = parseInt(req.params.seasonId)
  const group = parseGroup.parse(req.params.group)
  const women = parseWomen.parse(req.query.women)

  const getSeason = await Season.findOne({
    where: {
      year: { [Op.eq]: seasonYear },
      women: women === 'true' ? true : false,
    },
  })
  const seasonId = getSeason?.get('seasonId')
  if (!seasonId) {
    throw new NotFoundError({
      code: 404,
      message: 'Säsong finns ej',
      logging: false,
      context: { origin: 'GET Group Animation Data' },
    })
  }

  const serie = await Serie.findOne({
    where: {
      serieCategory: ['regular', 'qualification'],
      serieGroupCode: group,
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

  if (!serie) {
    throw new NotFoundError({
      code: 404,
      message: 'Grupp finns ej',
      logging: false,
      context: { origin: 'GET Group Animation Data' },
    })
  }

  const getTeams = await sequelize.query(
    `select distinct t2.team_id, casual_name from teamseries t
join teams t2 on t2.team_id = t.team_id 
join series s on s.serie_id = t.serie_id 
where s.season_id = $seasonId and s.serie_group_code = any($group);
  `,
    {
      bind: { seasonId: seasonId, group: [group, 'mix'] },
      type: QueryTypes.SELECT,
    }
  )

  const teams = parseTeamArray.parse(getTeams)

  const games = await Game.findAll({
    where: { seasonId, group: [group, 'mix'] },
    include: [
      {
        model: Season,
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
      series: serie,
    })
  }

  if (seasonYear && ['1933', '1937'].includes(seasonYear)) {
    const getTeams = await sequelize.query(
      `select distinct t2.team_id, casual_name from teamseries t
join teams t2 on t2.team_id = t.team_id 
join series s on s.serie_id = t.serie_id 
where s.season_id = $seasonId;
  `,
      {
        bind: { seasonId: seasonId, group: [group, 'mix'] },
        type: QueryTypes.SELECT,
      }
    )

    const teams = parseTeamArray.parse(getTeams)
    const excludeTeams =
      seasonYear === '1933' ? [5, 31, 57, 29] : [5, 64, 57, 17]
    const groupName = seasonYear === '1933' ? 'Div' : 'Avd'
    const games = await Game.findAll({
      where: { seasonId, category: 'regular' },
      include: [
        {
          model: Season,
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

    const regularGames = gameSortFunction(
      games.filter((game) => game.result !== null)
    )

    const animationArray = subGroupAnimationData(
      regularGames,
      teams,
      serie,
      parsedSeasonId
    )

    const gameArray = regularGames
      .filter((gameGroup) => gameGroup.group === group)
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

    return res.status(200).json({
      games: gameArray,
      length: gameArray.length,
      series: serie,
    })
  }

  const regularGames = gameSortFunction(
    games.filter((game) => game.result !== null)
  )

  const animationArray = subGroupAnimationData(
    regularGames,
    teams,
    serie,
    parsedSeasonId
  )

  const gameArray = regularGames
    .filter((gameGroup) => gameGroup.group === group)
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
    series: serie,
  })
}) as RequestHandler)

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
