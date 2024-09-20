import { getMunicipalities } from '@/lib/requests/municipality'
import { queryOptions } from '@tanstack/react-query'

export const municipalityKeys = {
  teamForm: (countyId: number | null) => ['municipalities', countyId] as const,
}

export const municipalityQueries = {
  teamForm: (countyId: number | null) =>
    queryOptions({
      queryKey: municipalityKeys.teamForm(countyId),
      queryFn: () => getMunicipalities({ countyId }),
      enabled: !!countyId,
    }),
}
