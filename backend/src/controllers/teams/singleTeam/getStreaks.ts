import { QueryTypes } from 'sequelize'
import { z } from 'zod'
import { sequelize } from '../../../utils/db.js'

const parseStreak = z.array(
  z
    .object({
      team: z.number(),
      women: z.boolean(),
      name: z.string(),
      game_count: z.number(),
      start_date: z.string(),
      end_date: z.string(),
    })
    .transform((item) => {
      return {
        team: item.team,
        name: item.name,
        women: item.women,
        gameCount: item.game_count,
        startDate: item.start_date,
        endDate: item.end_date,
      }
    })
)

const parsePlayoffStreak = z.array(
  z
    .object({
      streak_length: z.number(),
      start_year: z.string(),
      end_year: z.string(),
    })
    .transform((item) => {
      return {
        streakLength: item.streak_length,
        startYear: item.start_year,
        endYear: item.end_year,
      }
    })
)

export const getStreaks = async ({ teamId }: { teamId: number }) => {
  const getLosingStreak = await sequelize.query(
    `with lost_values as (
select 
	team,
	lost, 
	"date",
  women,
	case when lost = true then 1 else 0 end lost_value
from teamgames
where category != 'qualification' and played = true and team = $teamId),

summed_lost_values as (
select 
	team,
	lost,
	"date",
  women,
	sum(lost_value) over (partition by team order by date) sum_losts,
	row_number() over (partition by team order by date) round
from lost_values),

grouped_losts as (
select 
	team,
	lost,
	"date",
  women,
	sum_losts,
	round - sum_losts as grouped
from summed_lost_values
where lost = true),

group_array as (
select
	team,
  women,
	mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_losts
group by grouped, team, women)

select
	team,
	"name",
  group_array.women,
	array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc, start_date asc
limit 3;
`,
    { bind: { teamId: teamId }, type: QueryTypes.SELECT }
  )

  const getDrawStreak = await sequelize.query(
    `with draw_values as (
select 
	team,
	draw, 
	"date",
  women,
	case when draw = true then 1 else 0 end draw_value
from teamgames
where category != 'qualification' and played = true and team = $teamId),

summed_draw_values as (
select 
	team,
	draw,
	"date",
  women,
	sum(draw_value) over (partition by team order by date) sum_draws,
	row_number() over (partition by team order by date) round
from draw_values),

grouped_draws as (
select 
	team,
	draw,
	"date",
  women,
	sum_draws,
	round - sum_draws as grouped
from summed_draw_values
where draw = true),

group_array as (
select
	team,
  women,
	mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_draws
group by grouped, team, women)

select
	team,
	"name",
  group_array.women,
	array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc, start_date asc
limit 3;
`,
    { bind: { teamId: teamId }, type: QueryTypes.SELECT }
  )

  const getWinStreak = await sequelize.query(
    `with win_values as (
select 
	team,
	win, 
	"date",
  women,
	case when win = true then 1 else 0 end win_value
from teamgames
where category != 'qualification' and played = true and team = $teamId),

summed_win_values as (
select 
	team,
	win,
	"date",
  women,
	sum(win_value) over (partition by team order by date) sum_wins,
	row_number() over (partition by team order by date) round
from win_values),

grouped_wins as (
select 
	team,
	win,
	"date",
  women,
	sum_wins,
	round - sum_wins as grouped
from summed_win_values
where win = true),

group_array as (
select
	team,
  women,
	mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_wins
group by grouped, team, women)

select
	team,
	"name",
  group_array.women,
	array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc, start_date asc
limit 3;
`,
    { bind: { teamId: teamId }, type: QueryTypes.SELECT }
  )

  const getNoWinStreak = await sequelize.query(
    `with win_values as (
select 
	team,
	win, 
	"date",
  women,
	case when win = false then 1 else 0 end win_value
from teamgames
where category != 'qualification' and played = true and team = $teamId),

summed_win_values as (
select 
	team,
	win,
	"date",
  women,
	sum(win_value) over (partition by team order by date) sum_wins,
	row_number() over (partition by team order by date) round
from win_values),

grouped_wins as (
select 
	team,
	win,
	"date",
  women,
	sum_wins,
	round - sum_wins as grouped
from summed_win_values
where win = false),

group_array as (
select
	team,
  women,
	mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_wins
group by grouped, team, women)

select
	team,
	"name",
  group_array.women,
	array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc, start_date asc
limit 3;
`,
    { bind: { teamId: teamId }, type: QueryTypes.SELECT }
  )

  const getUnbeatenStreak = await sequelize.query(
    `with win_values as (
select 
	team,
	lost, 
	"date",
  women,
	case when lost = false then 1 else 0 end win_value
from teamgames
where category != 'qualification' and played = true and team = $teamId),

summed_win_values as (
select 
	team,
	lost,
	"date",
  women,
	sum(win_value) over (partition by team order by date) sum_wins,
	row_number() over (partition by team order by date) round
from win_values),

grouped_wins as (
select 
	team,
	lost,
	"date",
  women,
	sum_wins,
	round - sum_wins as grouped
from summed_win_values
where lost = false),

group_array as (
select
	team,
  women,
	mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_wins
group by grouped, team, women)

select
	team,
	"name",
  group_array.women,
	array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc, start_date asc
limit 3;
`,
    { bind: { teamId: teamId }, type: QueryTypes.SELECT }
  )

  const getPlayoffStreak = await sequelize.query(
    `with season_order as (select 
dense_rank() over (order by "year") row_num,
season_id,
"year"
from seasons
where season_id >= 25),

playoff_seasons as (
select distinct season_id from teamgames
where team = $teamId and ("category" = any(array['quarter', 'semi', 'final']) or "group" = any(array['SlutspelA', 'SlutspelB']))
),

selected_rows as (select 
row_num,
row_number() over (order by row_num) row_playoff, 
"year"
from season_order
join playoff_seasons on season_order.season_id = playoff_seasons.season_id),

grouped_playoffs as (select
row_num - row_playoff as grouped,
"year"
from selected_rows),

group_array as (
select
	mode() within group (order by grouped) as max_count, 
	array_agg("year" order by "year") as years
from grouped_playoffs
group by grouped)

select 
array_length(years, 1) as streak_length,
years[1] as start_year,
years[array_upper(years,1)] as end_year 
from group_array
where array_length(years, 1) > 6
order by streak_length desc, start_year asc;`,
    { bind: { teamId: teamId }, type: QueryTypes.SELECT }
  )

  const losingStreak = parseStreak
    .parse(getLosingStreak)
    .filter((streak) => streak.gameCount > 5)
  const noWinStreak = parseStreak
    .parse(getNoWinStreak)
    .filter((streak) => streak.gameCount > 5)
  const winStreak = parseStreak
    .parse(getWinStreak)
    .filter((streak) => streak.gameCount > 5)
  const unbeatenStreak = parseStreak
    .parse(getUnbeatenStreak)
    .filter((streak) => streak.gameCount > 5)
  const drawStreak = parseStreak
    .parse(getDrawStreak)
    .filter((streak) => streak.gameCount > 2)
  const playoffStreak = parsePlayoffStreak.parse(getPlayoffStreak)

  const streakObjectsLength =
    losingStreak.length +
    noWinStreak.length +
    winStreak.length +
    unbeatenStreak.length +
    drawStreak.length

  return {
    streakObjectsLength,
    losingStreak,
    noWinStreak,
    winStreak,
    unbeatenStreak,
    drawStreak,
    playoffStreak,
  }
}
