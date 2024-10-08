import dayjs from 'dayjs'
import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import { Op, Order } from 'sequelize'
import Game from '../../models/Game.js'
import Season from '../../models/Season.js'
import Team from '../../models/Team.js'
import TeamGame from '../../models/TeamGame.js'
import { sequelize } from '../../utils/db.js'
import NotFoundError from '../../utils/middleware/errors/NotFoundError.js'
import SearchError from '../../utils/middleware/errors/SearchError.js'
import { parseSearchRequest } from '../../utils/postFunctions/gameRequest.js'
import seasonIdCheck from '../../utils/postFunctions/seasonIdCheck.js'

const searchRouter = Router()

searchRouter.post('/search', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'POST Search router'

  const maxSeason = await Season.findOne({
    order: [['seasonId', 'desc']],
    limit: 1,
    raw: true,
    nest: true,
  })

  const searchParams = parseSearchRequest(req.body, maxSeason)

  let goalDifference
  let goalsScored
  let goalsConceded
  let inputDate
  let homeGame
  let teamId
  let opponentId
  let win
  let draw
  let lost
  let women

  const startSeasonName = seasonIdCheck.parse(searchParams.startSeason)
  const endSeasonName = seasonIdCheck.parse(searchParams.endSeason)

  const defaultInclude = [
    {
      model: Team,
      attributes: ['name', 'casualName', 'shortName'],
      as: 'team',
    },
    {
      model: Team,
      attributes: ['name', 'casualName', 'shortName'],
      as: 'opponent',
    },
    { model: Game, attributes: ['result'] },
    {
      model: Season,
      where: {
        year: {
          [Op.and]: {
            [Op.gte]: startSeasonName,
            [Op.lte]: endSeasonName,
          },
        },
      },
      attributes: ['year', 'seasonId'],
    },
  ]

  const order: Order = [['date', searchParams.order]]

  if (searchParams.teamId && searchParams.teamId) {
    teamId = searchParams.teamId
  }

  if (searchParams.opponentId && searchParams.opponentId) {
    opponentId = searchParams.opponentId
  }

  if (searchParams.inputDate) {
    const month = searchParams.inputDate.split('/')[1]
    const day = searchParams.inputDate.split('/')[0]
    if (month === '2' && Number(day) > 29) {
      throw new SearchError({
        code: 400,
        message: 'Felaktigt datum:' + searchParams.inputDate,
        logging: false,
        context: { origin: 'POST Search Router' },
      })
    } else if (['4', '6', '9', '11'].includes(month) && Number(day) > 30) {
      throw new SearchError({
        code: 400,
        message: 'Felaktigt datum: ' + searchParams.inputDate,
        logging: false,
        context: { origin: 'POST Search Router' },
      })
    }
    const date = '2024-' + month + '-' + day

    if (!dayjs(date, 'YYYY-M-D', true).isValid()) {
      throw new SearchError({
        code: 400,
        message: 'Felaktigt datum: ' + searchParams.inputDate,
        logging: false,
        context: { origin: 'POST Search Router' },
      })
    } else {
      inputDate = [
        sequelize.fn('extract(month from game."date") =', month),
        sequelize.fn('extract(day from game."date") =', day),
      ]
    }
  }

  if (searchParams.goalDiff || searchParams.goalDiff === 0) {
    if (searchParams.goalDiffOperator === 'gte') {
      goalDifference = { [Op.gte]: searchParams.goalDiff }
    } else if (searchParams.goalDiffOperator === 'eq') {
      goalDifference = { [Op.eq]: searchParams.goalDiff }
    } else if (searchParams.goalDiffOperator === 'lte') {
      goalDifference = {
        [Op.and]: { [Op.lte]: searchParams.goalDiff, [Op.gte]: 0 },
      }
    }
  }

  if (searchParams.goalsScored || searchParams.goalsScored === 0) {
    if (searchParams.goalsScoredOperator === 'gte') {
      goalsScored = { [Op.gte]: searchParams.goalsScored }
    } else if (searchParams.goalsScoredOperator === 'eq') {
      goalsScored = { [Op.eq]: searchParams.goalsScored }
    } else if (searchParams.goalsScoredOperator === 'lte') {
      goalsScored = {
        [Op.and]: { [Op.lte]: searchParams.goalsScored, [Op.gte]: 0 },
      }
    }
  }

  if (searchParams.goalsConceded || searchParams.goalsConceded === 0) {
    if (searchParams.goalsConcededOperator === 'gte') {
      goalsConceded = { [Op.gte]: searchParams.goalsConceded }
    } else if (searchParams.goalsConcededOperator === 'eq') {
      goalsConceded = { [Op.eq]: searchParams.goalsConceded }
    } else if (searchParams.goalsConcededOperator === 'lte') {
      goalsConceded = {
        [Op.and]: { [Op.lte]: searchParams.goalsConceded, [Op.gte]: 0 },
      }
    }
  }

  if (searchParams.orderVar === 'goalDifference' && searchParams.order) {
    order.unshift(['goalDifference', searchParams.order])
  }

  if (searchParams.orderVar === 'totalGoals' && searchParams.order) {
    order.unshift(['totalGoals', searchParams.order])
  }

  if (searchParams.orderVar === 'goalsScored' && searchParams.order) {
    order.unshift(['goalsScored', searchParams.order])
  }

  if (searchParams.orderVar === 'goalsConceded' && searchParams.order) {
    order.unshift(['goalsConceded', searchParams.order])
  }

  if (searchParams.homeGame === 'home') {
    homeGame = true
  }

  if (searchParams.homeGame === 'away') {
    homeGame = false
  }

  if (searchParams.gameResult === 'win') {
    win = true
  }

  if (searchParams.gameResult === 'draw') {
    draw = true
  }

  if (searchParams.gameResult === 'lost') {
    lost = true
  }

  if (searchParams.selectedGender === 'men' && !searchParams.teamId) {
    women = false
  }

  if (searchParams.selectedGender === 'women' && !searchParams.teamId) {
    women = true
  }
  let resultGame
  if (searchParams.result && searchParams.teamId) {
    goalsScored = Number(searchParams.result.split('-')[0])
    goalsConceded = Number(searchParams.result.split('-')[1])
  } else if (searchParams.result) {
    resultGame = {
      model: Game,
      where: { result: searchParams.result },
      attributes: ['result'],
    }
  }

  const include = resultGame
    ? [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'opponent',
        },
        resultGame,
        {
          model: Season,
          where: {
            year: {
              [Op.and]: {
                [Op.gte]: startSeasonName,
                [Op.lte]: endSeasonName,
              },
            },
          },
          attributes: ['year', 'seasonId'],
        },
      ]
    : defaultInclude

  const where = {
    category: searchParams.categoryArray,
    played: true,
    ...(inputDate && { [Op.and]: inputDate }),
    ...(teamId && { teamId: teamId }),
    ...(opponentId && { opponentId: opponentId }),
    ...(goalDifference && { goalDifference: goalDifference }),
    ...(goalsScored && { goalsScored: goalsScored }),
    ...(goalsConceded && { goalsConceded: goalsConceded }),
    ...(win && { win: win }),
    ...(draw && { draw: draw }),
    ...(lost && { lost: lost }),
    ...(women && { women: women }),
    ...(homeGame && { homeGame: homeGame }),
  }

  const unfilteredSearchResult = await TeamGame.findAndCountAll({
    where,
    include,
    limit: 100,
    order,
    raw: true,
    nest: true,
  })

  if (unfilteredSearchResult.count === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'Hittade ingen match som matchade sökningen.',
      logging: false,
      context: { origin: 'POST Search Router' },
    })
  }

  const gameIdArray: number[] = []

  const searchResult = unfilteredSearchResult.rows
    .map((game) => {
      if (!gameIdArray.includes(game.gameId)) {
        gameIdArray.push(game.gameId)
        return game
      }
      return
    })
    .filter((game) => game !== undefined)
    .slice(0, searchParams.limit)

  res.status(200).json({
    searchResult,
  })
}) as RequestHandler)

export default searchRouter
