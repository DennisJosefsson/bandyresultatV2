import { useGetStreakStats } from '@/lib/hooks/dataHooks/stats/useGetStreaksStats'
import { useParams, useSearch } from '@tanstack/react-router'
import ScoreStatsCard from './MaxMinGoalsStatsCard'

const ScoreStatsData = () => {
  const { seasonId } = useParams({ from: '/_layout/season/$seasonId/stats' })
  const { women } = useSearch({ from: '/_layout' })
  const { maxGoalsMen, maxGoalsWomen, minGoalsMen, minGoalsWomen } =
    useGetStreakStats(seasonId, women)

  return (
    <>
      {maxGoalsMen && maxGoalsWomen ? (
        <ScoreStatsCard
          title="Match(er) med flest antal mål:"
          maxMinGoalsMen={maxGoalsMen}
          maxMinGoalsWomen={maxGoalsWomen}
          women={women}
        />
      ) : null}
      {minGoalsMen && minGoalsWomen ? (
        <ScoreStatsCard
          title="Match(er) med minst antal mål:"
          maxMinGoalsMen={minGoalsMen}
          maxMinGoalsWomen={minGoalsWomen}
          women={women}
        />
      ) : null}
    </>
  )
}

export default ScoreStatsData
