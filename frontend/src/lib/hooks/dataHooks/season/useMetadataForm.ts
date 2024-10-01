import { metadata } from '@/lib/types/metadata/metadata'

import { zodResolver } from '@hookform/resolvers/zod'
import { getRouteApi } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const route = getRouteApi('/_layout/dashboard/season/$seasonId/metadata/')

const useMetadataForm = () => {
  const metadataData = route.useLoaderData({
    select: (search) => search.metadata,
  })

  const form = useForm<z.infer<typeof metadata>>({
    resolver: zodResolver(metadata),
    criteriaMode: 'all',
    mode: 'onChange',
    defaultValues: {
      ...metadataData,
      name: metadataData.name ?? '',
      year: metadataData.year ?? '',
      winnerName: metadataData.winnerName ?? '',
      hostCity: metadataData.hostCity ?? '',
      finalDate: metadataData.finalDate ?? '',
      comment: metadataData.comment ?? '',
    },
  })

  return form
}

export default useMetadataForm
