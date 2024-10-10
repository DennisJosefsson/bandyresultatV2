import { z } from 'zod'

const parseRoute = z
  .enum([
    'games',
    'games/sub',
    'tables/all',
    'tables/home',
    'tables/away',
    'tables/sub',
    'development',
    'playoff',
    'stats',
    'map',
  ])
  .catch('tables/all')

export const getParsedRoute = (pathname: string | undefined) => {
  const route = pathname ? pathname : ''

  return parseRoute.parse(route)
}
