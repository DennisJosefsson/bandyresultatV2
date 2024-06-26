import { getErrors } from '@/lib/requests/errors'
import { queryOptions } from '@tanstack/react-query'

export const errorKeys = {
  error: () => ['errors'] as const,
}

export const errorQueries = {
  error: () =>
    queryOptions({
      queryKey: errorKeys.error(),
      queryFn: getErrors,
    }),
}
