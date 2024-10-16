import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import { QueryTypes } from 'sequelize'
import { z } from 'zod'
import County from '../../models/County.js'
import Municipality from '../../models/Municipality.js'
import Season from '../../models/Season.js'
import Serie from '../../models/Serie.js'
import Team from '../../models/Team.js'
import TeamGame from '../../models/TeamGame.js'
import TeamSeason from '../../models/TeamSeason.js'
import TeamSerie from '../../models/TeamSerie.js'
import { sequelize } from '../../utils/db.js'
import NotFoundError from '../../utils/middleware/errors/NotFoundError.js'
import { sortOrder } from '../../utils/postFunctions/constants.js'
import { teamIdChecker } from '../../utils/postFunctions/teamRequest.js'
import { singleTeamTable } from '../../utils/responseTypes/tableTypes.js'
import { getLatestFiveSeasons } from './singleTeam/getLatestFiveSeasons.js'

const singleTeamRouter = Router()

const parsePlayoffCount = z
  .array(z.object({ playoff_count: z.coerce.number() }))
  .transform((item) => {
    return item[0].playoff_count
  })

const parseFirstDivSeasons = z
  .array(z.object({ count: z.coerce.number() }))
  .transform((item) => {
    return item[0].count
  })

const parseFirstLatestFirstDivSeason = z
  .array(z.object({ season_id: z.coerce.number(), year: z.string() }))
  .transform((item) => {
    if (item.length === 0) return null
    return { seasonId: item[0].season_id, year: item[0].year }
  })

const chartItem = z.object({
  seasonId: z.number(),
  year: z.string(),
  teamseasonId: z.number().nullable(),
  qualification: z.boolean().nullable(),
  negQualification: z.boolean().nullable(),
  promoted: z.boolean().nullable(),
  relegated: z.boolean().nullable(),
  position: z.number().nullable(),
  points: z.number().nullable(),
  playoff: z.boolean().nullable(),
  eight: z.boolean().nullable(),
  quarter: z.boolean().nullable(),
  semi: z.boolean().nullable(),
  final: z.boolean().nullable(),
  gold: z.boolean().nullable(),
})

const parseChartData = z.array(chartItem)

singleTeamRouter.get('/:teamId/edit', (async (req: Request, res: Response) => {
  const teamId = teamIdChecker.parse(req.params.teamId)

  const team = await Team.findByPk(teamId)

  if (!team) {
    throw new NotFoundError({
      code: 404,
      message: 'Inget sådant lag finns.',
      logging: false,
      context: { origin: 'GET Single Team Router' },
    })
  }

  res.status(200).json(team)
}) as RequestHandler)

singleTeamRouter.get('/:teamId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const teamId = teamIdChecker.parse(req.params.teamId)

  res.locals.origin = 'GET Single Team router'
  const team = await Team.findByPk(teamId, {
    include: [
      {
        model: Season,
        attributes: ['year', 'seasonId'],
        through: {
          attributes: ['qualification'],
        },
        as: 'seasonteam',
      },
      County,
      Municipality,
    ],
    order: [[{ model: Season, as: 'seasonteam' }, 'seasonId', 'DESC']],
  })

  if (!team || teamId === 176) {
    throw new NotFoundError({
      code: 404,
      message: 'Inget sådant lag finns.',
      logging: false,
      context: { origin: 'GET Single Team Router' },
    })
  }

  const getFirstDivSeasons = await sequelize.query(
    `select count(distinct s.season_id) from teamseries t 
join series s on s.serie_id = t.serie_id 
where t.team_id = $teamId and level = 1 and s.serie_category = 'regular'`,
    { bind: { teamId: teamId }, type: QueryTypes.SELECT }
  )

  const firstDivSeasons = parseFirstDivSeasons.parse(getFirstDivSeasons)

  const getFirstFirstDivSeason = await sequelize.query(
    `select s2."year", s2.season_id from teamseries t 
join series s on s.serie_id = t.serie_id
join seasons s2 on s.season_id = s2.season_id 
where t.team_id = $teamId and level = 1 and (s.serie_category = any(array['regular','eight','quarter', 'semi', 'final']) or s.serie_group_code = any(array['SlutspelA', 'SlutspelB']))
order by s2.season_id asc
limit 1
`,
    { bind: { teamId: teamId }, type: QueryTypes.SELECT }
  )

  const firstFirstDivSeason = parseFirstLatestFirstDivSeason.parse(
    getFirstFirstDivSeason
  )

  const getLatestFirstDivSeason = await sequelize.query(
    `select s2."year", s2.season_id from teamseries t
  join series s on s.serie_id = t.serie_id
  join seasons s2 on s.season_id = s2.season_id
  where t.team_id = $teamId and level = 1 and (s.serie_category = any(array['regular','eight','quarter', 'semi', 'final']) or s.serie_group_code = any(array['SlutspelA', 'SlutspelB']))
  order by s2.season_id desc
  limit 1`,
    { bind: { teamId: teamId }, type: QueryTypes.SELECT }
  )

  const latestFirstDivSeason = parseFirstLatestFirstDivSeason.parse(
    getLatestFirstDivSeason
  )

  const qualificationSeasons = await TeamSeason.count({
    where: { teamId, qualification: true },
  })

  const allSeasons = await TeamSeason.findAndCountAll({
    where: { teamId },
    attributes: ['teamId', 'seasonId'],
    include: [{ model: Season, attributes: ['year', 'seasonId'] }],
    order: [['seasonId', 'asc']],
  })

  const seasonString = getSeasonStrings({
    teamCity: team.get('city'),
    teamName: team.get('casualName'),
    allSeasons,
    qualificationSeasons,
    firstDivSeasons,
    firstFirstDivSeason,
    latestFirstDivSeason,
  })

  const getTables = await TeamGame.findAll({
    where: {
      teamId: teamId,
      played: true,
    },
    attributes: [
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
    group: ['category'],
    order: [
      ['category', 'DESC'],
      ['totalPoints', 'DESC'],
      ['totalGoalDifference', 'DESC'],
      ['totalGoalsScored', 'DESC'],
    ],
    raw: true,
    nest: true,
  })

  const tables = singleTeamTable.parse(getTables)

  const finalsAndWins = await TeamGame.findAll({
    where: { teamId: teamId, category: 'final' },
    order: [['date', 'ASC']],
    raw: true,
    nest: true,
  })

  const finalsAndWinsString = getFinalsAndWinsString(
    team.get('casualName'),
    finalsAndWins
  )

  const losingStreak = await sequelize.query(
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

  const drawStreak = await sequelize.query(
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

  const winStreak = await sequelize.query(
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

  const noWinStreak = await sequelize.query(
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

  const unbeatenStreak = await sequelize.query(
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

  const playoffStreak = await sequelize.query(
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

  const getPlayoffCount = await sequelize.query(
    `select count(distinct season_id) as playoff_count
from teamgames
where team = $teamId and ("category" = any(array['quarter', 'semi', 'final']) or "group" = any(array['SlutspelA', 'SlutspelB'])) and season_id >= 25;`,
    { bind: { teamId: teamId }, type: QueryTypes.SELECT }
  )

  const playoffCount = parsePlayoffCount.parse(getPlayoffCount)

  const playoffCountString = getPlayoffCountString(playoffCount)

  const latestFiveSeasonArray = await TeamSeason.findAll({
    where: { teamId },
    order: [['seasonId', 'desc']],
    limit: 5,
    raw: true,
    nest: true,
  })

  const fiveSeasonIdArray = latestFiveSeasonArray.map(
    (season) => season.seasonId
  )

  // const latestFiveSeasons = await TeamGame.findAll({
  //   where: {
  //     teamId: teamId,
  //     played: true,
  //   },
  //   attributes: [
  //     'seasonId',
  //     'category',

  //     [sequelize.literal('count(*)'), 'totalGames'],
  //     [sequelize.literal('sum (points)'), 'totalPoints'],
  //     [sequelize.literal('sum(goals_scored)'), 'totalGoalsScored'],
  //     [sequelize.literal('sum(goals_conceded)'), 'totalGoalsConceded'],
  //     [sequelize.literal('sum(goal_difference)'), 'totalGoalDifference'],
  //     [sequelize.literal(`(count(*) filter (where win))`), 'totalWins'],
  //     [sequelize.literal(`(count(*) filter (where draw))`), 'totalDraws'],
  //     [sequelize.literal(`(count(*) filter (where lost))`), 'totalLost'],
  //   ],
  //   include: [Season, { model: Serie, attributes: ['serieName'] }],
  //   group: [
  //     'teamgame.season_id',
  //     'category',
  //     'season.season_id',
  //     'serie.serie_name',
  //   ],
  //   order: [
  //     ['seasonId', 'DESC'],
  //     ['category', 'ASC'],
  //   ],
  //   limit: 20,
  //   raw: true,
  //   nest: true,
  // })

  // const sortedFiveSeasons = tableSortFunction(
  //   fiveSeasonsLeagueTable.parse(latestFiveSeasons)
  // )

  const sortedFiveSeasons = await getLatestFiveSeasons({
    teamId,
    seasonIdArray: fiveSeasonIdArray,
  })

  const womensTeam = team.get().women ? true : false

  const getChartData = await sequelize.query(
    `with filtered_seasons as (select * from seasons where women = $womensTeam),
season_data as (select f.season_id as "seasonId", f."year", t.teamseason_id as "teamseasonId", t.qualification, t.neg_qualification as "negQualification",t.promoted,t.relegated,t."position",t.points, t.playoff, t.eight,t.quarter,t.semi ,t."final",t.gold  from filtered_seasons f
full outer join teamseasons t on (t.season_id = f.season_id and t.team_id = $teamId) 
order by f.season_id asc
limit (select count(*) from filtered_seasons))
select * from season_data
where "seasonId" >= (
	select "seasonId" from season_data where "teamseasonId" is not null
	order by "seasonId" asc 
	limit 1
) and "seasonId" <= (
	select "seasonId" from season_data where "teamseasonId" is not null
	order by "seasonId" desc 
	limit 1
);`,
    {
      bind: { teamId: teamId, womensTeam: womensTeam },
      type: QueryTypes.SELECT,
    }
  )

  const teamseries = await TeamSerie.findAll({
    where: { teamId },
    include: {
      model: Serie,
      where: { serieCategory: 'regular' },
      attributes: ['seasonId', 'level'],
    },
    raw: true,
    nest: true,
  })

  const seriesArray = teamseries.map((serie) => {
    return { level: serie.serie.level, seasonId: serie.serie.seasonId }
  })

  const chartData = parseChartData.parse(getChartData)

  const barChartData = getBarChartData(chartData, womensTeam)

  const renderData = getRenderData(chartData, seriesArray)

  res.json({
    seasonString,
    team,
    tables: tables.sort(
      (a, b) => sortOrder.indexOf(a.category) - sortOrder.indexOf(b.category)
    ),
    noWinStreak,
    unbeatenStreak,
    winStreak,
    drawStreak,
    losingStreak,
    finalsAndWinsString,
    playoffStreak,
    playoffCountString,
    sortedFiveSeasons,
    barChartData,
    chartDataLength: chartData.length,
    renderData,
  })
}) as RequestHandler)

export default singleTeamRouter

// type SortedTables = {
//   [key: string]: FiveSeasonsLeagueTableType
// }

// const tableSortFunction = (tableArray: FiveSeasonsLeagueTableType) => {
//   const seasonArray = tableArray.reduce((seasons, table) => {
//     if (!seasons[table.season.year]) {
//       seasons[table.season.year] = []
//     }
//     seasons[table.season.year].push(table)
//     return seasons
//   }, {} as SortedTables)

//   const sortedTables = Object.keys(seasonArray).map((season) => {
//     return {
//       season,
//       tables: seasonArray[season],
//     }
//   })
//   return sortedTables
//     .sort((a, b) => {
//       if (a.season > b.season) {
//         return 1
//       } else if (a.season < b.season) {
//         return -1
//       } else return 0
//     })
//     .slice(-5)
// }

function getFinalsAndWinsString(
  teamName: string,
  finalsAndWins: TeamGame[]
): string {
  const finals = finalsAndWins.length
  const golds = finalsAndWins.filter((table) => table.win === true).length
  let winString = ''
  winString += finalsAndWins
    .filter((table) => table.win === true)
    .reduce((str, winYear) => `${str}, ${winYear.date.slice(0, 4)}`, '')
  if (finals > 0 && golds > 0) {
    return `${teamName} har spelat ${
      finals === 1 ? 'en finalmatch' : `${finals} finalmatcher`
    } och vunnit ${
      golds === 1
        ? `en gång (${winString.slice(2)}).`
        : `${golds} gånger (${winString.slice(2)}).`
    }`
  } else if (finals > 0) {
    return `${teamName} har spelat ${
      finals === 1 ? 'en finalmatch' : `${finals} finalmatcher`
    } men har aldrig vunnit.`
  }

  return ''
}

function getPlayoffCountString(playoffCount: number): string {
  if (playoffCount > 1) {
    return `Laget har kvalificerat sig för slutspel ${playoffCount} gånger.`
  } else if (playoffCount === 1) {
    return 'Laget har kvalificerat sig för slutspel en gång.'
  } else {
    return 'Laget har inte kvalificerat sig för slutspel genom seriespel.'
  }

  return ''
}

function getSeasonStrings({
  firstDivSeasons,
  qualificationSeasons,
  allSeasons,
  teamName,
  teamCity,
  latestFirstDivSeason,
  firstFirstDivSeason,
}: {
  firstDivSeasons: number
  qualificationSeasons: number
  allSeasons: {
    rows: TeamSeason[]
    count: number
  }
  teamName: string
  teamCity: string
  latestFirstDivSeason: z.infer<typeof parseFirstLatestFirstDivSeason>
  firstFirstDivSeason: z.infer<typeof parseFirstLatestFirstDivSeason>
}): string {
  let firstDivString

  if (firstDivSeasons === 1) {
    firstDivString = 'spelat en säsong'
  } else if (firstDivSeasons > 1) {
    firstDivString = `spelat ${firstDivSeasons} säsonger`
  } else {
    firstDivString = 'inte spelat någon säsong'
  }

  let qualificationString
  if (qualificationSeasons === 0) {
    qualificationString = ''
  } else if (qualificationSeasons === 1) {
    qualificationString =
      'Laget har kvalat mot motstånd från högsta serien vid ett tillfälle.\n'
  } else {
    qualificationString = `Laget har kvalat mot motstånd från högsta serien vid ${qualificationSeasons} tillfällen.\n`
  }

  const firstDbSeason = allSeasons.rows[0]
  const latestDbSeason = allSeasons.rows[allSeasons.rows.length - 1]

  let allSeasonsString
  if (allSeasons.count === firstDivSeasons) {
    if (allSeasons.count === 1) {
      allSeasonsString = `Den säsongen spelades ${firstDbSeason.season.year}.\n`
    } else {
      allSeasonsString = `Första säsongen var ${
        firstFirstDivSeason && firstFirstDivSeason.year
      }, och den senaste ${
        latestFirstDivSeason && latestFirstDivSeason.year
      }.\n`
    }
  } else if (allSeasons.count === 1) {
    allSeasonsString = `Totalt har laget en säsong i databasen, den spelades ${firstDbSeason.season.year}.\n`
  } else {
    allSeasonsString = `Totalt har laget ${allSeasons.count} säsonger i databasen, `
    if (firstDivSeasons === 1) {
      allSeasonsString += `säsongen ${
        firstFirstDivSeason && firstFirstDivSeason.year
      } i högsta serien.\n`
    } else if (
      firstDivSeasons > 1 &&
      firstFirstDivSeason &&
      latestFirstDivSeason
    ) {
      if (firstDbSeason.season.seasonId === firstFirstDivSeason.seasonId) {
        allSeasonsString += `första säsongen i högsta serien spelades ${firstDbSeason.season.year}.\n `
      } else if (firstDbSeason.season.seasonId < firstFirstDivSeason.seasonId) {
        allSeasonsString += `första säsongen är ${firstDbSeason.season.year} (medan laget debuterade i högsta serien ${firstFirstDivSeason.year}).\n `
      }
      if (latestDbSeason.season.seasonId === latestFirstDivSeason.seasonId) {
        allSeasonsString += `Senaste säsongen i högsta serien är ${latestDbSeason.season.year}.\n`
      } else if (
        latestDbSeason.season.seasonId > latestFirstDivSeason.seasonId
      ) {
        allSeasonsString += `Senaste säsongen i databasen är ${latestDbSeason.season.year}, och senast laget var i högsta serien är säsongen ${latestFirstDivSeason.year}.\n`
      }
    } else if (firstDivSeasons === 0) {
      allSeasonsString += `mellan ${firstDbSeason.season.year} och ${latestDbSeason.season.year}.\n`
    }
  }

  const returnString = `${teamName} från ${teamCity} har ${firstDivString} i högsta divisionen.\n ${allSeasonsString} ${qualificationString}`
  return returnString
}

function getBarChartData(
  chartData: z.infer<typeof parseChartData>,
  women: boolean
) {
  const baseLinePosition = women ? 10 : 17
  const baseLineSeasonId = women ? 161 : 101

  return chartData
    .filter((year) => year.seasonId > baseLineSeasonId)
    .filter((year) => year.position !== null)
    .map((year) => {
      return {
        year: year.year.slice(-4),
        dataPoint: year.position ? baseLinePosition - year.position : 0,
        position: year.position,
        points: year.points,
      }
    })
}

function tickParser(item: z.infer<typeof chartItem>, level: number): string {
  if (level > 1 && !item.qualification) {
    if (level === 2) return 'Näst högsta divisionen'
    if (level === 3) return 'Lägre division'
  } else if (item.gold) return 'SM-Guld'
  else if (item.final) return 'Final'
  else if (item.semi) return 'Semi'
  else if (item.quarter) return 'Kvart'
  else if (item.eight) return 'Åttondel'
  else if (item.negQualification) return 'Kval'
  else if (item.qualification) return 'Kval'
  else if (item.teamseasonId) return 'Grundserie'
  return 'Lägre division'
}

function dataPointParser(
  item: z.infer<typeof chartItem>,
  level: number
): number {
  if (level > 1 && !item.qualification) {
    if (level === 2) return 2
    if (level === 3) return 1
  } else if (item.gold) return 9
  else if (item.final) return 8
  else if (item.semi) return 7
  else if (item.quarter) return 6
  else if (item.eight) return 5
  else if (item.negQualification) return 3
  else if (item.qualification) return 3
  else if (item.teamseasonId) return 4
  return 0
}

function getLineArray(
  chartData: z.infer<typeof parseChartData>,
  seriesArray: { seasonId: number; level: number }[]
) {
  return chartData.map((item) => {
    const level = seriesArray.find(
      (serie) => serie.seasonId === item.seasonId
    )?.level
    return {
      year: item.year.slice(-4),
      tick: tickParser(item, level!),
      dataPoint: dataPointParser(item, level!),
    }
  })
}

function getRenderData(
  chartData: z.infer<typeof parseChartData>,
  seriesArray: { seasonId: number; level: number }[]
) {
  const lineChartData = getLineArray(chartData, seriesArray)

  const perChunk = 16

  const renderData = lineChartData
    .reverse()
    .reduce(
      (resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perChunk)

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []
        }

        resultArray[chunkIndex].unshift(item)

        return resultArray
      },
      [] as {
        year: string
        tick: string
        dataPoint: number
      }[][]
    )
    .reverse()

  return renderData
}
