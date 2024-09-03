import { useLoaderData } from '@tanstack/react-router'

export const useGetGameResultStats = () => {
  const {
    gamesCountTotal,
    gamesCountTotalCat,
    winCountHomeTeam,
    winCountAwayTeam,
    drawCount,
    winCountHomeTeamCat,
    winCountAwayTeamCat,
    drawCountCat,
  } = useLoaderData({
    from: '/_layout/season/$seasonId/stats',
  })

  const pieChartData = [
    {
      win: 'Hemma',
      count: winCountHomeTeam ?? 0,
      percent:
        winCountHomeTeam && gamesCountTotal
          ? (winCountHomeTeam / gamesCountTotal) * 100
          : 0,
    },
    {
      win: 'Borta',
      count: winCountAwayTeam ?? 0,
      percent:
        winCountAwayTeam && gamesCountTotal
          ? (winCountAwayTeam / gamesCountTotal) * 100
          : 0,
    },
    {
      win: 'Oavgjort',
      count: drawCount ?? 0,
      percent:
        drawCount && gamesCountTotal ? (drawCount / gamesCountTotal) * 100 : 0,
    },
  ]

  return {
    gamesCountTotal,
    gamesCountTotalCat,
    winCountAwayTeam,
    winCountAwayTeamCat: winCountAwayTeamCat.filter(
      (cat) => cat.category !== 'final'
    ),
    winCountHomeTeam,
    winCountHomeTeamCat: winCountHomeTeamCat.filter(
      (cat) => cat.category !== 'final'
    ),
    drawCount,
    drawCountCat: drawCountCat.filter((cat) => cat.category !== 'final'),
    pieChartData,
  }
}
