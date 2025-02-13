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
import TeamGame from '../../models/TeamGame.js'
import NotFoundError from '../../utils/middleware/errors/NotFoundError.js'
import newGameEntry, {
  simpleGameData,
} from '../../utils/postFunctions/newGameEntry.js'
import seasonIdCheck from '../../utils/postFunctions/seasonIdCheck.js'

import { z } from 'zod'
import { getSeasonGames } from '../../utils/postFunctions/getSeasonGames.js'
import IDCheck from '../../utils/postFunctions/IDCheck.js'
import {
  newTeamGameAwayEntry,
  newTeamGameHomeEntry,
} from '../../utils/postFunctions/newTeamGameEntry.js'
import { parseNumber } from '../../utils/postFunctions/parsers.js'

import authControl from '../../utils/middleware/authControl.js'

const gameRouter = Router()

gameRouter.get('/', (async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const games = await Game.findAll({
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
  })
  if (!games || games.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'Inga matcher hittade.',
      logging: false,
      context: { origin: 'GET All Games Router' },
    })
  }
  res.status(200).json(games)
}) as RequestHandler)

const parseWomen = z.enum(['true', 'false']).catch('false')

const parseGroupCode = z.string()

gameRouter.get('/subseason/:seasonId/:group', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonYear = seasonIdCheck.parse(req.params.seasonId)
  const groupCode = parseGroupCode.parse(req.params.group)
  const women = parseWomen.parse(req.query.women)

  const games = await Game.findAll({
    where: {
      women: women === 'true' ? true : false,
      group: { [Op.eq]: groupCode },
    },
    include: [
      {
        model: Season,
        where: { year: { [Op.eq]: seasonYear } },
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

  const season = await Season.findAll({
    where: { year: seasonYear, women: women === 'true' ? true : false },
    raw: true,
    nest: true,
  })

  const series = await Serie.findAll({
    where: { serieGroupCode: { [Op.eq]: groupCode } },
    include: [
      {
        model: Season,
        where: {
          year: { [Op.eq]: seasonYear },
          women: women === 'true' ? true : false,
        },
      },
    ],
  })

  const returnGames = getSeasonGames(games, season, series, true)

  res.status(200).json({ ...returnGames })
}) as RequestHandler)

gameRouter.get('/season/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonYear = seasonIdCheck.parse(req.params.seasonId)
  const women = parseWomen.parse(req.query.women)

  const lowerLevel = await Game.findOne({
    where: { women: women === 'true' },
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

  const hasLowerLevel = lowerLevel ? true : false

  const games = await Game.findAll({
    where: { women: women === 'true' ? true : false },
    include: [
      {
        model: Season,
        where: { year: { [Op.eq]: seasonYear } },
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
      { model: Serie, where: { level: 1 } },
    ],
    order: [
      ['group', 'ASC'],
      ['date', 'ASC'],
    ],
    raw: true,
    nest: true,
  })

  const season = await Season.findAll({
    where: { year: seasonYear, women: women === 'true' ? true : false },
    raw: true,
    nest: true,
  })

  const series = await Serie.findAll({
    include: [
      {
        model: Season,
        where: {
          year: { [Op.eq]: seasonYear },
          women: women === 'true' ? true : false,
        },
      },
    ],
  })

  const returnGames = getSeasonGames(games, season, series)

  res.status(200).json({ ...returnGames, hasLowerLevel })
}) as RequestHandler)

gameRouter.get('/:gameId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'GET Single Game router'
  const gameId = IDCheck.parse(req.params.gameId)

  const game = await Game.findByPk(gameId)
  if (!game) {
    throw new NotFoundError({
      code: 404,
      message: 'No such game',
      logging: false,
      context: { origin: 'Single Game Router' },
    })
  }
  res.status(200).json(game)
}) as RequestHandler)

gameRouter.post('/', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let serieId: number
  const introData = simpleGameData.parse(req.body)
  if (!req.body.serieId) {
    const serie = await Serie.findOne({
      where: { seasonId: introData.seasonId, serieGroupCode: introData.group },
      raw: true,
      nest: true,
    })

    if (!serie) {
      throw new NotFoundError({
        code: 404,
        message: 'No such serie',
        logging: true,
        context: { origin: 'POST New Game Router' },
      })
    }

    serieId = z.coerce.number().parse(serie.serieId)
  } else {
    serieId = z.coerce.number().parse(req.body.serieId)
  }

  const currChamp = await TeamGame.findOne({
    where: { currInoffChamp: true, women: introData.women || false },
    order: [['date', 'desc']],
    limit: 1,
  })

  let currInoffChamp: number | null
  if (!currChamp) {
    currInoffChamp = null
  } else {
    currInoffChamp = parseNumber(currChamp.teamId)
  }

  const newGameObject = newGameEntry(req.body, serieId)
  const [game] = await Game.upsert({ ...newGameObject })
  if (!game) {
    throw new NotFoundError({
      code: 404,
      message: 'No game',
      logging: false,
      context: { origin: 'POST Game Router' },
    })
  }

  if (!game.homeTeamId || !game.awayTeamId) {
    res.status(201).json(game)
  }

  const gameId = parseNumber(game.gameId)

  let homeTeamGame
  let awayTeamGame
  const homeTeamGameData = newTeamGameHomeEntry(game, currInoffChamp)
  const awayTeamGameData = newTeamGameAwayEntry(game, currInoffChamp)
  const teamGames = await TeamGame.findAll({
    where: { gameId: gameId },
    raw: true,
    nest: true,
  })

  if (teamGames.length === 0) {
    homeTeamGame = await TeamGame.create({
      ...homeTeamGameData,
    })
    awayTeamGame = await TeamGame.create({
      ...awayTeamGameData,
    })
  } else {
    const homeGame = teamGames.find((teamgame) => teamgame.homeGame === true)

    const awayGame = teamGames.find((teamgame) => teamgame.homeGame === false)
    if (!homeGame || !awayGame) {
      throw new NotFoundError({
        code: 404,
        message: 'No teamgames',
        logging: false,
        context: { origin: 'POST Game Router' },
      })
    }

    homeTeamGame = await TeamGame.upsert({
      teamGameId: homeGame.teamGameId,

      ...homeTeamGameData,
    })
    awayTeamGame = await TeamGame.upsert({
      teamGameId: awayGame.teamGameId,

      ...awayTeamGameData,
    })
  }
  res.status(201).json({ game, homeTeamGame, awayTeamGame })
}) as RequestHandler)

gameRouter.delete('/:gameId', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'DELETE Game router'
  const gameId = IDCheck.parse(req.params.gameId)
  const teamGames = await TeamGame.findAll({
    where: { gameId: gameId },
  })
  if (teamGames.length > 0) {
    await TeamGame.destroy({ where: { gameId: gameId } })
  }
  const game = await Game.findByPk(gameId)
  if (!game) {
    throw new NotFoundError({
      code: 404,
      message: 'No such game',
      logging: false,
      context: { origin: 'Delete Game Router' },
    })
  } else {
    await game.destroy()
    res.json({ message: 'Game deleted' })
  }
}) as RequestHandler)

export default gameRouter
