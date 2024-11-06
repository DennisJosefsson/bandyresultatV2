import { Op, where } from 'sequelize'
import Game from '../../../models/Game.js'
import Season from '../../../models/Season.js'
import Serie from '../../../models/Serie.js'
import Team from '../../../models/Team.js'
import TeamGame from '../../../models/TeamGame.js'
import TeamTable from '../../../models/TeamTable.js'
import { sequelize } from '../../../utils/db.js'
import { leagueTableParser } from '../../../utils/postFunctions/leagueTableParser.js'
import {
  staticTableSortFunction,
  tableSortFunction,
} from '../../../utils/postFunctions/sortLeagueTables.js'
import {
  leagueTable,
  miniTableItemArray,
} from '../../../utils/responseTypes/tableTypes.js'

type BonusPoints = {
  [key: string]: number
}

const getTime = (date?: Date): number => {
  return date != null ? date.getTime() : 0
}

export const getTeamSeasonStaticTables = async (
  seasonYear: string | undefined,
  women: boolean,
  groupArray: string[]
) => {
  const tables = await TeamTable.findAll({
    where: { group: groupArray },
    include: [
      {
        model: Season,
        where: { year: { [Op.eq]: seasonYear }, women },
        attributes: ['year', 'seasonId'],
      },
      Team,
      Serie,
    ],
    raw: true,
    nest: true,
  })
  const series = await Serie.findAll({
    where: { serieGroupCode: groupArray },
    include: [{ model: Season, where: { year: seasonYear, women } }],
    raw: true,
    nest: true,
  })
  const seriesData = series.map((serie) => {
    return {
      comment: serie.comment,
      name: serie.serieName,
      group: serie.serieGroupCode,
      serieStructure: serie.serieStructure,
      level: serie.level,
    }
  })
  return staticTableSortFunction(tables, seriesData).filter((table) =>
    groupArray.includes(table.group)
  )
}

export const getTeamSeasonTables = async (
  seasonYear: string | undefined,
  women: boolean,
  groupArray: string[]
) => {
  const getTeamArray = await TeamGame.findAll({
    where: { playoff: false, women: women, group: groupArray },
    include: [
      {
        model: Season,
        where: { year: { [Op.eq]: seasonYear } },
        attributes: ['year', 'seasonId'],
      },
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'team',
      },
      { model: Serie, where: { level: 1 }, attributes: ['level'] },
    ],
    attributes: [
      [sequelize.literal('DISTINCT (team)'), 'teamId'],
      'group',
      'category',
      'women',
    ],
    group: [
      'group',
      'teamId',
      'category',
      'team.name',
      'team.team_id',
      'team.casual_name',
      'team.short_name',
      'season.season_id',
      'season.year',
      'teamgame.women',
      'serie.level',
    ],
    raw: true,
    nest: true,
  })

  const teamArray = miniTableItemArray.parse(getTeamArray)

  const getTable = await TeamGame.findAll({
    where: { played: true, women, playoff: false },
    attributes: [
      'teamId',
      'group',
      'women',
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
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'team',
      },
      {
        model: Season,
        attributes: ['seasonId', 'year'],
        where: { year: { [Op.eq]: seasonYear } },
      },
    ],
    group: [
      'group',
      'teamId',
      'team.name',
      'team.team_id',
      'team.casual_name',
      'team.short_name',
      'category',
      'season.season_id',
      'season.year',
      'teamgame.women',
    ],
    order: [
      ['group', 'DESC'],
      ['totalPoints', 'DESC'],
      ['totalGoalDifference', 'DESC'],
      ['totalGoalsScored', 'DESC'],
    ],
    raw: true,
    nest: true,
  })

  const parsedTable = leagueTable.parse(getTable)

  const tabell = leagueTableParser(teamArray, parsedTable)

  const series = await Serie.findAll({
    where: { serieGroupCode: groupArray },
    include: [{ model: Season, where: { year: seasonYear, women } }],
    raw: true,
    nest: true,
  })

  const seriesData = series.map((serie) => {
    return {
      group: serie.serieGroupCode,
      comment: serie.comment,
      name: serie.serieName,
      serieStructure: serie.serieStructure,
      level: serie.level,
    }
  })

  const seriesWithBonusPoints = series.find(
    (serie) => serie.bonusPoints !== null
  )

  if (seriesWithBonusPoints) {
    const bonusPointsObject = JSON.parse(
      seriesWithBonusPoints.bonusPoints
    ) as BonusPoints

    const updatedTable = tabell.map((table) => {
      return table.group === seriesWithBonusPoints.serieGroupCode &&
        table.women === seriesWithBonusPoints.season.women
        ? {
            ...table,
            totalPoints:
              table.totalPoints + bonusPointsObject[table.teamId.toString()],
          }
        : table
    })

    return tableSortFunction(updatedTable, seriesData).filter((table) =>
      groupArray.includes(table.group)
    )
  }

  if (seasonYear && ['1933', '1937'].includes(seasonYear)) {
    const games = await TeamGame.findAll({
      where: {
        ...where,
        group: {
          [Op.startsWith]: seasonYear === '1933' ? 'Div' : 'Avd',
        },
        [Op.not]: {
          opponentId: seasonYear === '1933' ? [5, 31, 57, 29] : [5, 64, 57, 17],
        },
      },
      include: [
        {
          model: Season,
          attributes: ['seasonId', 'year'],
          where: { year: { [Op.eq]: seasonYear } },
        },
        { model: Serie, where: { level: 1 } },
      ],
      raw: true,
      nest: true,
    })

    games.forEach((game) => {
      const tableIndex = tabell.findIndex(
        (table) =>
          table.team === game.team && table.group.includes('Nedflyttning')
      )

      if (tableIndex === -1) return

      tabell[tableIndex].totalGames = tabell[tableIndex].totalGames + 1
      tabell[tableIndex].totalWins =
        tabell[tableIndex].totalWins + (game.win ? 1 : 0)
      tabell[tableIndex].totalDraws =
        tabell[tableIndex].totalDraws + (game.draw ? 1 : 0)
      tabell[tableIndex].totalLost =
        tabell[tableIndex].totalLost + (game.lost ? 1 : 0)
      tabell[tableIndex].totalGoalsScored =
        tabell[tableIndex].totalGoalsScored + game.goalsScored
      tabell[tableIndex].totalGoalsConceded =
        tabell[tableIndex].totalGoalsConceded + game.goalsConceded
      tabell[tableIndex].totalGoalDifference =
        tabell[tableIndex].totalGoalDifference + game.goalDifference
      tabell[tableIndex].totalPoints =
        tabell[tableIndex].totalPoints + game.points
    })

    return tableSortFunction(tabell, seriesData).filter((table) =>
      groupArray.includes(table.group)
    )
  }

  return tableSortFunction(tabell, seriesData).filter((table) =>
    groupArray.includes(table.group)
  )
}

type SeriesData = {
  group: string
  comment: string
  name: string
  level: number
}

type SortedGameGroups = {
  [key: string]: Game[]
}

type SortedDates = {
  [key: string]: Game[]
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
      level: seriesObject?.level ?? 2,
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
      level: groupObject['level'],
      dates: played ? sortedGameDates.reverse() : sortedGameDates,
    }
  })

  return sortGroupsAndDates.sort((a, b) => a.level - b.level)
}

export const getSeasonGames = (games: Game[], series: Serie[]) => {
  const seriesData = series.map((serie) => {
    return {
      group: serie.serieGroupCode,
      comment: serie.comment,
      name: serie.serieName,
      level: serie.level,
    }
  }) as SeriesData[]

  const unsortedPlayedGames = games
    .filter((game) => game.played === true)
    .sort((a, b) => getTime(new Date(a.date)) - getTime(new Date(b.date)))
  const unsortedUnplayedGames = games
    .filter((game) => !game.played)
    .sort((a, b) => getTime(new Date(a.date)) - getTime(new Date(b.date)))

  const playedGames = gameSortFunction(unsortedPlayedGames, seriesData, true)

  const unplayedGames = gameSortFunction(unsortedUnplayedGames, seriesData)

  return { playedGames, unplayedGames }
}
