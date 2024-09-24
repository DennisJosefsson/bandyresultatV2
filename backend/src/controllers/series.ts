import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import Serie from '../models/Serie.js'
import authControl from '../utils/middleware/authControl.js'
import NotFoundError from '../utils/middleware/errors/NotFoundError.js'
import IDCheck from '../utils/postFunctions/IDCheck.js'
import newSeriesEntry from '../utils/postFunctions/newSeriesEntry.js'

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

seriesRouter.get('/:serieId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'GET Single Game router'
  const serieId = IDCheck.parse(req.params.serieId)

  const game = await Serie.findByPk(serieId)
  if (!game) {
    throw new NotFoundError({
      code: 404,
      message: 'No such serie',
      logging: false,
      context: { origin: 'Single Serie Router' },
    })
  }
  res.status(200).json(game)
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
