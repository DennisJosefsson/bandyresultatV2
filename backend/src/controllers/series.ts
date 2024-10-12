import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import { Op } from 'sequelize'
import { z } from 'zod'
import Game from '../models/Game.js'
import Season from '../models/Season.js'
import Serie from '../models/Serie.js'
import authControl from '../utils/middleware/authControl.js'
import NotFoundError from '../utils/middleware/errors/NotFoundError.js'
import IDCheck from '../utils/postFunctions/IDCheck.js'
import newSeriesEntry from '../utils/postFunctions/newSeriesEntry.js'
import seasonIdCheck from '../utils/postFunctions/seasonIdCheck.js'

const seriesRouter = Router()

seriesRouter.get('/', (async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const series = await Serie.findAll()
  if (!series || series.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No series',
      logging: false,
      context: { origin: 'GET All series Router' },
    })
  }
  res.status(200).json(series)
}) as RequestHandler)

const parseSubParam = z.object({
  women: z.enum(['true', 'false']).catch('false'),
})

seriesRouter.get('/development/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'GET Single Serie router'
  const seasonYear = seasonIdCheck.parse(req.params.seasonId)
  const { women } = parseSubParam.parse(req.query)

  const series = await Serie.findAll({
    where: { serieCategory: ['regular', 'qualification'] },
    include: [
      {
        model: Season,
        where: {
          year: { [Op.eq]: seasonYear },
          women: women === 'true' ? true : false,
        },
      },
    ],
    raw: true,
    nest: true,
  })
  if (!series || series.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No sub series',
      logging: false,
      context: { origin: 'Single Sub Serie Router' },
    })
  }

  const seriesIdArray = series.map((serie) => serie.serieId!)

  const games = await Game.findAll({
    where: { serieId: seriesIdArray, played: true },
    raw: true,
    nest: true,
  })

  const gameSerieIdArray = games.map((game) => game.serieId)

  const gameSeries = series.filter((serie) =>
    gameSerieIdArray.includes(serie.serieId!)
  )

  res.status(200).json({ gameSeries })
}) as RequestHandler)

seriesRouter.get('/subseason/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'GET Single Serie router'
  const seasonYear = seasonIdCheck.parse(req.params.seasonId)
  const { women } = parseSubParam.parse(req.query)

  const series = await Serie.findAll({
    where: { level: { [Op.gt]: 1 } },
    include: [
      {
        model: Season,
        where: {
          year: { [Op.eq]: seasonYear },
          women: women === 'true' ? true : false,
        },
      },
    ],
    raw: true,
    nest: true,
  })
  if (!series || series.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No sub series',
      logging: false,
      context: { origin: 'Single Sub Serie Router' },
    })
  }

  const seriesIdArray = series.map((serie) => serie.serieId!)

  const games = await Game.findAll({
    where: { serieId: seriesIdArray },
    raw: true,
    nest: true,
  })

  const gameSerieIdArray = games.map((game) => game.serieId)

  const gameSeries = series.filter((serie) =>
    gameSerieIdArray.includes(serie.serieId!)
  )

  res.status(200).json({ gameSeries, allSeries: series })
}) as RequestHandler)

seriesRouter.get('/:serieId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'GET Single Serie router'
  const serieId = IDCheck.parse(req.params.serieId)

  const serie = await Serie.findByPk(serieId)
  if (!serie) {
    throw new NotFoundError({
      code: 404,
      message: 'No such serie',
      logging: false,
      context: { origin: 'Single Serie Router' },
    })
  }
  res.status(200).json(serie)
}) as RequestHandler)

seriesRouter.post('/', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seriesObject = newSeriesEntry(req.body)
  const serie = await Serie.upsert(seriesObject)
  res.status(201).json(serie)
}) as RequestHandler)

export default seriesRouter
