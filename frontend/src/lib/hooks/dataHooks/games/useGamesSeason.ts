import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import useGetAllSeasons from '@/lib/hooks/dataHooks/season/useGetAllSeasons'

export const useGamesSeason = () => {
  const { womenContext } = useGenderContext()
  const { seasons } = useGetAllSeasons()

  const allSeasons = seasons.filter((season) => season.women === womenContext)

  const startSeason = allSeasons[allSeasons.length - 1].seasonId
  const endSeason = allSeasons[0].seasonId

  return { startSeason, endSeason }
}
