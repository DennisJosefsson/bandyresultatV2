import { z } from 'zod'
import Serie from '../../../models/Serie.js'
import TeamGame from '../../../models/TeamGame.js'
import TeamTable from '../../../models/TeamTable.js'
import { sequelize } from '../../../utils/db.js'
import {
  groupConstant,
  sortOrder,
} from '../../../utils/postFunctions/constants.js'
import {
  singleTeamTable,
  singleTeamTableItem,
} from '../../../utils/responseTypes/tableTypes.js'

export const getTables = async ({
  teamId,
  seasonIdArray,
}: {
  teamId: number
  seasonIdArray: number[]
}) => {
  const getTables = await TeamGame.findAll({
    where: {
      teamId: teamId,
      played: true,
    },
    include: [{ model: Serie, attributes: ['level'] }],
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
    group: ['serie.level', 'category'],
    order: [
      ['category', 'DESC'],
      ['totalPoints', 'DESC'],
      ['totalGoalDifference', 'DESC'],
      ['totalGoalsScored', 'DESC'],
    ],
    raw: true,
    nest: true,
  })

  const getGamesSeasonId = await TeamGame.findAll({
    where: { teamId },
    attributes: [[sequelize.literal('DISTINCT (season_id)'), 'seasonId']],
    raw: true,
    nest: true,
  })

  const gameSeasonIds = getGamesSeasonId.map((season) => season.seasonId)

  const filteredSeasons = seasonIdArray.filter(
    (season) => !gameSeasonIds.includes(season)
  )

  const teamTables = await TeamTable.findAll({
    where: { teamId, seasonId: filteredSeasons },
    include: [{ model: Serie, attributes: ['level'] }],
    raw: true,
    nest: true,
  })

  const parsedTeamTables = singleTeamTable.parse(teamTables)
  const tables = singleTeamTable.parse(getTables)

  return sortTables([...parsedTeamTables, ...tables])
}

type SortedCompareCategoryTables = {
  [key: string]: z.infer<typeof singleTeamTable>
}

type SortedTables = {
  [key: string]: z.infer<typeof singleTeamTable>
}

type LevelName = {
  [key: string]: string
}

const levelName: LevelName = {
  '1': 'Högsta divisionen',
  '2': 'Näst högsta divisionen',
  '3': 'Tredje divisionen',
  '4': 'Fjärde divisionen',
  '5': 'Femte divisionen',
}

function sortTables(tableArray: z.infer<typeof singleTeamTable>) {
  const sortLevels = tableArray.reduce((levels, table) => {
    if (!levels[table.serie.level]) {
      levels[table.serie.level] = []
    }
    levels[table.serie.level].push(table)
    return levels
  }, {} as SortedCompareCategoryTables)

  const sortedLevels = Object.keys(sortLevels).map((level) => {
    return {
      level,
      categories: sortLevels[level],
    }
  })

  const sortLevelsAndTables = sortedLevels.map((levelObject) => {
    const sortCats = levelObject.categories.reduce((category, table) => {
      if (!category[table.category]) {
        category[table.category] = []
      }
      category[table.category].push(table)
      return category
    }, {} as SortedTables)

    const sortedTables = Object.keys(sortCats).map((cat) => {
      return {
        category: cat,
        categoryName: groupConstant[cat],
        tables: sortCats[cat].reduce(
          (acc, curr) => {
            return {
              category: curr.category,
              serie: curr.serie,
              totalGames: acc.totalGames + curr.totalGames,
              totalWins: acc.totalWins + curr.totalWins,
              totalDraws: acc.totalDraws + curr.totalDraws,
              totalLost: acc.totalLost + curr.totalLost,
              totalGoalsScored: acc.totalGoalsScored + curr.totalGoalsScored,
              totalGoalsConceded:
                acc.totalGoalsConceded + curr.totalGoalsConceded,
              totalGoalDifference:
                acc.totalGoalDifference + curr.totalGoalDifference,
              totalPoints: acc.totalPoints + curr.totalPoints,
            }
          },
          {
            category: cat,
            serie: { level: 1 },
            totalGames: 0,
            totalWins: 0,
            totalDraws: 0,
            totalLost: 0,
            totalGoalsScored: 0,
            totalGoalsConceded: 0,
            totalGoalDifference: 0,
            totalPoints: 0,
          } as z.infer<typeof singleTeamTableItem>
        ),
      }
    })
    return {
      level: levelObject['level'],
      levelName: levelName[levelObject['level']],
      tables: sortedTables.sort(
        (a, b) => sortOrder.indexOf(a.category) - sortOrder.indexOf(b.category)
      ),
    }
  })

  return sortLevelsAndTables.sort(
    (a, b) => parseInt(a.level) - parseInt(b.level)
  )
}
