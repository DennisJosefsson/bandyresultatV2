import { compareCategoryTeamTable } from '../types/tables/tables'
import { sortOrder } from './constants'

import { z } from 'zod'
import { SortedStatsCat } from '../types/stats/stats'

// export const gameSortFunction = (
//   gamesArray: GameObjectType[],
//   played = false
// ) => {
//   const sortGroups = gamesArray.reduce((groups, game) => {
//     if (!groups[game.group]) {
//       groups[game.group] = []
//     }
//     groups[game.group].push(game)
//     return groups
//   }, {} as SortedGameGroups)

//   const sortedGames = Object.keys(sortGroups).map((group) => {
//     return {
//       group,
//       games: sortGroups[group],
//     }
//   })

//   const sortGroupsAndDates = sortedGames.map((groupObject) => {
//     const sortDates = groupObject.games.reduce((dates, game) => {
//       if (!dates[game.date]) {
//         dates[game.date] = []
//       }
//       dates[game.date].push(game)
//       return dates
//     }, {} as SortedDates)

//     const sortedGameDates = Object.keys(sortDates).map((date) => {
//       return {
//         date,
//         games: sortDates[date],
//       }
//     })
//     return {
//       group: groupObject['group'],
//       dates: played ? sortedGameDates.reverse() : sortedGameDates,
//     }
//   })

//   return sortGroupsAndDates
// }

// export type SortedGamesType = ReturnType<typeof gameSortFunction>

// export const tableSortFunction = (tableArray: TableObjectType[]) => {
//   const groupArray = tableArray.reduce((groups, table) => {
//     if (!groups[table.group]) {
//       groups[table.group] = []
//     }
//     groups[table.group].push(table)
//     return groups
//   }, {} as SortedTableGroups)

//   const sortedTables = Object.keys(groupArray).map((group) => {
//     return {
//       group,
//       tables: groupArray[group],
//     }
//   })

//   return sortedTables.sort((a, b) => {
//     if (sortOrder.indexOf(a.group) > sortOrder.indexOf(b.group)) {
//       return 1
//     } else if (sortOrder.indexOf(a.group) < sortOrder.indexOf(b.group)) {
//       return -1
//     } else {
//       return 0
//     }
//   })
// }

// export type SortedTablesType = ReturnType<typeof tableSortFunction>

export const filterOpposition = (
  array: z.infer<typeof compareCategoryTeamTable>[]
) => {
  const tempArray: string[] = []

  const callback = (item: z.infer<typeof compareCategoryTeamTable>) => {
    if (tempArray.includes(item.team.casualName + item.opponent.casualName)) {
      return false
    } else {
      tempArray.push(item.opponent.casualName + item.team.casualName)
      return true
    }
  }

  return array.filter(callback)
}

export const sortStatsCat = (array: SortedStatsCat[]) => {
  return array.sort((a, b) => {
    if (sortOrder.indexOf(a.category) > sortOrder.indexOf(b.category)) {
      return 1
    } else if (sortOrder.indexOf(a.category) < sortOrder.indexOf(b.category)) {
      return -1
    } else {
      return 0
    }
  })
}

type ChartData = {
  data: number
  category: string
}

export const sortChartData = (array: ChartData[]) => {
  return array.sort((a, b) => {
    if (sortOrder.indexOf(a.category) > sortOrder.indexOf(b.category)) {
      return 1
    } else if (sortOrder.indexOf(a.category) < sortOrder.indexOf(b.category)) {
      return -1
    } else {
      return 0
    }
  })
}

type TotalBarChartData = {
  avgAll: number | undefined
  totAll: number | undefined
  avgAway: number | undefined
  totAway: number | undefined
  avgHome: number | undefined
  totHome: number | undefined
  category: string
}

export const sortTotalBarChartData = (
  array: TotalBarChartData[] | undefined
) => {
  if (!array) return
  return array.sort((a, b) => {
    if (sortOrder.indexOf(a.category) > sortOrder.indexOf(b.category)) {
      return 1
    } else if (sortOrder.indexOf(a.category) < sortOrder.indexOf(b.category)) {
      return -1
    } else {
      return 0
    }
  })
}
