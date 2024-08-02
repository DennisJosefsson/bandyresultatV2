import { useGetStreakStats } from '@/lib/hooks/dataHooks/stats/useGetStreaksStats'
import { useParams, useSearch } from '@tanstack/react-router'
import MaxDiffStatsCard from './MaxDiffStatsCard'

const MaxDiffData = () => {
  const { seasonId } = useParams({ from: '/_layout/season/$seasonId/stats' })
  const { women } = useSearch({ from: '/_layout' })
  const { maxDiffMen, maxDiffWomen } = useGetStreakStats(seasonId, women)

  return (
    <>
      {maxDiffMen && maxDiffWomen ? (
        <MaxDiffStatsCard
          title="Match(er) med störst målskillnad:"
          maxDiffMen={maxDiffMen}
          maxDiffWomen={maxDiffWomen}
          women={women}
        />
      ) : null}
    </>
  )
}

export default MaxDiffData
