import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import { Op, QueryTypes } from 'sequelize'
import { sequelize } from '../../utils/db.js'

import Game from '../../models/Game.js'
import Season from '../../models/Season.js'
import TeamGame from '../../models/TeamGame.js'

import { z } from 'zod'
import seasonIdCheck from '../../utils/postFunctions/seasonIdCheck.js'
import {
  goalStatsByCatObject,
  goalStatsObject,
} from '../../utils/responseTypes/statsTypes.js'

const statsRouter = Router()

const parseWomen = z.enum(['true', 'false']).catch('false')

statsRouter.get('/stats/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'GET Single Season stats router'
  const seasonYear = seasonIdCheck.parse(req.params.seasonId)
  const women = parseWomen.parse(req.query.women)

  const goalsScoredTotalRaw = await TeamGame.findAll({
    where: { homeGame: true, women: women === 'true' ? true : false },
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [[sequelize.fn('SUM', sequelize.col('total_goals')), 'data']],
    group: ['season.year', 'season.season_id'],
    raw: true,
    nest: true,
  })

  const goalsScoredTotal = goalStatsObject.parse(goalsScoredTotalRaw)

  const goalsScoredTotalCatRaw = await TeamGame.findAll({
    where: { homeGame: true, women: women === 'true' ? true : false },
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      'category',
      [sequelize.fn('SUM', sequelize.col('total_goals')), 'data'],
    ],
    group: ['category', 'season.year', 'season.season_id'],
    raw: true,
    nest: true,
  })

  const goalsScoredTotalCat = goalStatsByCatObject.parse(goalsScoredTotalCatRaw)

  const goalsScoredHomeTotalRaw = await Game.findAll({
    where: { women: women === 'true' ? true : false },
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [[sequelize.fn('SUM', sequelize.col('home_goal')), 'data']],
    group: ['season.year', 'season.season_id'],
    raw: true,
    nest: true,
  })

  const goalsScoredHomeTotal = goalStatsObject.parse(goalsScoredHomeTotalRaw)

  const goalsScoredHomeTotalCatRaw = await Game.findAll({
    where: { women: women === 'true' ? true : false },
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      'category',
      [sequelize.fn('SUM', sequelize.col('home_goal')), 'data'],
    ],
    group: ['category', 'season.year', 'season.season_id'],
    raw: true,
    nest: true,
  })

  const goalsScoredHomeTotalCat = goalStatsByCatObject.parse(
    goalsScoredHomeTotalCatRaw
  )

  const goalsScoredAwayTotalRaw = await Game.findAll({
    where: { women: women === 'true' ? true : false },
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [[sequelize.fn('SUM', sequelize.col('away_goal')), 'data']],
    group: ['season.year', 'season.season_id'],
    raw: true,
    nest: true,
  })

  const goalsScoredAwayTotal = goalStatsObject.parse(goalsScoredAwayTotalRaw)

  const goalsScoredAwayTotalCatRaw = await Game.findAll({
    where: { women: women === 'true' ? true : false },
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      'category',
      [sequelize.fn('SUM', sequelize.col('away_goal')), 'data'],
    ],
    group: ['category', 'season.year', 'season.season_id'],
    raw: true,
    nest: true,
  })

  const goalsScoredAwayTotalCat = goalStatsByCatObject.parse(
    goalsScoredAwayTotalCatRaw
  )

  const goalsScoredAverageRaw = await TeamGame.findAll({
    where: { played: true, women: women === 'true' ? true : false },
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      [
        sequelize.fn(
          'round',
          sequelize.fn('AVG', sequelize.col('total_goals')),
          2
        ),
        'data',
      ],
    ],
    group: ['season.year', 'season.season_id'],
    raw: true,
    nest: true,
  })

  const goalsScoredAverage = goalStatsObject.parse(goalsScoredAverageRaw)

  const goalsScoredAverageCatRaw = await TeamGame.findAll({
    where: { played: true, women: women === 'true' ? true : false },
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      'category',
      [
        sequelize.fn(
          'round',
          sequelize.fn('AVG', sequelize.col('total_goals')),
          2
        ),
        'data',
      ],
    ],
    group: ['category', 'season.year', 'season.season_id'],
    raw: true,
    nest: true,
  })

  const goalsScoredAverageCat = goalStatsByCatObject.parse(
    goalsScoredAverageCatRaw
  )

  const goalsScoredHomeAverageRaw = await Game.findAll({
    where: { women: women === 'true' ? true : false },
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      [
        sequelize.fn(
          'round',
          sequelize.fn('AVG', sequelize.col('home_goal')),
          2
        ),
        'data',
      ],
    ],
    group: ['season.year', 'season.season_id'],
    raw: true,
    nest: true,
  })

  const goalsScoredHomeAverage = goalStatsObject.parse(
    goalsScoredHomeAverageRaw
  )

  const goalsScoredHomeAverageCatRaw = await Game.findAll({
    where: { women: women === 'true' ? true : false },
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      'category',
      [
        sequelize.fn(
          'round',
          sequelize.fn('AVG', sequelize.col('home_goal')),
          2
        ),
        'data',
      ],
    ],
    group: ['category', 'season.year', 'season.season_id'],
    raw: true,
    nest: true,
  })

  const goalsScoredHomeAverageCat = goalStatsByCatObject.parse(
    goalsScoredHomeAverageCatRaw
  )

  const goalsScoredAwayAverageRaw = await Game.findAll({
    where: { women: women === 'true' ? true : false },
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      [
        sequelize.fn(
          'round',
          sequelize.fn('AVG', sequelize.col('away_goal')),
          2
        ),
        'data',
      ],
    ],
    group: ['season.year', 'season.season_id'],
    raw: true,
    nest: true,
  })

  const goalsScoredAwayAverage = goalStatsObject.parse(
    goalsScoredAwayAverageRaw
  )

  const goalsScoredAwayAverageCatRaw = await Game.findAll({
    where: { women: women === 'true' ? true : false },
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      'category',
      [
        sequelize.fn(
          'round',
          sequelize.fn('AVG', sequelize.col('away_goal')),
          2
        ),
        'data',
      ],
    ],
    group: ['category', 'season.year', 'season.season_id'],
    raw: true,
    nest: true,
  })

  const goalsScoredAwayAverageCat = goalStatsByCatObject.parse(
    goalsScoredAwayAverageCatRaw
  )

  const gamesCountTotal = await Game.count({
    where: { women: women === 'true' ? true : false, played: true },
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
  })

  const gamesCountTotalCat = await Game.count({
    where: { women: women === 'true' ? true : false, played: true },
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
    group: ['category', 'season.year', 'season.season_id'],
  })

  const winCountHomeTeam = await TeamGame.count({
    where: {
      women: women === 'true' ? true : false,
      homeGame: true,
      win: true,
    },
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
  })

  const winCountAwayTeam = await TeamGame.count({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
    where: {
      women: women === 'true' ? true : false,
      homeGame: false,
      win: true,
    },
  })

  const drawCount = await TeamGame.count({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
    where: {
      women: women === 'true' ? true : false,
      draw: true,
      homeGame: true,
    },
  })

  const winCountHomeTeamCat = await TeamGame.count({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
    where: {
      women: women === 'true' ? true : false,
      homeGame: true,
      win: true,
    },
    group: ['category', 'season.year', 'season.season_id'],
  })

  const winCountAwayTeamCat = await TeamGame.count({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
    where: {
      women: women === 'true' ? true : false,
      homeGame: false,
      win: true,
    },
    group: ['category', 'season.year', 'season.season_id'],
  })

  const drawCountCat = await TeamGame.count({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
      attributes: ['year', 'seasonId'],
    },
    where: {
      women: women === 'true' ? true : false,
      draw: true,
      homeGame: true,
    },
    group: ['category', 'season.year', 'season.season_id'],
  })

  const losingStreak = await sequelize.query(
    `with lost_values as (
  select
  	team,
  	lost,
  	"date",
    "year",
  	case when lost = true then 1 else 0 end lost_value
  from teamgames
  join seasons on seasons.season_id = teamgames.season_id
  where teamgames.women = $women and category != 'qualification' and played = true and "year" = $season_name),

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
  	casual_name,
  	array_length(dates, 1) as game_count,
  	dates[1] as start_date,
  	dates[array_upper(dates,1)] as end_date
  from group_array
  join teams on group_array.team = teams.team_id
  where array_length(dates, 1) > 3
  order by game_count desc, start_date asc
  limit 3;
  `,
    {
      bind: { season_name: seasonYear, women: women === 'true' ? true : false },
      type: QueryTypes.SELECT,
    }
  )

  const drawStreak = await sequelize.query(
    `with draw_values as (
  select
  	team,
  	draw,
  	"date",
    "year",
  	case when draw = true then 1 else 0 end draw_value
  from teamgames
  join seasons on seasons.season_id = teamgames.season_id
  where teamgames.women = $women and category != 'qualification' and played = true and "year" = $season_name),

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
  	casual_name,
  	array_length(dates, 1) as game_count,
  	dates[1] as start_date,
  	dates[array_upper(dates,1)] as end_date
  from group_array
  join teams on group_array.team = teams.team_id
  where array_length(dates, 1) > 2
  order by game_count desc, start_date asc
  limit 3;
  `,
    {
      bind: { season_name: seasonYear, women: women === 'true' ? true : false },
      type: QueryTypes.SELECT,
    }
  )

  const winStreak = await sequelize.query(
    `with win_values as (
  select
  	team,
  	win,
  	"date",
    "year",
  	case when win = true then 1 else 0 end win_value
  from teamgames
  join seasons on seasons.season_id = teamgames.season_id
  where teamgames.women = $women and category != 'qualification' and played = true and "year" = $season_name),

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
  	casual_name,
  	array_length(dates, 1) as game_count,
  	dates[1] as start_date,
  	dates[array_upper(dates,1)] as end_date
  from group_array
  join teams on group_array.team = teams.team_id
  where array_length(dates, 1) > 5
  order by game_count desc, start_date asc
  limit 3;
  `,
    {
      bind: { season_name: seasonYear, women: women === 'true' ? true : false },
      type: QueryTypes.SELECT,
    }
  )

  const noWinStreak = await sequelize.query(
    `with win_values as (
  select
  	team,
  	win,
  	"date",
    "year",
  	case when win = false then 1 else 0 end win_value
  from teamgames
  join seasons on seasons.season_id = teamgames.season_id
  where teamgames.women = $women and category != 'qualification' and played = true and "year" = $season_name),

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
  	casual_name,
  	array_length(dates, 1) as game_count,
  	dates[1] as start_date,
  	dates[array_upper(dates,1)] as end_date
  from group_array
  join teams on group_array.team = teams.team_id
  where array_length(dates, 1) > 5
  order by game_count desc, start_date asc
  limit 3;
  `,
    {
      bind: { season_name: seasonYear, women: women === 'true' ? true : false },
      type: QueryTypes.SELECT,
    }
  )

  const unbeatenStreak = await sequelize.query(
    `with win_values as (
  select
  	team,
    "year",
  	lost,
  	"date",
  	case when lost = false then 1 else 0 end win_value
  from teamgames
  join seasons on seasons.season_id = teamgames.season_id
  where teamgames.women = $women and category != 'qualification' and played = true and "year" = $season_name),

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
  	casual_name,
  	array_length(dates, 1) as game_count,
  	dates[1] as start_date,
  	dates[array_upper(dates,1)] as end_date
  from group_array
  join teams on group_array.team = teams.team_id
  where array_length(dates, 1) > 5
  order by game_count desc, start_date asc
  limit 3;
  `,
    {
      bind: { season_name: seasonYear, women: women === 'true' ? true : false },
      type: QueryTypes.SELECT,
    }
  )
  const maxGoals = await sequelize.query(
    `with max_goals as (
  select
  	games."date" as datum,
  	games.result as resultat,
  	games.home_team_id as home,
  	games.away_team_id as away,
  	(home_goal + away_goal) as sum_goals
  from games
  join seasons on seasons.season_id = games.season_id

  where (home_goal + away_goal) =
  		(
  			select
  		 	max(away_goal + home_goal)
  		 	from games
  		 	join seasons on games.season_id = seasons.season_id
  		 	where "year" = $season_name
  				and games.women = $women

  		)
  and "year" = $season_name and games.women = $women)

  select
  	home_team."casual_name" as home_name,
  	away_team."casual_name" as away_name,
  	datum,
  	resultat,
  	sum_goals
  from max_goals
  join teams as home_team on max_goals.home = home_team.team_id
  join teams as away_team on max_goals.away = away_team.team_id;
  `,
    {
      bind: { season_name: seasonYear, women: women === 'true' ? true : false },
      type: QueryTypes.SELECT,
    }
  )

  const minGoals = await sequelize.query(
    `with min_goals as (
  select
  	games."date" as datum,
  	games.result as resultat,
  	games.home_team_id as home,
  	games.away_team_id as away,
  	(home_goal + away_goal) as sum_goals
  from games
  join seasons on seasons.season_id = games.season_id

  where (home_goal + away_goal) =
  		(
  			select
  		 	min(away_goal + home_goal)
  		 	from games
  		 	join seasons on games.season_id = seasons.season_id
  		 	where "year" = $season_name
  				and games.women = $women

  		)
  and "year" = $season_name and games.women = $women)

  select
  	home_team."casual_name" as home_name,
  	away_team."casual_name" as away_name,
  	datum,
  	resultat,
  	sum_goals
  from min_goals
  join teams as home_team on min_goals.home = home_team.team_id
  join teams as away_team on min_goals.away = away_team.team_id;
  `,
    {
      bind: { season_name: seasonYear, women: women === 'true' ? true : false },
      type: QueryTypes.SELECT,
    }
  )

  const maxDiff = await sequelize.query(
    `with max_diff as (
  select
  	games."date" as datum,
  	games.result as resultat,
  	games.home_team_id as home,
  	games.away_team_id as away,
  	goal_difference
  from teamgames
  join seasons on seasons.season_id = teamgames.season_id
  join games on teamgames.game_id = games.game_id

  where goal_difference =
  		(
  			select
  		 	max(goal_difference)
  		 	from teamgames
  		 	join seasons on teamgames.season_id = seasons.season_id
  		 	where "year" = $season_name
  				and teamgames.women = $women

  		)
  and "year" = $season_name and teamgames.women = $women and teamgames.played = true)

  select
  	home_team."casual_name" as home_name,
  	away_team."casual_name" as away_name,
  	datum,
  	resultat,
  	goal_difference
  from max_diff
  join teams as home_team on max_diff.home = home_team.team_id
  join teams as away_team on max_diff.away = away_team.team_id;`,
    {
      bind: { season_name: seasonYear, women: women === 'true' ? true : false },
      type: QueryTypes.SELECT,
    }
  )

  res.status(200).json({
    gamesCountTotal,
    gamesCountTotalCat,
    winCountHomeTeam,
    winCountAwayTeam,
    drawCount,
    winCountHomeTeamCat,
    winCountAwayTeamCat,
    drawCountCat,
    goalsScoredTotal,
    goalsScoredTotalCat,
    goalsScoredAverage,
    goalsScoredAverageCat,
    goalsScoredHomeTotal,
    goalsScoredAwayTotal,
    goalsScoredHomeTotalCat,
    goalsScoredAwayTotalCat,
    goalsScoredHomeAverage,
    goalsScoredAwayAverage,
    goalsScoredHomeAverageCat,
    goalsScoredAwayAverageCat,
    unbeatenStreak,
    winStreak,
    drawStreak,
    noWinStreak,
    losingStreak,
    maxGoals,
    minGoals,
    maxDiff,
  })
}) as RequestHandler)

export default statsRouter
