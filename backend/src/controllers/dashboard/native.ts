import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import authControl from '../../utils/middleware/authControl.js'
import Season from '../../models/Season.js'
import Serie from '../../models/Serie.js'
import IDCheck from '../../utils/postFunctions/IDCheck.js'
import Game from '../../models/Game.js'
import Team from '../../models/Team.js'

const nativeRouter = Router()

nativeRouter.get('/nativeCookie', authControl, ((
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(req.cookies)
  res.status(200).json({ message: 'Cookie works!' })
}) as RequestHandler)



nativeRouter.get('/native/season/:seasonId',  (async(
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonId = IDCheck.parse(req.params.seasonId)  
  

  const series = await Serie.findAll({where: {seasonId},attributes:['serieId','serieName'],order:[['level','asc'],['serieId','asc']]})


  res.status(200).json(series)
}) as RequestHandler)

nativeRouter.get('/native/serie/:serieId',  (async(
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  
  const serieId = IDCheck.parse(req.params.serieId)  
  

  const games = await Game.findAll({where:{serieId},include:[{model:Team,as:'homeTeam',attributes:['casualName']},{model:Team,as:'awayTeam',attributes:['casualName']}],order:[['date','asc']]})


  res.status(200).json(games)
}) as RequestHandler)

nativeRouter.get('/native/game/:gameId',  (async(
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  
  const gameId = IDCheck.parse(req.params.gameId)  
  

  const game = await Game.findByPk(gameId,{include:[{model:Team,as:'homeTeam',attributes:['casualName']},{model:Team,as:'awayTeam',attributes:['casualName']}]})


  res.status(200).json(game)
}) as RequestHandler)

nativeRouter.get('/native/seasons',  (async(
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const dev = process.env.NODE_ENV === 'production' ? false : true
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()

  const seasonYear = month > 7 ? `${year}/${year + 1}` : `${year-1}/${year}`

  const seasons = await Season.findAll({where: {year: dev ? '2023/2024' : seasonYear},attributes: ['seasonId','women','year']})


  res.status(200).json(seasons)
}) as RequestHandler)


export default nativeRouter
