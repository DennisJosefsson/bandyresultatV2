import { developmentDates } from '@/lib/types/games/development'
import { z } from 'zod'

export function getTable(
  range: number[],
  tableData: z.infer<typeof developmentDates>
) {
  if (range.length !== 2) throw Error('Felaktig range data')
  const start = range[0]
  const end = range[1]
  if (end > tableData.length) return
  const startDate = tableData[start].date
  const endDate = tableData[end].date

  if (start === 0) {
    return {
      startDate,
      endDate,
      table: tableData[end].table,
    }
  }

  const startTable = tableData[start - 1].table
  const endTable = tableData[end].table

  const table = endTable
    .map((item) => {
      const startItem = startTable.find((start) => start.teamId === item.teamId)
      if (!startItem) {
        throw Error('Felaktig data')
      }

      return {
        ...item,
        table: {
          position: item.table.position,
          games: item.table.games - startItem.table.games,
          wins: item.table.wins - startItem.table.wins,
          draws: item.table.draws - startItem.table.draws,
          lost: item.table.lost - startItem.table.lost,
          scoredGoals: item.table.scoredGoals - startItem.table.scoredGoals,
          concededGoals:
            item.table.concededGoals - startItem.table.concededGoals,
          points: item.table.points - startItem.table.points,
        },
      }
    })
    .sort((a, b) => {
      if (a.table.points === b.table.points) {
        if (
          b.table.scoredGoals - b.table.concededGoals ===
          a.table.scoredGoals - a.table.concededGoals
        ) {
          return b.table.scoredGoals - a.table.scoredGoals
        }
        return (
          b.table.scoredGoals -
          b.table.concededGoals -
          (a.table.scoredGoals - a.table.concededGoals)
        )
      }
      return b.table.points - a.table.points
    })

  return {
    startDate,
    endDate,
    table,
  }
}
