import { getCounties } from '@/lib/requests/county'
import { queryOptions } from '@tanstack/react-query'

export const countyKeys = {
  all: () => ['county'] as const,
}

export const countyQueries = {
  all: () =>
    queryOptions({
      queryKey: countyKeys.all(),
      queryFn: getCounties,
    }),
}
