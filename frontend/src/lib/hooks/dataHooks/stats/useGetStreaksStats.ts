import { useLoaderData } from '@tanstack/react-router'

export const useGetStreakStats = () => {
  const {
    unbeatenStreak,
    winStreak,
    drawStreak,
    noWinStreak,
    losingStreak,
    maxGoals,
    minGoals,
    maxDiff,
  } = useLoaderData({
    from: '/_layout/season/$seasonId/stats',
  })

  return {
    unbeatenStreak,
    winStreak,
    drawStreak,
    noWinStreak,
    losingStreak,
    maxGoals,
    minGoals,
    maxDiff,
  }
}
