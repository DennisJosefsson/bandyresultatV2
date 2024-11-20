import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import authControl from '../../utils/middleware/authControl.js'

const nativeRouter = Router()

nativeRouter.get('/nativeCookie', authControl, ((
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(req.cookies)
  res.status(200).json({ message: 'Cookie works!' })
}) as RequestHandler)

export default nativeRouter
