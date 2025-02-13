import { z } from 'zod'
import {
  compareAllTeamTables,
  compareCategoryTeamTables,
  newCompareObject,
  parseFirstLast,
} from '../responseTypes/tableTypes'
import { sortOrder } from './constants.js'

type SortedCompareCategoryTables = {
  [key: string]: z.infer<typeof compareCategoryTeamTables>
}

type SortedTables = {
  [key: string]: z.infer<typeof compareCategoryTeamTables>
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

export const compareSortLevelFunction = (
  gamesArray: z.infer<typeof compareCategoryTeamTables>
) => {
  const sortLevels = gamesArray.reduce((levels, table) => {
    if (!levels[table.serie.level]) {
      levels[table.serie.level] = []
    }
    levels[table.serie.level].push(table)
    return levels
  }, {} as SortedCompareCategoryTables)

  const sortedLevels = Object.keys(sortLevels).map(
    (level) => {
      return {
        level,
        categories: sortLevels[level],
      }
    }
  )

  const sortLevelsAndTables = sortedLevels.map(
    (levelObject) => {
      const sortCats = levelObject.categories.reduce(
        (category, table) => {
          if (!category[table.category]) {
            category[table.category] = []
          }
          category[table.category].push(table)
          return category
        },
        {} as SortedTables
      )

      const sortedTables = Object.keys(sortCats).map(
        (cat) => {
          return {
            category: cat,
            tables: sortCats[cat],
          }
        }
      )
      return {
        level: levelObject['level'],
        levelName: levelName[levelObject['level']],
        tables: sortedTables,
      }
    }
  )

  return sortLevelsAndTables.sort(
    (a, b) => parseInt(a.level) - parseInt(b.level)
  )
}

export const compareSortFunction = (
  compareArray: z.infer<typeof compareCategoryTeamTables>
) => {
  const sortCategories = compareArray.reduce(
    (categories, team) => {
      if (!categories[team.category]) {
        categories[team.category] = []
      }
      categories[team.category].push(team)
      return categories
    },
    {} as SortedCompareCategoryTables
  )

  const sortedCategories = Object.keys(sortCategories).map(
    (category) => {
      return {
        category,
        teams: sortCategories[category],
      }
    }
  )

  return sortedCategories.sort((a, b) => {
    if (
      sortOrder.indexOf(a.category) >
      sortOrder.indexOf(b.category)
    ) {
      return 1
    } else if (
      sortOrder.indexOf(a.category) <
      sortOrder.indexOf(b.category)
    ) {
      return -1
    } else {
      return 0
    }
  })
}

export const compareAllTeamData = (
  allDataArray: z.infer<typeof compareAllTeamTables>
) => {
  const newArray: z.infer<typeof newCompareObject> = []

  allDataArray.forEach((team) => {
    if (
      !newArray.find(
        (teamItem) => team.teamId === teamItem.teamId
      )
    ) {
      newArray.push({
        teamId: team.teamId,
        team: {
          casualName: team.team.casualName,
          name: team.team.name,
          teamId: team.team.teamId,
          shortName: team.team.shortName,
        },
        totalGames: 0,
        totalWins: 0,
        totalDraws: 0,
        totalLost: 0,
        totalGoalDifference: 0,
        totalGoalsScored: 0,
        totalGoalsConceded: 0,
        totalPoints: 0,
      })
    }
    const teamIndex = newArray.findIndex(
      (teamItem) => team.teamId === teamItem.teamId
    )
    newArray[teamIndex].totalGames += team.totalGames
    newArray[teamIndex].totalWins += team.totalWins
    newArray[teamIndex].totalDraws += team.totalDraws
    newArray[teamIndex].totalLost += team.totalLost
    newArray[teamIndex].totalGoalsScored +=
      team.totalGoalsScored
    newArray[teamIndex].totalGoalsConceded +=
      team.totalGoalsConceded
    newArray[teamIndex].totalGoalDifference +=
      team.totalGoalDifference
    newArray[teamIndex].totalPoints += team.totalPoints
  })

  return newArray.sort((a, b) => {
    if (a.totalPoints < b.totalPoints) {
      return 1
    } else if (a.totalPoints > b.totalPoints) {
      return -1
    } else {
      return 0
    }
  })
}

const getTime = (date?: Date): number => {
  return date != null ? date.getTime() : 0
}

export const getLatestGames = (
  teamArray: number[],
  firstAndLatestGames: z.infer<typeof parseFirstLast>
) => {
  const latestGames =
    teamArray.length === 2
      ? firstAndLatestGames
          .filter((game) => game.ranked_first_games !== '1')
          .sort(
            (a, b) =>
              getTime(new Date(b.date)) -
              getTime(new Date(a.date))
          )
          .slice(0, 10) || []
      : firstAndLatestGames
          .filter((game) => game.ranked_last_games === '1')
          .sort(
            (a, b) =>
              getTime(new Date(b.date)) -
              getTime(new Date(a.date))
          ) || []

  return latestGames
}
