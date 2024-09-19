import { Request, RequestHandler, Response, Router } from 'express'
import County from '../models/County.js'

const countyRouter = Router()

countyRouter.get('/', (async (_req: Request, res: Response) => {
  const counties = await County.findAll()

  res.status(200).json(counties)
}) as RequestHandler)

export default countyRouter
