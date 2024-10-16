import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'

import TableSeason from '../../models/TableSeason.js'
import TeamTable from '../../models/TeamTable.js'
import authControl from '../../utils/middleware/authControl.js'
import NotFoundError from '../../utils/middleware/errors/NotFoundError.js'
import IDCheck from '../../utils/postFunctions/IDCheck.js'
import newTableEntry, {
  updateTableEntry,
} from '../../utils/postFunctions/tableEntry.js'

const tableRouter = Router()

tableRouter.post('/', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'POST Tables router'
  const tableEntry = newTableEntry(req.body)
  const table = await TeamTable.create(tableEntry)
  table.tableId &&
    (await TableSeason.create({
      seasonId: table.seasonId,
      tableId: table.tableId,
    }))
  res.status(201).json(table)
}) as RequestHandler)

tableRouter.get('/statictable/:tableId', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const tableId = IDCheck.parse(req.params.tableId)
  const table = await TeamTable.findByPk(tableId)
  if (!table) {
    throw new NotFoundError({
      code: 404,
      message: 'No such table',
      logging: false,
      context: { origin: 'DELETE Table Router' },
    })
  }
  res.status(200).json(table)
}) as RequestHandler)

tableRouter.delete('/:tableId', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'DELETE Tables router'
  const tableId = IDCheck.parse(req.params.tableId)
  const table = await TeamTable.findByPk(tableId)
  if (!table) {
    throw new NotFoundError({
      code: 404,
      message: 'No such table',
      logging: false,
      context: { origin: 'DELETE Table Router' },
    })
  } else {
    await table.destroy()
    res.status(200).json({ message: 'table deleted' })
  }
}) as RequestHandler)

tableRouter.put('/:tableId', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'PUT Tables router'
  const tableId = IDCheck.parse(req.params.tableId)
  const table = await TeamTable.findByPk(tableId)
  if (!table) {
    throw new NotFoundError({
      code: 404,
      message: 'No such table',
      logging: false,
      context: { origin: 'PUT Table Router' },
    })
  } else {
    const updateTable = updateTableEntry(req.body)
    table.set(updateTable)
    await table.save()
    res.status(200).json(table)
  }
}) as RequestHandler)

export default tableRouter
