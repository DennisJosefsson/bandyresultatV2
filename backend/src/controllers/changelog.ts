import dotenv from 'dotenv'
import { Request, RequestHandler, Response, Router } from 'express'
import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const changelogPath = path.join(__dirname, '../changelog/test.md')
console.log(changelogPath)

const changelogRouter = Router()

changelogRouter.get('/', (async (_req: Request, res: Response) => {
  const file = await readFile(changelogPath)
  res.json({ changelog: file.toString() })
}) as RequestHandler)

export default changelogRouter
