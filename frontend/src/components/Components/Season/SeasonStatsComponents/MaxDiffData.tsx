import { useLoaderData } from '@tanstack/react-router'
import MaxDiffStatsCard from './MaxDiffStatsCard'

const MaxDiffData = () => {
  const { maxDiff } = useLoaderData({
    from: '/_layout/season/$seasonId/stats',
  })

  return (
    <>
      {maxDiff ? (
        <MaxDiffStatsCard
          title="Match(er) med störst målskillnad:"
          maxDiff={maxDiff}
        />
      ) : null}
    </>
  )
}

export default MaxDiffData
