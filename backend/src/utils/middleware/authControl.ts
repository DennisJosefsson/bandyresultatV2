import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { z } from 'zod'
import { userForAdmin } from '../../models/User.js'
import LoginError from './errors/LoginError.js'
dotenv.config()

const checkString = z.string()

const secret: Secret = checkString.parse(
  process.env.JWT_SECRET
)

const authControl = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.headers.auth) {
    try {
      const token =
        typeof req.headers.auth === 'string' &&
        req.headers.auth.split(' ')[1]

      const decodedToken =
        token && jwt.verify(token, secret)

      const decoded = userForAdmin.parse(decodedToken)

      if (!decoded.admin) {
        throw new LoginError({
          code: 401,
          message: 'Unauthorized',
          logging: false,
          context: { origin: 'Authcontrol' },
        })
      }
      console.log('authorized')
      next()
    } catch (error) {
      next(error)
    }
  } else {
    try {
      if (!req.cookies.bandykaka) {
        throw new LoginError({
          code: 401,
          message: 'No cookie',
          logging: false,
          context: { origin: 'Authcontrol' },
        })
      }
      const token = req.cookies.bandykaka as string

      if (!secret) {
        throw new LoginError({
          code: 401,
          message: 'Missing auth config',
          logging: false,
          context: { origin: 'Authcontrol' },
        })
      }

      const decodedToken = jwt.verify(token, secret)

      const decoded = userForAdmin.parse(decodedToken)

      if (!decoded.admin) {
        throw new LoginError({
          code: 401,
          message: 'Unauthorized',
          logging: false,
          context: { origin: 'Authcontrol' },
        })
      }
      console.log('authorized')
      next()
    } catch (error) {
      next(error)
    }
  }
}

export default authControl
