import { SeasonObjectType } from '@/lib/types/season/seasons'
import { z } from 'zod'

const parseRoute = z
  .enum(['games', 'tables', 'development', 'playoff', 'stats', 'map'])
  .catch('tables')

type SeasonArray = {
  year: string
  season: string
  index: number
}[]

export const getSeasonArray = (seasons: SeasonObjectType[]) => {
  return seasons
    .filter((season) => season.women === false)
    .sort((a, b) => (a.seasonId > b.seasonId ? 1 : -1))
    .map((season, index) => {
      return {
        year: season.year,
        season: season.year.includes('/')
          ? season.year.split('/')[1]
          : season.year,
        index: index,
      }
    })
}

export const getSeasonIndex = (seasonArray: SeasonArray, seasonId: string) => {
  return seasonArray.find((season) => {
    const seasonYear =
      parseInt(seasonId) < 1964
        ? seasonId
        : `${parseInt(seasonId) - 1}/${seasonId}`
    return season.year === seasonYear
  })?.index
}

export const getParsedRoute = (pathname: string | undefined) => {
  const route = pathname ? pathname : ''

  return parseRoute.parse(route)
}
