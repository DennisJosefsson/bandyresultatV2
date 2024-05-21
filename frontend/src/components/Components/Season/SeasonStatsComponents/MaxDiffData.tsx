import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { useGetStreakStats } from '@/lib/hooks/dataHooks/stats/useGetStreaksStats'
import MaxDiffStatsCard from './MaxDiffStatsCard'
import { useParams } from '@tanstack/react-router'

const MaxDiffData = () => {
  const { seasonId } = useParams({ from: '/_layout/season/$seasonId/stats' })
  const { women } = useGenderContext()
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
