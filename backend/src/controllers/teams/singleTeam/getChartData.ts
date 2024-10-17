import { QueryTypes } from 'sequelize'
import { z } from 'zod'
import Serie from '../../../models/Serie.js'
import Team from '../../../models/Team.js'
import TeamSerie from '../../../models/TeamSerie.js'
import { sequelize } from '../../../utils/db.js'

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

export const getChartData = async ({ team }: { team: Team }) => {
  const unparsedChartData = await sequelize.query(
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
      bind: { teamId: team.teamId, womensTeam: team.women },
      type: QueryTypes.SELECT,
    }
  )

  const teamseries = await TeamSerie.findAll({
    where: { teamId: team.teamId },
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

  const chartData = parseChartData.parse(unparsedChartData)
  const chartDataLength = chartData.length
  const barChartData = getBarChartData(chartData, team.women)

  const renderData = getRenderData(chartData, seriesArray)

  return { barChartData, renderData, chartDataLength }
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

export function getRenderData(
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
