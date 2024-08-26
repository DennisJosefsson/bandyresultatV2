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
  menSeries: Serie[],
  womenSeries: Serie[]
) => {
  const menSeriesData = menSeries.map((serie) => {
    return {
      group: serie.serieGroupCode,
      comment: serie.comment,
      name: serie.serieName,
    }
  }) as SeriesData[]
  const womenSeriesData = womenSeries.map((serie) => {
    return {
      group: serie.serieGroupCode,
      season: serie.seasonId,
      comment: serie.comment,
      name: serie.serieName,
    }
  }) as SeriesData[]
  const mensGames = games.filter((table) => table.women === false)
  const womensGames = games.filter((table) => table.women === true)
  const playedMensGames = mensGames.filter((game) => game.played === true)
  const unplayedMensGames = mensGames.filter((game) => !game.played)
  const unplayedMensGamesLength = unplayedMensGames.length
  const playedMensGamesLength = playedMensGames.length
  const playedWomensGames = womensGames.filter((game) => game.played === true)
  const unplayedWomensGames = womensGames.filter((game) => !game.played)
  const unplayedWomensGamesLength = unplayedWomensGames.length
  const playedWomensGamesLength = playedWomensGames.length

  const mensUnsortedPlayedFinalGames = playedMensGames.filter(
    (game) => game.category === 'final'
  )

  const mensUnsortedPlayedSemiGames = playedMensGames.filter(
    (game) => game.category === 'semi'
  )

  const mensUnsortedPlayedQuarterGames = playedMensGames.filter(
    (game) => game.category === 'quarter'
  )

  const mensUnsortedPlayedEightGames = playedMensGames.filter(
    (game) => game.category === 'eight'
  )

  const mensUnsortedPlayedRegularGames = playedMensGames.filter(
    (game) => game.category === 'regular'
  )

  const mensUnsortedPlayedQualificationGames = playedMensGames.filter(
    (game) => game.category === 'qualification'
  )

  const mensUnsortedUnplayedFinalGames = unplayedMensGames.filter(
    (game) => game.category === 'final'
  )

  const mensUnsortedUnplayedSemiGames = unplayedMensGames.filter(
    (game) => game.category === 'semi'
  )

  const mensUnsortedUnplayedQuarterGames = unplayedMensGames.filter(
    (game) => game.category === 'quarter'
  )

  const mensUnsortedUnplayedEightGames = unplayedMensGames.filter(
    (game) => game.category === 'eight'
  )

  const mensUnsortedUnplayedRegularGames = unplayedMensGames.filter(
    (game) => game.category === 'regular'
  )

  const mensUnsortedUnplayedQualificationGames = unplayedMensGames.filter(
    (game) => game.category === 'qualification'
  )

  const womensUnsortedPlayedFinalGames = playedWomensGames.filter(
    (game) => game.category === 'final'
  )

  const womensUnsortedPlayedSemiGames = playedWomensGames.filter(
    (game) => game.category === 'semi'
  )

  const womensUnsortedPlayedQuarterGames = playedWomensGames.filter(
    (game) => game.category === 'quarter'
  )

  const womensUnsortedPlayedEightGames = playedWomensGames.filter(
    (game) => game.category === 'eight'
  )

  const womensUnsortedPlayedRegularGames = playedWomensGames.filter(
    (game) => game.category === 'regular'
  )

  const womensUnsortedPlayedQualificationGames = playedWomensGames.filter(
    (game) => game.category === 'qualification'
  )

  const womensUnsortedUnplayedFinalGames = unplayedWomensGames.filter(
    (game) => game.category === 'final'
  )

  const womensUnsortedUnplayedSemiGames = unplayedWomensGames.filter(
    (game) => game.category === 'semi'
  )

  const womensUnsortedUnplayedQuarterGames = unplayedWomensGames.filter(
    (game) => game.category === 'quarter'
  )

  const womensUnsortedUnplayedEightGames = unplayedWomensGames.filter(
    (game) => game.category === 'eight'
  )

  const womensUnsortedUnplayedRegularGames = unplayedWomensGames.filter(
    (game) => game.category === 'regular'
  )

  const womensUnsortedUnplayedQualificationGames = unplayedWomensGames.filter(
    (game) => game.category === 'qualification'
  )

  const mensPlayedFinalGames = gameSortFunction(
    mensUnsortedPlayedFinalGames,
    menSeriesData,
    true
  )
  const mensPlayedSemiGames = gameSortFunction(
    mensUnsortedPlayedSemiGames,
    menSeriesData,
    true
  )
  const mensPlayedQuarterGames = gameSortFunction(
    mensUnsortedPlayedQuarterGames,
    menSeriesData,
    true
  )
  const mensPlayedEightGames = gameSortFunction(
    mensUnsortedPlayedEightGames,
    menSeriesData,
    true
  )
  const mensPlayedRegularGames = gameSortFunction(
    mensUnsortedPlayedRegularGames,
    menSeriesData,
    true
  )
  const mensPlayedQualificationGames = gameSortFunction(
    mensUnsortedPlayedQualificationGames,
    menSeriesData,
    true
  )
  const mensUnplayedFinalGames = gameSortFunction(
    mensUnsortedUnplayedFinalGames,
    menSeriesData
  )
  const mensUnplayedSemiGames = gameSortFunction(
    mensUnsortedUnplayedSemiGames,
    menSeriesData
  )
  const mensUnplayedQuarterGames = gameSortFunction(
    mensUnsortedUnplayedQuarterGames,
    menSeriesData
  )
  const mensUnplayedEightGames = gameSortFunction(
    mensUnsortedUnplayedEightGames,
    menSeriesData
  )
  const mensUnplayedRegularGames = gameSortFunction(
    mensUnsortedUnplayedRegularGames,
    menSeriesData
  )
  const mensUnplayedQualificationGames = gameSortFunction(
    mensUnsortedUnplayedQualificationGames,
    menSeriesData
  )

  const womensPlayedFinalGames = gameSortFunction(
    womensUnsortedPlayedFinalGames,
    womenSeriesData,
    true
  )
  const womensPlayedSemiGames = gameSortFunction(
    womensUnsortedPlayedSemiGames,
    womenSeriesData,
    true
  )
  const womensPlayedQuarterGames = gameSortFunction(
    womensUnsortedPlayedQuarterGames,
    womenSeriesData,
    true
  )
  const womensPlayedEightGames = gameSortFunction(
    womensUnsortedPlayedEightGames,
    womenSeriesData,
    true
  )
  const womensPlayedRegularGames = gameSortFunction(
    womensUnsortedPlayedRegularGames,
    womenSeriesData,
    true
  )
  const womensPlayedQualificationGames = gameSortFunction(
    womensUnsortedPlayedQualificationGames,
    womenSeriesData,
    true
  )
  const womensUnplayedFinalGames = gameSortFunction(
    womensUnsortedUnplayedFinalGames,
    womenSeriesData
  )
  const womensUnplayedSemiGames = gameSortFunction(
    womensUnsortedUnplayedSemiGames,
    womenSeriesData
  )
  const womensUnplayedQuarterGames = gameSortFunction(
    womensUnsortedUnplayedQuarterGames,
    womenSeriesData
  )
  const womensUnplayedEightGames = gameSortFunction(
    womensUnsortedUnplayedEightGames,
    womenSeriesData
  )
  const womensUnplayedRegularGames = gameSortFunction(
    womensUnsortedUnplayedRegularGames,
    womenSeriesData
  )
  const womensUnplayedQualificationGames = gameSortFunction(
    womensUnsortedUnplayedQualificationGames,
    womenSeriesData
  )

  const menSeasons = season.find((season) => season.women === false)
  const womenSeasons = season.find((season) => season.women === true)

  const returnObject = {
    men: {
      played: {
        FinalGames: mensPlayedFinalGames,
        SemiGames: mensPlayedSemiGames,
        QuarterGames: mensPlayedQuarterGames,
        EightGames: mensPlayedEightGames,
        RegularGames: mensPlayedRegularGames,
        QualificationGames: mensPlayedQualificationGames,
      },
      unplayed: {
        FinalGames: mensUnplayedFinalGames,
        SemiGames: mensUnplayedSemiGames,
        QuarterGames: mensUnplayedQuarterGames,
        EightGames: mensUnplayedEightGames,
        RegularGames: mensUnplayedRegularGames,
        QualificationGames: mensUnplayedQualificationGames,
      },
      unplayedLength: unplayedMensGamesLength,
      playedLength: playedMensGamesLength,
      season: menSeasons ?? [],
      series: menSeries,
    },
    women: {
      played: {
        FinalGames: womensPlayedFinalGames,
        SemiGames: womensPlayedSemiGames,
        QuarterGames: womensPlayedQuarterGames,
        EightGames: womensPlayedEightGames,
        RegularGames: womensPlayedRegularGames,
        QualificationGames: womensPlayedQualificationGames,
      },
      unplayed: {
        FinalGames: womensUnplayedFinalGames,
        SemiGames: womensUnplayedSemiGames,
        QuarterGames: womensUnplayedQuarterGames,
        EightGames: womensUnplayedEightGames,
        RegularGames: womensUnplayedRegularGames,
        QualificationGames: womensUnplayedQualificationGames,
      },
      unplayedLength: unplayedWomensGamesLength,
      playedLength: playedWomensGamesLength,
      season: womenSeasons ?? [],
      series: womenSeries,
    },
  }

  return returnObject
}

function gameSortFunction(
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
