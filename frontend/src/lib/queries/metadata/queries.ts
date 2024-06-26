import { getSingleMetadata } from '@/lib/requests/metadata'
import { queryOptions } from '@tanstack/react-query'

export const metadataKeys = {
  metadata: (year: string) => ['seasonMetadata', year] as const,
}

export const metadataQueries = {
  metadata: (year: string) =>
    queryOptions({
      queryKey: metadataKeys.metadata(year),
      queryFn: () => getSingleMetadata(year),
    }),
}
