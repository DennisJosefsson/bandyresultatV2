import {
  leagueTable,
  LeagueTableType,
  MiniTableItemArray,
  TableItem,
} from '../responseTypes/tableTypes.js'

const defaultTable = {
  teamId: 0,
  totalDraws: 0,
  totalGames: 0,
  totalGoalDifference: 0,
  totalGoalsConceded: 0,
  totalGoalsScored: 0,
  totalLost: 0,
  totalPoints: 0,
  totalWins: 0,
}

export const leagueTableParser = (
  teamArray: MiniTableItemArray,
  tabell: LeagueTableType
): LeagueTableType => {
  teamArray.forEach((teamItem) => {
    const tableItemExist = tabell.find(
      (table) =>
        table.teamId === teamItem.teamId &&
        table.group === teamItem.group
    )
    if (!tableItemExist) {
      const teamTable: TableItem = {
        ...teamItem,
        ...defaultTable,
      }
      tabell.push(teamTable)
    } else {
      return
    }
  })

  const parsedTable = leagueTable.parse(tabell)
  return parsedTable
}

export const leagueTableWithBaseParser = (
  baseTable: LeagueTableType,
  contTable: LeagueTableType
) => {
  baseTable.forEach((team) => {
    const teamContTableItem = contTable.find(
      (contTeam) => contTeam.teamId === team.teamId
    )
    if (teamContTableItem) {
      team.totalGames += teamContTableItem.totalGames
      team.totalWins += teamContTableItem.totalWins
      team.totalDraws += teamContTableItem.totalDraws
      team.totalLost += teamContTableItem.totalLost
      team.totalGoalsScored +=
        teamContTableItem.totalGoalsScored
      team.totalGoalsConceded +=
        teamContTableItem.totalGoalsConceded
      team.totalGoalDifference +=
        teamContTableItem.totalGoalDifference
      team.totalPoints += teamContTableItem.totalPoints
    } else {
      return
    }
  })

  const parsedTable = leagueTable.parse(baseTable)
  return parsedTable
}
