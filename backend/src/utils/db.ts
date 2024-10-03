import dotenv from 'dotenv'
import path from 'path'
import { Sequelize } from 'sequelize-typescript'
import { fileURLToPath } from 'url'
import BandyError from '../models/BandyError.js'
import County from '../models/County.js'
import Game from '../models/Game.js'
import Link from '../models/Link.js'
import Metadata from '../models/Metadata.js'
import Municipality from '../models/Municipality.js'
import Season from '../models/Season.js'
import Serie from '../models/Serie.js'
import TableSeason from '../models/TableSeason.js'
import Team from '../models/Team.js'
import TeamGame from '../models/TeamGame.js'
import TeamSeason from '../models/TeamSeason.js'
import TeamTable from '../models/TeamTable.js'
import User from '../models/User.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pemPath = path.join(__dirname, '/pem/ca.pem')
const caString = `&sslrootcert=${pemPath}`

let dbUrl: string

switch (process.env.NODE_ENV) {
  case 'development':
    dbUrl = process.env.DEVELOPMENT_URL as string
    break
  case 'test':
    dbUrl = process.env.TESTDBURL as string

    break
  default:
    dbUrl = process.env.PRODUCTION_URL + caString
}

export const sequelize = new Sequelize(dbUrl, {
  omitNull: true,
  attributeBehavior: 'escape',
  logging: false,
  models: [
    BandyError,
    Season,
    Game,
    County,
    Municipality,
    Team,
    TeamGame,
    TeamSeason,
    TeamTable,
    TableSeason,
    Serie,
    Metadata,
    User,
    Link,
  ],
})
