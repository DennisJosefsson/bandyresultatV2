import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { useGetStreakStats } from '@/lib/hooks/dataHooks/stats/useGetStreaksStats'
import ScoreStatsCard from './MaxMinGoalsStatsCard'
import { useParams } from '@tanstack/react-router'

const ScoreStatsData = () => {
  const { seasonId } = useParams({ from: '/_layout/season/$seasonId/stats' })
  const { women } = useGenderContext()
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
