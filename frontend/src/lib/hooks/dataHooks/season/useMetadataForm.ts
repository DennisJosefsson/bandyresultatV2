import { MetadataType, metadataType } from '@/lib/types/metadata/metadata'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const useMetadataForm = (
  seasonId: number,
  metadataData: MetadataType | undefined
) => {
  const form = useForm<MetadataType>({
    resolver: zodResolver(metadataType),
    criteriaMode: 'all',
    mode: 'onChange',
    defaultValues: {
      metadataId: metadataData ? metadataData.metadataId : undefined,
      seasonId: metadataData ? metadataData.seasonId : seasonId,
      name: metadataData ? metadataData.name : '',
      year: metadataData ? metadataData.year : '',
      winnerId: metadataData ? metadataData.winnerId : undefined,
      winnerName: metadataData ? metadataData.winnerName : '',
      hostCity: metadataData ? metadataData.hostCity : '',
      finalDate: metadataData ? metadataData.finalDate : '',
      northSouth: metadataData && metadataData.northSouth ? true : false,
      multipleGroupStages:
        metadataData && metadataData.multipleGroupStages ? true : false,
      eight: metadataData && metadataData.eight === false ? false : true,
      quarter: metadataData && metadataData.quarter === false ? false : true,
      semi: metadataData && metadataData.semi === false ? false : true,
      final: metadataData && metadataData.final === false ? false : true,
      comment: metadataData && metadataData.comment ? metadataData.comment : '',
    },
  })

  return form
}

export default useMetadataForm
