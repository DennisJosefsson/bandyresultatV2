import { metadataQueries } from '@/lib/queries/metadata/queries'
import { useSuspenseQuery } from '@tanstack/react-query'

const useGetMetaData = (year: string) => {
  const { data, error, isSuccess, isLoading } = useSuspenseQuery(
    metadataQueries.metadata(year)
  )

  return { data, error, isSuccess, isLoading }
}

export default useGetMetaData
