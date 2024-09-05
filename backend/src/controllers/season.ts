import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import { Op } from 'sequelize'
import { z } from 'zod'
import Metadata from '../models/Metadata.js'
import Season from '../models/Season.js'
import Serie from '../models/Serie.js'
import Team from '../models/Team.js'
import TeamSeason from '../models/TeamSeason.js'
import TeamTable from '../models/TeamTable.js'
import authControl from '../utils/middleware/authControl.js'
import BadRequestError from '../utils/middleware/errors/BadRequestError.js'
import NotFoundError from '../utils/middleware/errors/NotFoundError.js'
import IDCheck from '../utils/postFunctions/IDCheck.js'
import newSeasonEntry, {
  fullNewSeason,
  newMetadataSeasons,
  newTeamSeasons,
  updateSeasonEntry,
} from '../utils/postFunctions/newSeasonEntry.js'
import seasonIdCheck from '../utils/postFunctions/seasonIdCheck.js'

const seasonRouter = Router()

const parsedPage = z.coerce.number().catch(1)

seasonRouter.get('/paginated', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const page = parsedPage.parse(req.query.page)
  const seasons = await Season.findAndCountAll({
    where: { women: false },
    offset: (page - 1) * 12,
    limit: 12,
    order: [['seasonId', 'DESC']],
  })

  res.status(200).json(seasons)
}) as RequestHandler)

seasonRouter.get('/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonYear = seasonIdCheck.parse(req.params.seasonId)

  const season = await Season.findAll({
    where: { year: { [Op.eq]: seasonYear } },
    include: [Team, { model: TeamTable, include: [Team] }, Serie, Metadata],
    order: [['seasonId', 'asc']],
  })

  if (!season || season.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No such season',
      logging: false,
      context: { origin: 'GET Single Season Router' },
    })
  }
  res.status(200).json(season)
}) as RequestHandler)

seasonRouter.get('/', (async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasons = await Season.findAll({
    include: { model: Metadata, attributes: ['metadataId'] },
    order: [['seasonId', 'DESC']],
  })
  if (!seasons || seasons.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No seasons',
      logging: false,
      context: { origin: 'GET All Seasons Router' },
    })
  }
  res.status(200).json(seasons)
}) as RequestHandler)

seasonRouter.post('/', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { newSeasonArray, oldSeason, seasonYear } = newSeasonEntry(req.body)
  const [[womenSeason, womenCreated], [menSeason, menCreated]] =
    await Promise.all(newSeasonArray)
  if (!womenCreated && !menCreated) {
    throw new BadRequestError({
      code: 400,
      message: 'Säsong finns redan.',
      logging: true,
      context: { origin: 'NewSeasonEntry' },
    })
  } else if (womenCreated && menCreated) {
    const womenSeasonId = womenSeason.get().seasonId
    const menSeasonId = menSeason.get().seasonId

    const fullSeasonArray = fullNewSeason({ womenSeasonId, menSeasonId })

    const metadataArray = newMetadataSeasons({
      womenSeasonId,
      menSeasonId,
      seasonYear,
    })

    const oldSeasons = await Season.findAll({ where: { year: oldSeason } })

    const oldSeasonId = oldSeasons.map((season) => season.seasonId)

    const teamSeasons = await TeamSeason.findAll({
      where: { seasonId: oldSeasonId },
      raw: true,
      nest: true,
    })

    console.log('TEAMSEASONS', teamSeasons)

    const teamArray = teamSeasons
      .filter(
        (team) =>
          team.relegated === false ||
          (team.qualification && team.promoted === true)
      )
      .map((team) => {
        return { teamId: team.teamId, women: team.women }
      })

    console.log('TEAMARRAY', teamArray)

    const { mensTeamSeason, womensTeamSeason } = newTeamSeasons(
      teamArray,
      menSeasonId,
      womenSeasonId
    )

    const newSeries = await Promise.all(fullSeasonArray)
    const newMetadata = await Promise.all(metadataArray)
    const newMensTeamSeason = await Promise.all(mensTeamSeason)
    const newWomensTeamSeason = await Promise.all(womensTeamSeason)

    return res.status(201).json({
      womenSeason,
      menSeason,
      newSeries,
      newMetadata,
      newMensTeamSeason,
      newWomensTeamSeason,
    })
  }
}) as RequestHandler)

seasonRouter.put('/', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const updateSeasonObject = updateSeasonEntry(req.body)
  const season = await Season.findByPk(updateSeasonObject.seasonId)
  if (!season) {
    throw new NotFoundError({
      code: 404,
      message: 'No such season',
      logging: false,
      context: { origin: 'Update Season Router' },
    })
  }
  const [updateSeason] = await Season.upsert(updateSeasonObject)
  return res.status(201).json(updateSeason)
}) as RequestHandler)

seasonRouter.delete('/:seasonId', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonId = IDCheck.parse(req.params.seasonId)
  const season = await Season.findByPk(seasonId)
  if (!season) {
    throw new NotFoundError({
      code: 404,
      message: 'No season',
      logging: false,
      context: { origin: 'Delete season Router' },
    })
  } else {
    await season.destroy()
    res.status(200).json({ message: 'Season deleted' })
  }
}) as RequestHandler)

export default seasonRouter
