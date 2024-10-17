import Season from '../../../models/Season.js'
import Serie from '../../../models/Serie.js'
import TeamGame from '../../../models/TeamGame.js'
import TeamSeason from '../../../models/TeamSeason.js'
import TeamTable from '../../../models/TeamTable.js'
import { sequelize } from '../../../utils/db.js'
import { sortOrder } from '../../../utils/postFunctions/constants.js'
import {
  fiveSeasonsLeagueTable,
  FiveSeasonsLeagueTableType,
} from '../../../utils/responseTypes/tableTypes.js'

export const getLatestFiveSeasons = async ({ teamId }: { teamId: number }) => {
  const latestFiveSeasonArray = await TeamSeason.findAll({
    where: { teamId },
    order: [['seasonId', 'desc']],
    limit: 5,
    raw: true,
    nest: true,
  })

  const seasonIdArray = latestFiveSeasonArray.map((season) => season.seasonId)
  const tables = await TeamGame.findAll({
    where: {
      teamId: teamId,
      played: true,
      seasonId: seasonIdArray,
    },
    attributes: [
      'seasonId',
      'group',
      [sequelize.literal('count(*)'), 'totalGames'],
      [sequelize.literal('sum (points)'), 'totalPoints'],
      [sequelize.literal('sum(goals_scored)'), 'totalGoalsScored'],
      [sequelize.literal('sum(goals_conceded)'), 'totalGoalsConceded'],
      [sequelize.literal('sum(goal_difference)'), 'totalGoalDifference'],
      [sequelize.literal(`(count(*) filter (where win))`), 'totalWins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'totalDraws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'totalLost'],
    ],
    include: [Season, { model: Serie, attributes: ['serieName'] }],
    group: [
      'teamgame.season_id',
      'group',
      'season.season_id',
      'serie.serie_name',
      'teamgame.category',
    ],
    order: [
      ['seasonId', 'DESC'],
      ['category', 'ASC'],
    ],
    limit: 20,
    raw: true,
    nest: true,
  })

  const tableSeasons = new Set(tables.map((season) => season.seasonId))

  const unparsedSeasons = seasonIdArray.filter((id) => !tableSeasons.has(id))

  if (unparsedSeasons.length === 0) {
    return tableSort(fiveSeasonsLeagueTable.parse(tables))
  } else {
    const teamTables = await TeamTable.findAll({
      where: {
        teamId: teamId,
        seasonId: seasonIdArray,
      },
      include: [Season, Serie],
      raw: true,
      nest: true,
    })

    const parsedTables = fiveSeasonsLeagueTable.parse(tables)
    const parsedTeamTables = fiveSeasonsLeagueTable.parse(teamTables)

    return tableSort(
      [...parsedTables, ...parsedTeamTables].sort(
        (a, b) => b.seasonId - a.seasonId
      )
    )
  }
}

type SortedTables = {
  [key: string]: FiveSeasonsLeagueTableType
}

function tableSort(tableArray: FiveSeasonsLeagueTableType) {
  const seasonArray = tableArray.reduce((seasons, table) => {
    if (!seasons[table.season.year]) {
      seasons[table.season.year] = []
    }
    seasons[table.season.year].push(table)
    return seasons
  }, {} as SortedTables)

  const sortedTables = Object.keys(seasonArray).map((season) => {
    return {
      season,
      tables: seasonArray[season].sort(
        (a, b) => sortOrder.indexOf(a.group) - sortOrder.indexOf(b.group)
      ),
    }
  })
  return sortedTables
}
