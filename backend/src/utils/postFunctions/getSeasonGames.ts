import Game from '../../models/Game'
import Season from '../../models/Season'
import Serie from '../../models/Serie'

type SortedGameGroups = {
  [key: string]: Game[]
}

type SortedDates = {
  [key: string]: Game[]
}

type SeriesData = { group: string; comment: string; name: string }

export const getSeasonGames = (
  games: Game[],
  season: Season[],
  series: Serie[]
) => {
  const seriesData = series.map((serie) => {
    return {
      group: serie.serieGroupCode,
      comment: serie.comment,
      name: serie.serieName,
    }
  }) as SeriesData[]

  const playedGames = games.filter((game) => game.played === true)
  const unplayedGames = games.filter((game) => !game.played)
  const unplayedGamesLength = unplayedGames.length
  const playedGamesLength = playedGames.length

  const unsortedPlayedFinalGames = playedGames.filter(
    (game) => game.category === 'final'
  )

  const unsortedPlayedSemiGames = playedGames.filter(
    (game) => game.category === 'semi'
  )

  const unsortedPlayedQuarterGames = playedGames.filter(
    (game) => game.category === 'quarter'
  )

  const unsortedPlayedEightGames = playedGames.filter(
    (game) => game.category === 'eight'
  )

  const unsortedPlayedRegularGames = playedGames.filter(
    (game) => game.category === 'regular'
  )

  const unsortedPlayedQualificationGames = playedGames.filter(
    (game) => game.category === 'qualification'
  )

  const unsortedUnplayedFinalGames = unplayedGames.filter(
    (game) => game.category === 'final'
  )

  const unsortedUnplayedSemiGames = unplayedGames.filter(
    (game) => game.category === 'semi'
  )

  const unsortedUnplayedQuarterGames = unplayedGames.filter(
    (game) => game.category === 'quarter'
  )

  const unsortedUnplayedEightGames = unplayedGames.filter(
    (game) => game.category === 'eight'
  )

  const unsortedUnplayedRegularGames = unplayedGames.filter(
    (game) => game.category === 'regular'
  )

  const unsortedUnplayedQualificationGames = unplayedGames.filter(
    (game) => game.category === 'qualification'
  )

  const playedFinalGames = gameSortFunction(
    unsortedPlayedFinalGames,
    seriesData,
    true
  )
  const playedSemiGames = gameSortFunction(
    unsortedPlayedSemiGames,
    seriesData,
    true
  )
  const playedQuarterGames = gameSortFunction(
    unsortedPlayedQuarterGames,
    seriesData,
    true
  )
  const playedEightGames = gameSortFunction(
    unsortedPlayedEightGames,
    seriesData,
    true
  )
  const playedRegularGames = gameSortFunction(
    unsortedPlayedRegularGames,
    seriesData,
    true
  )
  const playedQualificationGames = gameSortFunction(
    unsortedPlayedQualificationGames,
    seriesData,
    true
  )
  const unplayedFinalGames = gameSortFunction(
    unsortedUnplayedFinalGames,
    seriesData
  )
  const unplayedSemiGames = gameSortFunction(
    unsortedUnplayedSemiGames,
    seriesData
  )
  const unplayedQuarterGames = gameSortFunction(
    unsortedUnplayedQuarterGames,
    seriesData
  )
  const unplayedEightGames = gameSortFunction(
    unsortedUnplayedEightGames,
    seriesData
  )
  const unplayedRegularGames = gameSortFunction(
    unsortedUnplayedRegularGames,
    seriesData
  )
  const unplayedQualificationGames = gameSortFunction(
    unsortedUnplayedQualificationGames,
    seriesData
  )

  const returnObject = {
    played: {
      FinalGames: playedFinalGames,
      SemiGames: playedSemiGames,
      QuarterGames: playedQuarterGames,
      EightGames: playedEightGames,
      RegularGames: playedRegularGames,
      QualificationGames: playedQualificationGames,
    },
    unplayed: {
      FinalGames: unplayedFinalGames,
      SemiGames: unplayedSemiGames,
      QuarterGames: unplayedQuarterGames,
      EightGames: unplayedEightGames,
      RegularGames: unplayedRegularGames,
      QualificationGames: unplayedQualificationGames,
    },
    unplayedLength: unplayedGamesLength,
    playedLength: playedGamesLength,
    season: season ?? [],
    series: series ?? [],
  }

  return returnObject
}

export function gameSortFunction(
  gamesArray: Game[],
  seriesData: SeriesData[],
  played = false
) {
  const sortGroups = gamesArray.reduce((groups, game) => {
    if (!groups[game.group]) {
      groups[game.group] = []
    }
    groups[game.group].push(game)
    return groups
  }, {} as SortedGameGroups)

  const sortedGames = Object.keys(sortGroups).map((group) => {
    const seriesObject = seriesData.find((serie) => serie.group === group)

    return {
      group,
      name: seriesObject?.name ?? '',
      comment: seriesObject?.comment ?? '',
      games: sortGroups[group],
    }
  })

  const sortGroupsAndDates = sortedGames.map((groupObject) => {
    const sortDates = groupObject.games.reduce((dates, game) => {
      if (!dates[game.date]) {
        dates[game.date] = []
      }
      dates[game.date].push(game)
      return dates
    }, {} as SortedDates)

    const sortedGameDates = Object.keys(sortDates).map((date) => {
      return {
        date,
        games: sortDates[date],
      }
    })
    return {
      group: groupObject['group'],
      name: groupObject['name'],
      comment: groupObject['comment'],
      dates: played ? sortedGameDates.reverse() : sortedGameDates,
    }
  })

  return sortGroupsAndDates
}

export type SortedGames = ReturnType<typeof gameSortFunction>
