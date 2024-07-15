import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application, NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectToDb } from './index.js'
import { errorHandler } from './middleware/errors/errorhandler.js'
import { routeArray } from './routes.js'
dotenv.config()

const app: Application = express()

app.use(express.json())
app.use(cors({ credentials: true }))
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
  next()
})

app.use(cookieParser())
const __filename = fileURLToPath(import.meta.url).replace('/utils', '')
const __dirname = path.dirname(__filename)
const frontend = path.join(__dirname, 'dist')

app.use('/', express.static(frontend))

app.get('/healthcheck', (_req: Request, res: Response) => {
  console.log('Mode:', process.env.NODE_ENV)
  res.status(200).send({ message: 'Hello world!' })
})

routeArray.forEach((route) => app.use(route.path, route.router))
app.use(errorHandler)

const startDB: () => Promise<void> = async () => {
  await connectToDb()
}

startDB()
  .then(() => {})
  .catch((err) => console.error(err))

export default app
