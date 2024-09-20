import { Request, RequestHandler, Response, Router } from 'express'
import Municipality from '../models/Municipality.js'
import IDCheck from '../utils/postFunctions/IDCheck.js'

const municipalityRouter = Router()

municipalityRouter.get('/:countyId', (async (req: Request, res: Response) => {
  const countyId = IDCheck.parse(req.params.countyId)
  const municipalities = await Municipality.findAll({
    where: { countyId: countyId },
  })

  res.status(200).json(municipalities)
}) as RequestHandler)

export default municipalityRouter
