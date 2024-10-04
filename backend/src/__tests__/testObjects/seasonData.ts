export const correctTableObjectVilla = {
  category: 'regular',
  group: 'elitserien',
  team: {
    casualName: 'Villa',
    name: 'Villa Lidköping BK',
    shortName: 'VLBK',
    teamId: 1,
  },
  season: {
    seasonId: 170,
    year: '2023/2024',
  },
  teamId: 1,
  totalDraws: 4,
  totalGames: 26,
  totalGoalDifference: 109,
  totalGoalsConceded: 85,
  totalGoalsScored: 194,
  totalLost: 1,
  totalPoints: 46,
  totalWins: 21,
  women: false,
}

export const correctTableObjectBonusPointsAll = {
  category: 'regular',
  group: 'allsvenskan',
  team: {
    casualName: 'Edsbyn',
    name: 'Edsbyns IF',
    shortName: 'EIF',
    teamId: 6,
  },
  season: {
    seasonId: 95,
    year: '2000/2001',
  },
  teamId: 6,
  totalDraws: 2,
  totalGames: 11,
  totalGoalDifference: 34,
  totalGoalsConceded: 40,
  totalGoalsScored: 74,
  totalLost: 2,
  totalPoints: 19,
  totalWins: 7,
  women: false,
}

export const correctTableObjectBonusPointsHome = {
  category: 'regular',
  group: 'allsvenskan',
  team: {
    casualName: 'Edsbyn',
    name: 'Edsbyns IF',
    shortName: 'EIF',
    teamId: 6,
  },
  season: {
    seasonId: 95,
    year: '2000/2001',
  },
  teamId: 6,
  totalDraws: 0,
  totalGames: 6,
  totalGoalDifference: 36,
  totalGoalsConceded: 11,
  totalGoalsScored: 47,
  totalLost: 0,
  totalPoints: 12,
  totalWins: 6,
  women: false,
}

export const semiPlayoffResult = {
  result: '3 - 1',
  homeTeam: {
    casualName: 'Villa',
    name: 'Villa Lidköping BK',
    shortName: 'VLBK',
    teamId: 1,
  },
  awayTeam: {
    casualName: 'Bollnäs',
    name: 'Bollnäs GIF',
    shortName: 'BGIF',
    teamId: 11,
  },
}

export const q2FirstGameData = {
  gameId: 15192,
  seasonId: 117,
  serieId: 995,
  homeTeamId: 11,
  awayTeamId: 13,
  result: '7-0',
  halftimeResult: '3-0',
  homeGoal: 7,
  awayGoal: 0,
  halftimeHomeGoal: 3,
  halftimeAwayGoal: 0,
  date: '2023-02-24',
  round: null,
  category: 'quarter',
  group: 'Q2',
  playoff: true,
  extraTime: false,
  penalties: false,
  mix: false,
  played: true,
  women: false,
  homeTeam: {
    name: 'Bollnäs GIF',
    teamId: 11,
    casualName: 'Bollnäs',
    shortName: 'BGIF',
  },
  awayTeam: {
    name: 'Broberg/Söderhamn Bandy',
    teamId: 13,
    casualName: 'Broberg',
    shortName: 'B/S',
  },
  season: {
    year: '2022/2023',
    seasonId: 117,
  },
}

export const correctMapData = {
  teamId: 20,
  name: 'Gripen Trollhättan BK',
  city: 'Trollhättan',
  casualName: 'Gripen',
  shortName: 'GBK',
  women: false,
  lat: 58.28,
  long: 12.3,
  countyId: 12,
  municipalityId: 1488,
}

export const statsProperties = [
  'gamesCountTotal',
  'gamesCountTotalCat',
  'winCountHomeTeam',
  'winCountAwayTeam',
  'drawCount',
  'winCountHomeTeamCat',
  'winCountAwayTeamCat',
  'drawCountCat',
  'goalsScoredTotal',
  'goalsScoredTotalCat',
  'goalsScoredAverage',
  'goalsScoredAverageCat',
  'goalsScoredHomeTotal',
  'goalsScoredAwayTotal',
  'goalsScoredHomeTotalCat',
  'goalsScoredAwayTotalCat',
  'goalsScoredHomeAverage',
  'goalsScoredAwayAverage',
  'goalsScoredHomeAverageCat',
  'goalsScoredAwayAverageCat',
  'unbeatenStreak',
  'winStreak',
  'drawStreak',
  'noWinStreak',
  'losingStreak',
  'maxGoals',
  'minGoals',
  'maxDiff',
]

export const correctStatsData = {
  final: {
    category: 'final',
    year: '2022/2023',
    season_id: 117,
    count: 1,
  },
  quarter: {
    category: 'quarter',
    year: '2022/2023',
    season_id: 117,
    count: 13,
  },
}

export const correctDevGameDataNormalYear = {
  gameId: 15003,
  seasonId: 117,
  serieId: 282,
  homeTeamId: 12,
  awayTeamId: 11,
  result: '1-4',
  halftimeResult: '1-3',
  homeGoal: 1,
  awayGoal: 4,
  halftimeHomeGoal: 1,
  halftimeAwayGoal: 3,
  date: '2022-10-28',
}

export const correctDevGameDataNormalYear2 = {
  gameId: 15005,
  seasonId: 117,
  serieId: 282,
  homeTeamId: 13,
  awayTeamId: 2,
  result: '8-1',
  halftimeResult: '2-1',
  homeGoal: 8,
  awayGoal: 1,
  halftimeHomeGoal: 2,
  halftimeAwayGoal: 1,
  date: '2022-10-28',
}

export const correctTableNormalYear1 = {
  teamId: 5,
  casualName: 'Västerås SK',
  table: {
    position: 1,
    games: 1,
    wins: 1,
    draws: 0,
    lost: 0,
    scoredGoals: 12,
    concededGoals: 2,
    points: 2,
  },
}

export const correctTableNormalYear2 = {
  teamId: 13,
  casualName: 'Broberg',
  table: {
    position: 2,
    games: 1,
    wins: 1,
    draws: 0,
    lost: 0,
    scoredGoals: 8,
    concededGoals: 1,
    points: 2,
  },
}

export const correctPointsBonusPoints = {
  teamId: 6,
  casualName: 'Edsbyn',
  table: {
    position: 1,
    games: 1,
    wins: 1,
    draws: 0,
    lost: 0,
    scoredGoals: 6,
    concededGoals: 2,
    points: 5,
  },
}
