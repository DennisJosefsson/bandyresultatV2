import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application, NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectToDb } from './index.js'
import { errorHandler } from './middleware/errors/errorhandler.js'
import NotFoundError from './middleware/errors/NotFoundError.js'
import { routeArray } from './routes.js'
dotenv.config()

const app: Application = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173', 'http://localhost:8081'],
  })
)
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
  next()
})


const __filename = fileURLToPath(import.meta.url).replace('/utils', '')
const __dirname = path.dirname(__filename)
const frontend = path.join(__dirname, 'dist')

app.use('/', express.static(frontend))

app.get('/healthcheck', (_req: Request, res: Response) => {
  console.log('Mode:', process.env.NODE_ENV)
  res.status(200).send({ message: 'Hello world!' })
})

routeArray.forEach((route) => app.use(route.path, route.router))
app.use('/api/*', (_req: Request, _res: Response) => {
  throw new NotFoundError({
    code: 404,
    message: 'Sidan finns inte.',
    logging: false,
    context: { origin: 'API Root' },
  })
})
app.use((_req, res, _next) => {
  res.sendFile(path.join(frontend, 'index.html'))
})
app.use(errorHandler)

const startDB: () => Promise<void> = async () => {
  await connectToDb()
}

startDB()
  .then(() => {})
  .catch((err) => console.error(err))

export default app
