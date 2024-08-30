import Game from '../../models/Game'
import TeamTable from '../../models/TeamTable'
import { SortedGames } from './getSeasonGames'

type TableObjectType = {
  women: boolean
  team: number
  lag: {
    name: string
    shortName: string
    casualName: string
  }
  totalDraws: number
  totalGames: number
  totalGoalDifference: number
  totalGoalsConceded: number
  totalGoalsScored: number
  totalLost: number
  totalPoints: number
  totalWins: number
  group: string
}

type SortedTableGroups = {
  [key: string]: TableObjectType[]
}

type SortedStaticTableGroups = {
  [key: string]: TeamTable[]
}

type SeriesData = {
  group: string
  comment: string
  name: string
  serieStructure: number[]
}

const sortOrder = [
  'final',
  'S1',
  'S2',
  'Q1',
  'Q2',
  'Q3',
  'Q4',
  'E1',
  'E2',
  'E3',
  'E4',
  'elitserien',
  'ElitA',
  'ElitB',
  'DamElit',
  'ElitNorr',
  'ElitSyd',
  'allsvenskan',
  'AllsvNorr',
  'AllsvSyd',
  'DamAllsvNorrForts',
  'DamAllsvSydForts',
  'DamAllsvNorr',
  'DamAllsvMitt',
  'DamAllsvSyd',
  'Div1Norr',
  'Div1Central',
  'Div1Ost',
  'Div1Vast',
  'Div1Syd',
  'AvdA',
  'AvdB',
  'AvdC',
  'AvdD',
  'KvalA',
  'KvalB',
  'Div1NorrA',
  'Div1NorrB',
  'Div1SydA',
  'Div1SydB',
  'NedflyttningNorr',
  'NedflyttningSyd',
  'SlutspelA',
  'SlutspelB',
  'final',
  'semi',
  'quarter',
  'eight',
  'regular',
  'qualification',
  'Totalt',
  'Hemma',
  'Borta',
  'Oavgjort',
]

export const tableSortFunction = (
  tableArray: TableObjectType[],
  seriesData: SeriesData[]
) => {
  const groupArray = tableArray.reduce((groups, table) => {
    if (!groups[table.group]) {
      groups[table.group] = []
    }
    groups[table.group].push(table)
    return groups
  }, {} as SortedTableGroups)

  const sortedTables = Object.keys(groupArray).map((group) => {
    const seriesObject = seriesData.find((serie) => serie.group === group)
    return {
      group,
      name: seriesObject?.name ?? '',
      comment: seriesObject?.comment ?? '',
      serieStructure: seriesObject?.serieStructure ?? [],
      tables: groupArray[group],
    }
  })

  return sortedTables.sort((a, b) => {
    if (sortOrder.indexOf(a.group) > sortOrder.indexOf(b.group)) {
      return 1
    } else if (sortOrder.indexOf(a.group) < sortOrder.indexOf(b.group)) {
      return -1
    } else {
      return 0
    }
  })
}

export const sortPlayoffTables = (tableArray: TableObjectType[]) => {
  const groupArray = tableArray.reduce((groups, table) => {
    if (!groups[table.group]) {
      groups[table.group] = []
    }
    groups[table.group].push(table)
    return groups
  }, {} as SortedTableGroups)

  const sortedTables = Object.keys(groupArray).map((group) => {
    return {
      group,
      tables: groupArray[group],
    }
  })

  return sortedTables.sort((a, b) => {
    if (sortOrder.indexOf(a.group) > sortOrder.indexOf(b.group)) {
      return 1
    } else if (sortOrder.indexOf(a.group) < sortOrder.indexOf(b.group)) {
      return -1
    } else {
      return 0
    }
  })
}

type SortedPlayoffTables = ReturnType<typeof sortPlayoffTables>

export function getResultAndTeams(tables: SortedPlayoffTables, group: string) {
  const tableObject = tables.find((table) => table.group === group)
  const groupTables = tableObject?.tables.sort(
    (a, b) => b.totalWins - a.totalWins
  )
  if (!groupTables) throw Error('Missing tbales')
  return {
    result: `${groupTables[0].totalWins} - ${groupTables[1].totalWins}`,
    homeTeam: groupTables[0].lag,
    awayTeam: groupTables[1].lag,
  }
}

export function getResultString(
  tables: SortedPlayoffTables,
  gameArray: SortedGames,
  group: string
) {
  let resultString
  const tableObject = tables.find((tableGroup) => tableGroup.group === group)
  if (tables.length === 0) {
    resultString = '0-0'
  } else if (tableObject) {
    const gameObject = gameArray.find(
      (group) => group.group === tableObject.group
    )
    const actualTableObject = tableObject.tables.find(
      (team) => team.team === gameObject?.dates[0].games[0].homeTeamId
    )
    if (!actualTableObject) {
      resultString = ''
      return
    }
    resultString = `${actualTableObject.totalWins}-${actualTableObject.totalLost}`
  } else {
    resultString = ''
  }

  return resultString
}

export function getTeams(gameArray: Game[]) {
  return {
    homeTeamId: gameArray[0].homeTeamId,
    homeTeam: gameArray[0].homeTeam,
    awayTeamId: gameArray[0].awayTeamId,
    awayTeam: gameArray[0].awayTeam,
  }
}

export const staticTableSortFunction = (
  tableArray: TeamTable[],
  seriesData: SeriesData[]
) => {
  const groupArray = tableArray.reduce((groups, table) => {
    if (!groups[table.group]) {
      groups[table.group] = []
    }
    groups[table.group].push(table)
    return groups
  }, {} as SortedStaticTableGroups)

  const sortedTables = Object.keys(groupArray).map((group) => {
    const seriesObject = seriesData.find((serie) => serie.group === group)
    return {
      group,
      name: seriesObject?.name ?? '',
      comment: seriesObject?.comment ?? '',
      serieStructure: seriesObject?.serieStructure ?? [],
      tables: groupArray[group],
    }
  })

  return sortedTables.sort((a, b) => {
    if (sortOrder.indexOf(a.group) > sortOrder.indexOf(b.group)) {
      return 1
    } else if (sortOrder.indexOf(a.group) < sortOrder.indexOf(b.group)) {
      return -1
    } else {
      return 0
    }
  })
}
