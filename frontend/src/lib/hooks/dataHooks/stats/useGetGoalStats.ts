import { useLoaderData } from '@tanstack/react-router'

export const useGetGoalStats = () => {
  const {
    goalsScoredTotal,
    goalsScoredTotalCat,
    goalsScoredAverage,
    goalsScoredAverageCat,
    goalsScoredHomeTotal,
    goalsScoredAwayTotal,
    goalsScoredHomeTotalCat,
    goalsScoredAwayTotalCat,
    goalsScoredHomeAverage,
    goalsScoredAwayAverage,
    goalsScoredHomeAverageCat,
    goalsScoredAwayAverageCat,
  } = useLoaderData({
    from: '/_layout/season/$seasonId/stats',
  })

  const averageArray = goalsScoredTotalCat?.map((cat) => {
    const avgAll = goalsScoredAverageCat?.find(
      (avgCat) => cat.category === avgCat.category
    )
    const avgHome = goalsScoredHomeAverageCat?.find(
      (avgCat) => cat.category === avgCat.category
    )
    const avgAway = goalsScoredAwayAverageCat?.find(
      (avgCat) => cat.category === avgCat.category
    )
    const totHome = goalsScoredHomeTotalCat?.find(
      (totCat) => cat.category === totCat.category
    )
    const totAway = goalsScoredAwayTotalCat?.find(
      (totCat) => cat.category === totCat.category
    )
    return {
      category: cat.category,
      totAll: cat.data,
      totHome: totHome?.data,
      totAway: totAway?.data,
      avgAll: avgAll?.data,
      avgHome: avgHome?.data,
      avgAway: avgAway?.data,
    }
  })

  const totObjectArray = [
    {
      category: 'totalt',
      totAll: goalsScoredTotal?.data,
      totHome: goalsScoredHomeTotal?.data,
      totAway: goalsScoredAwayTotal?.data,
      avgAll: goalsScoredAverage?.data,
      avgHome: goalsScoredHomeAverage?.data,
      avgAway: goalsScoredAwayAverage?.data,
    },
  ]

  return {
    averageArray,
    totObjectArray,
  }
}
