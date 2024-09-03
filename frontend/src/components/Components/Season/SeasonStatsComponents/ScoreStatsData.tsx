import { useLoaderData } from '@tanstack/react-router'
import ScoreStatsCard from './MaxMinGoalsStatsCard'

const ScoreStatsData = () => {
  const { maxGoals, minGoals } = useLoaderData({
    from: '/_layout/season/$seasonId/stats',
  })

  return (
    <>
      {maxGoals ? (
        <ScoreStatsCard
          title="Match(er) med flest antal mål:"
          maxMinGoals={maxGoals}
        />
      ) : null}
      {minGoals ? (
        <ScoreStatsCard
          title="Match(er) med minst antal mål:"
          maxMinGoals={minGoals}
        />
      ) : null}
    </>
  )
}

export default ScoreStatsData
