import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import { Op, QueryTypes } from 'sequelize'
import Season from '../../models/Season.js'
import Serie from '../../models/Serie.js'
import Team from '../../models/Team.js'
import TeamGame from '../../models/TeamGame.js'
import { sequelize } from '../../utils/db.js'
import {
  parseDataStats,
  parseGeneralStats,
  parseMaxMinGoals,
  parseStreak,
  streakRequest,
} from '../../utils/postFunctions/gameRequest.js'

const streakRouter = Router()

streakRouter.get('/streaks', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'POST streaks router'
  const { record, women } = streakRequest.parse(req.query)

  if (record === 'streaks') {
    const currInoffChamps = await TeamGame.findAndCountAll({
      where: {
        currInoffChamp: true,
        women: women === 'true',
      },
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'opponent',
        },
      ],
      order: [['date', 'desc']],
      limit: 10,
      raw: true,
      nest: true,
    })

    const losingStreak = await sequelize
      .query(
        `with lost_values as (
select 
	team,
	lost, 
	"date",
  case when lost = true then 1 else 0 end lost_value
from teamgames
join series on series.serie_id = teamgames.serie_id
where played = true and women = $women and series.level = 1),

summed_lost_values as (
select 
	team,
	lost,
	"date",
  sum(lost_value) over (partition by team order by date) sum_losts,
	row_number() over (partition by team order by date) round
from lost_values),

grouped_losts as (
select 
	team,
	lost,
	"date",
  sum_losts,
	round - sum_losts as grouped
from summed_lost_values
where lost = true),

group_array as (
select
	team,
  mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_losts
group by grouped, team)

select
	team,
	"name",
  array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc
limit 10;
`,
        {
          bind: { women: women === 'true' },
          type: QueryTypes.SELECT,
        }
      )
      .then((res) => {
        const result = parseStreak.parse(res)
        return result.map((item, index) => {
          return {
            ...item,
            position:
              index !== 0 &&
              result[index - 1].gameCount === item.gameCount
                ? result.find(
                    (res) =>
                      res.gameCount === item.gameCount
                  )?.position
                : item.position,
          }
        })
      })

    const drawStreak = await sequelize
      .query(
        `with draw_values as (
select 
	team,
	draw, 
	"date",
  case when draw = true then 1 else 0 end draw_value
from teamgames
join series on series.serie_id = teamgames.serie_id
where played = true and women = $women and series.level = 1),

summed_draw_values as (
select 
	team,
	draw,
	"date",
  sum(draw_value) over (partition by team order by date) sum_draws,
	row_number() over (partition by team order by date) round
from draw_values),

grouped_draws as (
select 
	team,
	draw,
	"date",
  sum_draws,
	round - sum_draws as grouped
from summed_draw_values
where draw = true),

group_array as (
select
	team,
  mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_draws
group by grouped, team)

select
	team,
	"name",
  array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc
limit 10;
`,
        {
          bind: { women: women === 'true' },
          type: QueryTypes.SELECT,
        }
      )
      .then((res) => {
        const result = parseStreak.parse(res)
        return result.map((item, index) => {
          return {
            ...item,
            position:
              index !== 0 &&
              result[index - 1].gameCount === item.gameCount
                ? result.find(
                    (res) =>
                      res.gameCount === item.gameCount
                  )?.position
                : item.position,
          }
        })
      })

    const winStreak = await sequelize
      .query(
        `with win_values as (
select 
	team,
	win, 
	"date",
  case when win = true then 1 else 0 end win_value
from teamgames
join series on series.serie_id = teamgames.serie_id
where played = true and women = $women and series.level = 1),

summed_win_values as (
select 
	team,
	win,
	"date",
  sum(win_value) over (partition by team order by date) sum_wins,
	row_number() over (partition by team order by date) round
from win_values),

grouped_wins as (
select 
	team,
	win,
	"date",
  sum_wins,
	round - sum_wins as grouped
from summed_win_values
where win = true),

group_array as (
select
	team,
  mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_wins
group by grouped, team)

select
	team,
	"name",
  array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc
limit 10;
`,
        {
          bind: { women: women === 'true' },
          type: QueryTypes.SELECT,
        }
      )
      .then((res) => {
        const result = parseStreak.parse(res)
        return result.map((item, index) => {
          return {
            ...item,
            position:
              index !== 0 &&
              result[index - 1].gameCount === item.gameCount
                ? result.find(
                    (res) =>
                      res.gameCount === item.gameCount
                  )?.position
                : item.position,
          }
        })
      })

    const noWinStreak = await sequelize
      .query(
        `with win_values as (
select 
	team,
	win, 
	"date",
  case when win = false then 1 else 0 end win_value
from teamgames
join series on series.serie_id = teamgames.serie_id
where played = true and women = $women and series.level = 1),

summed_win_values as (
select 
	team,
	win,
	"date",
  sum(win_value) over (partition by team order by date) sum_wins,
	row_number() over (partition by team order by date) round
from win_values),

grouped_wins as (
select 
	team,
	win,
	"date",
  sum_wins,
	round - sum_wins as grouped
from summed_win_values
where win = false),

group_array as (
select
	team,
  mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_wins
group by grouped, team)

select
	team,
	"name",
  array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc
limit 10;
`,
        {
          bind: { women: women === 'true' },
          type: QueryTypes.SELECT,
        }
      )
      .then((res) => {
        const result = parseStreak.parse(res)
        return result.map((item, index) => {
          return {
            ...item,
            position:
              index !== 0 &&
              result[index - 1].gameCount === item.gameCount
                ? result.find(
                    (res) =>
                      res.gameCount === item.gameCount
                  )?.position
                : item.position,
          }
        })
      })

    const unbeatenStreak = await sequelize
      .query(
        `with win_values as (
select 
	team,
	lost, 
	"date",
  case when lost = false then 1 else 0 end win_value
from teamgames
join series on series.serie_id = teamgames.serie_id
where played = true and women = $women and series.level = 1),

summed_win_values as (
select 
	team,
	lost,
	"date",
  sum(win_value) over (partition by team order by date) sum_wins,
	row_number() over (partition by team order by date) round
from win_values),

grouped_wins as (
select 
	team,
	lost,
	"date",
  sum_wins,
	round - sum_wins as grouped
from summed_win_values
where lost = false),

group_array as (
select
	team,
  mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_wins
group by grouped, team)

select
	team,
	"name",
  array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc
limit 10;
`,
        {
          bind: { women: women === 'true' },
          type: QueryTypes.SELECT,
        }
      )
      .then((res) => {
        const result = parseStreak.parse(res)
        return result.map((item, index) => {
          return {
            ...item,
            position:
              index !== 0 &&
              result[index - 1].gameCount === item.gameCount
                ? result.find(
                    (res) =>
                      res.gameCount === item.gameCount
                  )?.position
                : item.position,
          }
        })
      })

    return res.status(200).json({
      losingStreak,
      drawStreak,
      winStreak,
      noWinStreak,
      unbeatenStreak,
      currInoffChamps,
    })
  } else if (record === 'points') {
    const averagePointsMax = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('points')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      having: sequelize.literal(
        `count("team_game_id") >= 10`
      ),
      order: [
        [
          sequelize.fn('AVG', sequelize.col('points')),
          'desc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const averagePointsHomeMax = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        homeGame: true,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('points')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      having: sequelize.literal(
        `count("team_game_id") >= 5`
      ),
      order: [
        [
          sequelize.fn('AVG', sequelize.col('points')),
          'desc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const averagePointsAwayMax = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        homeGame: false,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('points')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      having: sequelize.literal(
        `count("team_game_id") >= 5`
      ),
      order: [
        [
          sequelize.fn('AVG', sequelize.col('points')),
          'desc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const averagePointsMin = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('points')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      having: sequelize.literal(
        `count("team_game_id") >= 10`
      ),
      order: [
        [
          sequelize.fn('AVG', sequelize.col('points')),
          'asc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const averagePointsHomeMin = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        homeGame: true,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('points')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      having: sequelize.literal(
        `count("team_game_id") >= 5`
      ),
      order: [
        [
          sequelize.fn('AVG', sequelize.col('points')),
          'asc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const averagePointsAwayMin = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        homeGame: false,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('points')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      having: sequelize.literal(
        `count("team_game_id") >= 5`
      ),
      order: [
        [
          sequelize.fn('AVG', sequelize.col('points')),
          'asc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const sumPointsMax = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn('SUM', sequelize.col('points')),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      order: [
        [
          sequelize.fn('SUM', sequelize.col('points')),
          'desc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const sumPointsHomeMax = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        homeGame: true,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn('SUM', sequelize.col('points')),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      order: [
        [
          sequelize.fn('SUM', sequelize.col('points')),
          'desc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const sumPointsAwayMax = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        homeGame: false,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn('SUM', sequelize.col('points')),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      order: [
        [
          sequelize.fn('SUM', sequelize.col('points')),
          'desc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const sumPointsMin = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn('SUM', sequelize.col('points')),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      having: sequelize.literal(
        `count("team_game_id") >= 12`
      ),
      order: [
        [
          sequelize.fn('SUM', sequelize.col('points')),
          'asc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const sumPointsHomeMin = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        homeGame: true,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn('SUM', sequelize.col('points')),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      having: sequelize.literal(
        `count("team_game_id") >= 6`
      ),
      order: [
        [
          sequelize.fn('SUM', sequelize.col('points')),
          'asc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const sumPointsAwayMin = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        homeGame: false,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn('SUM', sequelize.col('points')),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      having: sequelize.literal(
        `count("team_game_id") >= 6`
      ),
      order: [
        [
          sequelize.fn('SUM', sequelize.col('points')),
          'asc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    return res.status(200).json({
      avgMaxAll: averagePointsMax,
      avgMaxHome: averagePointsHomeMax,
      avgMaxAway: averagePointsAwayMax,
      avgMinAll: averagePointsMin,
      avgMinHome: averagePointsHomeMin,
      avgMinAway: averagePointsAwayMin,
      sumMaxAll: sumPointsMax,
      sumMaxHome: sumPointsHomeMax,
      sumMaxAway: sumPointsAwayMax,
      sumMinAll: sumPointsMin,
      sumMinHome: sumPointsHomeMin,
      sumMinAway: sumPointsAwayMin,
    })
  } else if (record === 'scored') {
    const sumGoalsScoredMax = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_scored')
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      order: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_scored')
          ),
          'desc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const sumGoalsScoredHomeMax = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        homeGame: true,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_scored')
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      order: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_scored')
          ),
          'desc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const sumGoalsScoredAwayMax = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        homeGame: false,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_scored')
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      order: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_scored')
          ),
          'desc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const sumGoalsScoredMin = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_scored')
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      having: sequelize.literal(
        `count("team_game_id") >= 12`
      ),
      order: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_scored')
          ),
          'asc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const sumGoalsScoredHomeMin = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        homeGame: true,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_scored')
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      having: sequelize.literal(
        `count("team_game_id") >= 6`
      ),
      order: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_scored')
          ),
          'asc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const sumGoalsScoredAwayMin = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        homeGame: false,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_scored')
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      having: sequelize.literal(
        `count("team_game_id") >= 6`
      ),
      order: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_scored')
          ),
          'asc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const averageGoalsScoredMax = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn(
              'AVG',
              sequelize.col('goals_scored')
            ),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      having: sequelize.literal(
        `count("team_game_id") >= 10`
      ),
      order: [
        [
          sequelize.fn(
            'AVG',
            sequelize.col('goals_scored')
          ),
          'desc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const averageGoalsScoredHomeMax =
      await TeamGame.findAll({
        where: {
          played: true,
          women: women === 'true',
          homeGame: true,
          seasonId: {
            [Op.gt]: women === 'true' ? 162 : 101,
          },
          category: 'regular',
        },
        attributes: [
          [
            sequelize.fn(
              'round',
              sequelize.fn(
                'AVG',
                sequelize.col('goals_scored')
              ),
              2
            ),
            'data',
          ],
        ],
        include: [
          {
            model: Serie,
            where: { level: 1 },
            attributes: [],
          },
          {
            model: Team,
            attributes: ['name', 'casualName', 'shortName'],
            as: 'team',
          },
          { model: Season },
        ],
        group: ['team.team_id', 'season.season_id'],
        having: sequelize.literal(
          `count("team_game_id") >= 5`
        ),
        order: [
          [
            sequelize.fn(
              'AVG',
              sequelize.col('goals_scored')
            ),
            'desc',
          ],
        ],
        limit: 10,
        raw: true,
        nest: true,
      }).then((res) => {
        const result = parseDataStats.parse(res)
        return result.map((item, index) => {
          return {
            ...item,
            position:
              index !== 0 &&
              result[index - 1].data === item.data
                ? result.find(
                    (res) => res.data === item.data
                  )?.position
                : item.position,
          }
        })
      })

    const averageGoalsScoredAwayMax =
      await TeamGame.findAll({
        where: {
          played: true,
          women: women === 'true',
          homeGame: false,
          seasonId: {
            [Op.gt]: women === 'true' ? 162 : 101,
          },
          category: 'regular',
        },
        attributes: [
          [
            sequelize.fn(
              'round',
              sequelize.fn(
                'AVG',
                sequelize.col('goals_scored')
              ),
              2
            ),
            'data',
          ],
        ],
        include: [
          {
            model: Serie,
            where: { level: 1 },
            attributes: [],
          },
          {
            model: Team,
            attributes: ['name', 'casualName', 'shortName'],
            as: 'team',
          },
          { model: Season },
        ],
        group: ['team.team_id', 'season.season_id'],
        having: sequelize.literal(
          `count("team_game_id") >= 5`
        ),
        order: [
          [
            sequelize.fn(
              'AVG',
              sequelize.col('goals_scored')
            ),
            'desc',
          ],
        ],
        limit: 10,
        raw: true,
        nest: true,
      }).then((res) => {
        const result = parseDataStats.parse(res)
        return result.map((item, index) => {
          return {
            ...item,
            position:
              index !== 0 &&
              result[index - 1].data === item.data
                ? result.find(
                    (res) => res.data === item.data
                  )?.position
                : item.position,
          }
        })
      })

    const averageGoalsScoredMin = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn(
              'AVG',
              sequelize.col('goals_scored')
            ),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      having: sequelize.literal(
        `count("team_game_id") >= 10`
      ),
      order: [
        [
          sequelize.fn(
            'AVG',
            sequelize.col('goals_scored')
          ),
          'asc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const averageGoalsScoredHomeMin =
      await TeamGame.findAll({
        where: {
          played: true,
          women: women === 'true',
          homeGame: true,
          seasonId: {
            [Op.gt]: women === 'true' ? 162 : 101,
          },
          category: 'regular',
        },
        attributes: [
          [
            sequelize.fn(
              'round',
              sequelize.fn(
                'AVG',
                sequelize.col('goals_scored')
              ),
              2
            ),
            'data',
          ],
        ],
        include: [
          {
            model: Serie,
            where: { level: 1 },
            attributes: [],
          },
          {
            model: Team,
            attributes: ['name', 'casualName', 'shortName'],
            as: 'team',
          },
          { model: Season },
        ],
        group: ['team.team_id', 'season.season_id'],
        having: sequelize.literal(
          `count("team_game_id") >= 5`
        ),
        order: [
          [
            sequelize.fn(
              'AVG',
              sequelize.col('goals_scored')
            ),
            'asc',
          ],
        ],
        limit: 10,
        raw: true,
        nest: true,
      }).then((res) => {
        const result = parseDataStats.parse(res)
        return result.map((item, index) => {
          return {
            ...item,
            position:
              index !== 0 &&
              result[index - 1].data === item.data
                ? result.find(
                    (res) => res.data === item.data
                  )?.position
                : item.position,
          }
        })
      })

    const averageGoalsScoredAwayMin =
      await TeamGame.findAll({
        where: {
          played: true,
          women: women === 'true',
          homeGame: false,
          seasonId: {
            [Op.gt]: women === 'true' ? 162 : 101,
          },
          category: 'regular',
        },
        attributes: [
          [
            sequelize.fn(
              'round',
              sequelize.fn(
                'AVG',
                sequelize.col('goals_scored')
              ),
              2
            ),
            'data',
          ],
        ],
        include: [
          {
            model: Serie,
            where: { level: 1 },
            attributes: [],
          },
          {
            model: Team,
            attributes: ['name', 'casualName', 'shortName'],
            as: 'team',
          },
          { model: Season },
        ],
        group: ['team.team_id', 'season.season_id'],
        having: sequelize.literal(
          `count("team_game_id") >= 5`
        ),
        order: [
          [
            sequelize.fn(
              'AVG',
              sequelize.col('goals_scored')
            ),
            'asc',
          ],
        ],
        limit: 10,
        raw: true,
        nest: true,
      }).then((res) => {
        const result = parseDataStats.parse(res)
        return result.map((item, index) => {
          return {
            ...item,
            position:
              index !== 0 &&
              result[index - 1].data === item.data
                ? result.find(
                    (res) => res.data === item.data
                  )?.position
                : item.position,
          }
        })
      })

    const gamesMaxGoals = await TeamGame.findAll({
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'opponent',
        },
        { model: Season },
      ],
      where: {
        played: true,
        women: women === 'true',
        homeGame: true,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        qualificationGame: false,
      },
      order: [
        ['totalGoals', 'desc'],
        ['date', 'desc'],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseMaxMinGoals.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].goals === item.goals
              ? result.find(
                  (res) => res.goals === item.goals
                )?.position
              : item.position,
        }
      })
    })

    const lastMaxGoal =
      gamesMaxGoals[gamesMaxGoals.length - 1].goals

    const maxGoalCount = await TeamGame.count({
      where: {
        totalGoals: lastMaxGoal,
        played: true,
        women: women === 'true',
        homeGame: true,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        qualificationGame: false,
      },
      include: { model: Serie, where: { level: 1 } },
    })

    const gamesMinGoals = await TeamGame.findAll({
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'opponent',
        },
        { model: Season },
      ],
      where: {
        played: true,
        women: women === 'true',
        homeGame: true,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        qualificationGame: false,
      },
      order: [
        ['totalGoals', 'asc'],
        ['date', 'desc'],
      ],
      limit: 10,
    }).then((res) => {
      const result = parseMaxMinGoals.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].goals === item.goals
              ? result.find(
                  (res) => res.goals === item.goals
                )?.position
              : item.position,
        }
      })
    })

    const lastMinGoal =
      gamesMinGoals[gamesMinGoals.length - 1].goals

    const minGoalCount = await TeamGame.count({
      where: {
        totalGoals: lastMinGoal,
        played: true,
        women: women === 'true',
        homeGame: true,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        qualificationGame: false,
      },
      include: { model: Serie, where: { level: 1 } },
    })

    return res.status(200).json({
      avgMaxAll: averageGoalsScoredMax,
      avgMaxHome: averageGoalsScoredHomeMax,
      avgMaxAway: averageGoalsScoredAwayMax,
      avgMinAll: averageGoalsScoredMin,
      avgMinHome: averageGoalsScoredHomeMin,
      avgMinAway: averageGoalsScoredAwayMin,
      sumMaxAll: sumGoalsScoredMax,
      sumMaxHome: sumGoalsScoredHomeMax,
      sumMaxAway: sumGoalsScoredAwayMax,
      sumMinAll: sumGoalsScoredMin,
      sumMinHome: sumGoalsScoredHomeMin,
      sumMinAway: sumGoalsScoredAwayMin,
      gamesMaxGoals,
      gamesMinGoals,
      count: {
        maxGoalCount,
        lastMaxGoal,
        minGoalCount,
        lastMinGoal,
      },
    })
  } else if (record === 'conceded') {
    const sumGoalsConcededMax = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_conceded')
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      order: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_conceded')
          ),
          'desc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const sumGoalsConcededHomeMax = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        homeGame: true,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_conceded')
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      order: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_conceded')
          ),
          'desc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const sumGoalsConcededAwayMax = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        homeGame: false,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_conceded')
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      order: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_conceded')
          ),
          'desc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const sumGoalsConcededMin = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_conceded')
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      having: sequelize.literal(
        `count("team_game_id") >= 12`
      ),
      order: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_conceded')
          ),
          'asc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const sumGoalsConcededHomeMin = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        homeGame: true,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_conceded')
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      having: sequelize.literal(
        `count("team_game_id") >= 6`
      ),
      order: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_conceded')
          ),
          'asc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const sumGoalsConcededAwayMin = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        homeGame: false,
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_conceded')
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      having: sequelize.literal(
        `count("team_game_id") >= 6`
      ),
      order: [
        [
          sequelize.fn(
            'SUM',
            sequelize.col('goals_conceded')
          ),
          'asc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const averageGoalsConcededMax = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn(
              'AVG',
              sequelize.col('goals_conceded')
            ),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      having: sequelize.literal(
        `count("team_game_id") >= 10`
      ),
      order: [
        [
          sequelize.fn(
            'AVG',
            sequelize.col('goals_conceded')
          ),
          'desc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const averageGoalsConcededHomeMax =
      await TeamGame.findAll({
        where: {
          played: true,
          women: women === 'true',
          homeGame: true,
          seasonId: {
            [Op.gt]: women === 'true' ? 162 : 101,
          },
          category: 'regular',
        },
        attributes: [
          [
            sequelize.fn(
              'round',
              sequelize.fn(
                'AVG',
                sequelize.col('goals_conceded')
              ),
              2
            ),
            'data',
          ],
        ],
        include: [
          {
            model: Serie,
            where: { level: 1 },
            attributes: [],
          },
          {
            model: Team,
            attributes: ['name', 'casualName', 'shortName'],
            as: 'team',
          },
          { model: Season },
        ],
        group: ['team.team_id', 'season.season_id'],
        having: sequelize.literal(
          `count("team_game_id") >= 5`
        ),
        order: [
          [
            sequelize.fn(
              'AVG',
              sequelize.col('goals_conceded')
            ),
            'desc',
          ],
        ],
        limit: 10,
        raw: true,
        nest: true,
      }).then((res) => {
        const result = parseDataStats.parse(res)
        return result.map((item, index) => {
          return {
            ...item,
            position:
              index !== 0 &&
              result[index - 1].data === item.data
                ? result.find(
                    (res) => res.data === item.data
                  )?.position
                : item.position,
          }
        })
      })

    const averageGoalsConcededAwayMax =
      await TeamGame.findAll({
        where: {
          played: true,
          women: women === 'true',
          homeGame: false,
          seasonId: {
            [Op.gt]: women === 'true' ? 162 : 101,
          },
          category: 'regular',
        },
        attributes: [
          [
            sequelize.fn(
              'round',
              sequelize.fn(
                'AVG',
                sequelize.col('goals_conceded')
              ),
              2
            ),
            'data',
          ],
        ],
        include: [
          {
            model: Serie,
            where: { level: 1 },
            attributes: [],
          },
          {
            model: Team,
            attributes: ['name', 'casualName', 'shortName'],
            as: 'team',
          },
          { model: Season },
        ],
        group: ['team.team_id', 'season.season_id'],
        having: sequelize.literal(
          `count("team_game_id") >= 5`
        ),
        order: [
          [
            sequelize.fn(
              'AVG',
              sequelize.col('goals_conceded')
            ),
            'desc',
          ],
        ],
        limit: 10,
        raw: true,
        nest: true,
      }).then((res) => {
        const result = parseDataStats.parse(res)
        return result.map((item, index) => {
          return {
            ...item,
            position:
              index !== 0 &&
              result[index - 1].data === item.data
                ? result.find(
                    (res) => res.data === item.data
                  )?.position
                : item.position,
          }
        })
      })

    const averageGoalsConcededMin = await TeamGame.findAll({
      where: {
        played: true,
        women: women === 'true',
        seasonId: { [Op.gt]: women === 'true' ? 162 : 101 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn(
              'AVG',
              sequelize.col('goals_conceded')
            ),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Serie,
          where: { level: 1 },
          attributes: [],
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'team',
        },
        { model: Season },
      ],
      group: ['team.team_id', 'season.season_id'],
      having: sequelize.literal(
        `count("team_game_id") >= 10`
      ),
      order: [
        [
          sequelize.fn(
            'AVG',
            sequelize.col('goals_conceded')
          ),
          'asc',
        ],
      ],
      limit: 10,
      raw: true,
      nest: true,
    }).then((res) => {
      const result = parseDataStats.parse(res)
      return result.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            result[index - 1].data === item.data
              ? result.find((res) => res.data === item.data)
                  ?.position
              : item.position,
        }
      })
    })

    const averageGoalsConcededHomeMin =
      await TeamGame.findAll({
        where: {
          played: true,
          women: women === 'true',
          homeGame: true,
          seasonId: {
            [Op.gt]: women === 'true' ? 162 : 101,
          },
          category: 'regular',
        },
        attributes: [
          [
            sequelize.fn(
              'round',
              sequelize.fn(
                'AVG',
                sequelize.col('goals_conceded')
              ),
              2
            ),
            'data',
          ],
        ],
        include: [
          {
            model: Serie,
            where: { level: 1 },
            attributes: [],
          },
          {
            model: Team,
            attributes: ['name', 'casualName', 'shortName'],
            as: 'team',
          },
          { model: Season },
        ],
        group: ['team.team_id', 'season.season_id'],
        having: sequelize.literal(
          `count("team_game_id") >= 5`
        ),
        order: [
          [
            sequelize.fn(
              'AVG',
              sequelize.col('goals_conceded')
            ),
            'asc',
          ],
        ],
        limit: 10,
        raw: true,
        nest: true,
      }).then((res) => {
        const result = parseDataStats.parse(res)
        return result.map((item, index) => {
          return {
            ...item,
            position:
              index !== 0 &&
              result[index - 1].data === item.data
                ? result.find(
                    (res) => res.data === item.data
                  )?.position
                : item.position,
          }
        })
      })

    const averageGoalsConcededAwayMin =
      await TeamGame.findAll({
        where: {
          played: true,
          women: women === 'true',
          homeGame: false,
          seasonId: {
            [Op.gt]: women === 'true' ? 162 : 101,
          },
          category: 'regular',
        },
        attributes: [
          [
            sequelize.fn(
              'round',
              sequelize.fn(
                'AVG',
                sequelize.col('goals_conceded')
              ),
              2
            ),
            'data',
          ],
        ],
        include: [
          {
            model: Serie,
            where: { level: 1 },
            attributes: [],
          },
          {
            model: Team,
            attributes: ['name', 'casualName', 'shortName'],
            as: 'team',
          },
          { model: Season },
        ],
        group: ['team.team_id', 'season.season_id'],
        having: sequelize.literal(
          `count("team_game_id") >= 5`
        ),
        order: [
          [
            sequelize.fn(
              'AVG',
              sequelize.col('goals_conceded')
            ),
            'asc',
          ],
        ],
        limit: 10,
        raw: true,
        nest: true,
      }).then((res) => {
        const result = parseDataStats.parse(res)
        return result.map((item, index) => {
          return {
            ...item,
            position:
              index !== 0 &&
              result[index - 1].data === item.data
                ? result.find(
                    (res) => res.data === item.data
                  )?.position
                : item.position,
          }
        })
      })

    return res.status(200).json({
      avgMaxAll: averageGoalsConcededMax,
      avgMaxHome: averageGoalsConcededHomeMax,
      avgMaxAway: averageGoalsConcededAwayMax,
      avgMinAll: averageGoalsConcededMin,
      avgMinHome: averageGoalsConcededHomeMin,
      avgMinAway: averageGoalsConcededAwayMin,
      sumMaxAll: sumGoalsConcededMax,
      sumMaxHome: sumGoalsConcededHomeMax,
      sumMaxAway: sumGoalsConcededAwayMax,
      sumMinAll: sumGoalsConcededMin,
      sumMinHome: sumGoalsConcededHomeMin,
      sumMinAway: sumGoalsConcededAwayMin,
    })
  }

  if (record === 'generalStats') {
    const golds = await sequelize
      .query(
        `
  select count(distinct season_id) as data_count, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where teamgames.women = $women and category = 'final' and win = true
group by casual_name,team
order by count(distinct season_id) desc;
  `,
        {
          bind: { women: women === 'true' },
          type: QueryTypes.SELECT,
        }
      )
      .then((res) => {
        const result = parseGeneralStats.parse(res)
        return result.map((item, index) => {
          return {
            ...item,
            position:
              index !== 0 &&
              result[index - 1].count === item.count
                ? result.find(
                    (res) => res.count === item.count
                  )?.position
                : item.position,
          }
        })
      })

    const finals = await sequelize
      .query(
        `
  select count(distinct season_id) as data_count, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where teamgames.women = $women and category = 'final'
group by casual_name,team
order by count(distinct season_id) desc;
  `,
        {
          bind: { women: women === 'true' },
          type: QueryTypes.SELECT,
        }
      )
      .then((res) => {
        const result = parseGeneralStats.parse(res)
        return result.map((item, index) => {
          return {
            ...item,
            position:
              index !== 0 &&
              result[index - 1].count === item.count
                ? result.find(
                    (res) => res.count === item.count
                  )?.position
                : item.position,
          }
        })
      })

    const playoffs = await sequelize
      .query(
        `
  select count(distinct season_id) as data_count, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where teamgames.women = $women and category = any(array['quarter','semi','final']) and season_id >= 25
group by casual_name, team
order by count(distinct season_id) desc
limit 10;
  `,
        {
          bind: { women: women === 'true' },
          type: QueryTypes.SELECT,
        }
      )
      .then((res) => {
        const result = parseGeneralStats.parse(res)
        return result.map((item, index) => {
          return {
            ...item,
            position:
              index !== 0 &&
              result[index - 1].count === item.count
                ? result.find(
                    (res) => res.count === item.count
                  )?.position
                : item.position,
          }
        })
      })

    const seasons = await sequelize
      .query(
        `
  select count(distinct teamgames.season_id) as data_count, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
join series on series.serie_id = teamgames.serie_id
where teamgames.women = $women and series.level = 1 and teamgames.season_id >= 25
group by casual_name, team
order by count(distinct teamgames.season_id) desc
limit 10;
  `,
        {
          bind: { women: women === 'true' },
          type: QueryTypes.SELECT,
        }
      )
      .then((res) => {
        const result = parseGeneralStats.parse(res)
        return result.map((item, index) => {
          return {
            ...item,
            position:
              index !== 0 &&
              result[index - 1].count === item.count
                ? result.find(
                    (res) => res.count === item.count
                  )?.position
                : item.position,
          }
        })
      })

    const allPlayoffs = await sequelize
      .query(
        `
  select count(distinct season_id) as data_count, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where teamgames.women = $women and category = any(array['quarter','semi','final'])
group by casual_name, team
order by count(distinct season_id) desc
limit 10;
  `,
        {
          bind: { women: women === 'true' },
          type: QueryTypes.SELECT,
        }
      )
      .then((res) => {
        const result = parseGeneralStats.parse(res)
        return result.map((item, index) => {
          return {
            ...item,
            position:
              index !== 0 &&
              result[index - 1].count === item.count
                ? result.find(
                    (res) => res.count === item.count
                  )?.position
                : item.position,
          }
        })
      })

    const allSeasons = await sequelize
      .query(
        `
  select count(distinct season_id) as data_count, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where teamgames.women = $women
group by casual_name, team
order by count(distinct season_id) desc
limit 10;
  `,
        {
          bind: { women: women === 'true' },
          type: QueryTypes.SELECT,
        }
      )
      .then((res) => {
        const result = parseGeneralStats.parse(res)
        return result.map((item, index) => {
          return {
            ...item,
            position:
              index !== 0 &&
              result[index - 1].count === item.count
                ? result.find(
                    (res) => res.count === item.count
                  )?.position
                : item.position,
          }
        })
      })

    return res.status(200).json({
      golds,
      finals,
      seasons,
      playoffs,
      allSeasons,
      allPlayoffs,
    })
  }
}) as RequestHandler)

export default streakRouter
