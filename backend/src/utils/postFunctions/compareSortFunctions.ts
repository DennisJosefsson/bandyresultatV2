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

export const compareSortFunction = (
  compareArray: z.infer<typeof compareCategoryTeamTables>
) => {
  const sortCategories = compareArray.reduce((categories, team) => {
    if (!categories[team.category]) {
      categories[team.category] = []
    }
    categories[team.category].push(team)
    return categories
  }, {} as SortedCompareCategoryTables)

  const sortedCategories = Object.keys(sortCategories).map((category) => {
    return {
      category,
      teams: sortCategories[category],
    }
  })

  return sortedCategories.sort((a, b) => {
    if (sortOrder.indexOf(a.category) > sortOrder.indexOf(b.category)) {
      return 1
    } else if (sortOrder.indexOf(a.category) < sortOrder.indexOf(b.category)) {
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
    if (!newArray.find((teamItem) => team.teamId === teamItem.teamId)) {
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
    newArray[teamIndex].totalGoalsScored += team.totalGoalsScored
    newArray[teamIndex].totalGoalsConceded += team.totalGoalsConceded
    newArray[teamIndex].totalGoalDifference += team.totalGoalDifference
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
            (a, b) => getTime(new Date(b.date)) - getTime(new Date(a.date))
          ) || []
      : firstAndLatestGames
          .filter((game) => game.ranked_last_games === '1')
          .sort(
            (a, b) => getTime(new Date(b.date)) - getTime(new Date(a.date))
          ) || []

  return latestGames
}

// export const filterOpposition = (array: CompareAllTeamTables[]) => {
//   const tempArray: string[] = []

//   const callback = (item: CompareAllTeamTables) => {
//     if (tempArray.includes(item.lag.casualName + item.opp.casualName)) {
//       return false
//     } else {
//       tempArray.push(item.opp.casualName + item.lag.casualName)
//       return true
//     }
//   }

//   return array.filter(callback)
// }
