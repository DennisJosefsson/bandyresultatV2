import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import { Op, QueryTypes } from 'sequelize'
import { z } from 'zod'
import Season from '../../models/Season.js'
import Serie from '../../models/Serie.js'
import Team from '../../models/Team.js'
import TeamGame from '../../models/TeamGame.js'
import { sequelize } from '../../utils/db.js'
import NotFoundError from '../../utils/middleware/errors/NotFoundError.js'
import { parseCompareRequest } from '../../utils/postFunctions/compareRequest.js'
import {
  compareAllTeamData,
  compareSortLevelFunction,
  getLatestGames,
} from '../../utils/postFunctions/compareSortFunctions.js'
import getCompareHeaderText from '../../utils/postFunctions/getCompareHeaderText.js'
import {
  compareAllTeamTables,
  compareCategoryTeamTables,
  parseFirstLast,
} from '../../utils/responseTypes/tableTypes.js'

const compareRouter = Router()

const parseWomen = z.enum(['true', 'false']).catch('false')

compareRouter.post('/compare', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'POST Compare router'
  const women = parseWomen.parse(req.query.women)
  const season = await Season.findOne({
    where: { women: women === 'true' },
    order: [['seasonId', 'desc']],
    limit: 1,
    raw: true,
    nest: true,
  })

  const { teamArray, categoryArray, startSeason, endSeason } =
    parseCompareRequest(req.body, season)

  const seasonNames = await Season.findAll({
    where: { seasonId: { [Op.in]: [startSeason, endSeason] } },
    attributes: ['seasonId', 'year'],
    raw: true,
    nest: true,
  })

  const teams = await Team.findAll({ where: { teamId: teamArray } })

  const getCatTables = await TeamGame.findAll({
    where: {
      teamId: {
        [Op.in]: teamArray,
      },
      opponentId: {
        [Op.in]: teamArray,
      },
      category: {
        [Op.any]: categoryArray,
      },
      [Op.and]: [
        { seasonId: { [Op.gte]: startSeason } },
        { seasonId: { [Op.lte]: endSeason } },
      ],
      played: true,
    },
    attributes: [
      'teamId',
      'opponentId',
      'category',
      [sequelize.fn('count', sequelize.col('team_game_id')), 'totalGames'],
      [sequelize.fn('sum', sequelize.col('points')), 'totalPoints'],
      [sequelize.fn('sum', sequelize.col('goals_scored')), 'totalGoalsScored'],
      [
        sequelize.fn('sum', sequelize.col('goals_conceded')),
        'totalGoalsConceded',
      ],
      [
        sequelize.fn('sum', sequelize.col('goal_difference')),
        'totalGoalDifference',
      ],
      [sequelize.literal(`(count(*) filter (where win))`), 'totalWins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'totalDraws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'totalLost'],
    ],
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'team',
      },
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'opponent',
      },
      { model: Serie, attributes: ['level'] },
    ],
    group: [
      'teamId',
      'opponentId',
      'serie.level',
      'category',
      'team.name',
      'team.team_id',
      'team.casual_name',
      'team.short_name',
      'opponent.name',
      'opponent.team_id',
      'opponent.casual_name',
      'opponent.short_name',
    ],
    order: [
      ['totalPoints', 'DESC'],
      ['totalGoalDifference', 'DESC'],
      ['totalGoalsScored', 'DESC'],
    ],
    raw: true,
    nest: true,
  })

  if (!getCatTables || getCatTables.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'Lagen har inga inbördes matcher inlagda i databasen.',
      logging: false,
      context: { origin: 'Compare teams Router' },
    })
  }

  const tables = compareCategoryTeamTables.parse(getCatTables)
  const categoryData = compareSortLevelFunction(tables)

  const getCompareAllGames = await TeamGame.findAll({
    where: {
      teamId: {
        [Op.in]: teamArray,
      },
      opponentId: {
        [Op.in]: teamArray,
      },
      category: {
        [Op.any]: categoryArray,
      },
      [Op.and]: [
        { seasonId: { [Op.gte]: startSeason } },
        { seasonId: { [Op.lte]: endSeason } },
      ],
      played: true,
    },
    attributes: [
      'teamId',
      'opponentId',
      [sequelize.fn('count', sequelize.col('team_game_id')), 'totalGames'],
      [sequelize.fn('sum', sequelize.col('points')), 'totalPoints'],
      [sequelize.fn('sum', sequelize.col('goals_scored')), 'totalGoalsScored'],
      [
        sequelize.fn('sum', sequelize.col('goals_conceded')),
        'totalGoalsConceded',
      ],
      [
        sequelize.fn('sum', sequelize.col('goal_difference')),
        'totalGoalDifference',
      ],
      [sequelize.literal(`(count(*) filter (where win))`), 'totalWins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'totalDraws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'totalLost'],
    ],
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'team',
      },
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'opponent',
      },
    ],
    group: [
      'teamId',
      'opponentId',
      'team.name',
      'team.team_id',
      'team.casual_name',
      'team.short_name',
      'opponent.name',
      'opponent.team_id',
      'opponent.casual_name',
      'opponent.short_name',
    ],
    order: [
      ['totalPoints', 'DESC'],
      ['totalGoalDifference', 'DESC'],
      ['totalGoalsScored', 'DESC'],
    ],
    raw: true,
    nest: true,
  })

  const allData = compareAllTeamTables.parse(getCompareAllGames)

  const sortedData = compareAllTeamData(allData)

  const gameCount = allData.length

  const golds = await sequelize.query(
    `
  select count(distinct season_id) as guld, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where team = any($team_array) and category = 'final' and win = true
group by casual_name,team;
  `,
    { bind: { team_array: teamArray }, type: QueryTypes.SELECT }
  )

  const playoffs = await sequelize.query(
    `
  select count(distinct season_id) as playoffs, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where team = any($team_array) and ("category" = any(array['quarter', 'semi', 'final']) or "group" = any(array['SlutspelA', 'SlutspelB'])) and season_id >= 25
group by casual_name, team;
  `,
    { bind: { team_array: teamArray }, type: QueryTypes.SELECT }
  )

  const firstDivisionSeasonsSince1931 = await sequelize.query(
    `
  select count(distinct teamgames.season_id) as seasons, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
join series on teamgames.serie_id = series.serie_id
where team = any($team_array) and teamgames.season_id >= 25 and series.level = 1
group by casual_name, team;
  `,
    { bind: { team_array: teamArray }, type: QueryTypes.SELECT }
  )

  const allPlayoffs = await sequelize.query(
    `
  select count(distinct season_id) as playoffs, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where team = any($team_array) and ("category" = any(array['quarter', 'semi', 'final']) or "group" = any(array['SlutspelA', 'SlutspelB']))
group by casual_name, team;
  `,
    { bind: { team_array: teamArray }, type: QueryTypes.SELECT }
  )

  const allDbSeasons = await sequelize.query(
    `
  select count(distinct season_id) as seasons, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where team = any($team_array)
group by casual_name, team;
  `,
    { bind: { team_array: teamArray }, type: QueryTypes.SELECT }
  )

  const firstDivisionSeasons = await sequelize.query(
    `
  select count(distinct teamgames.season_id) as seasons, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
join series on teamgames.serie_id = series.serie_id
where team = any($team_array) and series.level = 1
group by casual_name, team;
  `,
    { bind: { team_array: teamArray }, type: QueryTypes.SELECT }
  )

  const firstAndLatestGames = await sequelize.query(
    `
 with first_games as (select game_id, home_team_id, away_team_id, "date", result,
rank() over (partition by home_team_id, away_team_id order by "date" asc) ranked_first_games,
rank() over (partition by home_team_id, away_team_id order by "date" desc) ranked_last_games
from games
where home_team_id = any($team_array) and away_team_id = any($team_array) and played = true) 

select game_id, "date", result, home.casual_name as home_name, away.casual_name as away_name, ranked_first_games, ranked_last_games from first_games 
join teams as home on first_games.home_team_id = home.team_id
join teams as away on first_games.away_team_id = away.team_id
where ranked_first_games = 1 or ranked_last_games < 6
order by "date" asc;
 `,
    { bind: { team_array: teamArray }, type: QueryTypes.SELECT }
  )

  const parsedFirstLastGames = parseFirstLast.parse(firstAndLatestGames)

  const firstGames = parsedFirstLastGames.filter(
    (game) => game.ranked_first_games === '1'
  )

  const latestGames = getLatestGames(teamArray, parsedFirstLastGames)

  const compareHeaderText = getCompareHeaderText({
    seasonNames,
    teams,
    gameCount,
    categoryArray,
  })

  res.status(200).json({
    tables,
    allData,
    categoryData,
    sortedData,
    golds,
    playoffs,
    firstDivisionSeasonsSince1931,
    allPlayoffs,
    allDbSeasons,
    firstDivisionSeasons,
    firstAndLatestGames,
    firstGames,
    latestGames,
    seasonNames,
    compareHeaderText,
  })
}) as RequestHandler)

export default compareRouter
