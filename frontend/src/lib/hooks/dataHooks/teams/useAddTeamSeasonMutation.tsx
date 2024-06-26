import { FormContent } from '@/components/Components/Dashboard/Subcomponents/SeasonsList'
import { useToast } from '@/components/ui/use-toast'
import { postTeamSeason } from '@/lib/requests/teamSeason'
import { TeamSeasonAttributes } from '@/lib/types/teams/teams'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'

export const useAddTeamSeasonMutation = (
  setTab: Dispatch<SetStateAction<string>>,
  setFormContent: Dispatch<SetStateAction<FormContent>>,
  setTeamSeasonData: Dispatch<SetStateAction<TeamSeasonAttributes[] | null>>
) => {
  const { toast } = useToast()
  const mutation = useMutation({
    mutationFn: postTeamSeason,
    onSuccess: () => onMutationSuccess(),
    onError: () => onMutationError(),
  })

  const queryClient = useQueryClient()

  const onMutationSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['singleSeason'] })
    toast({
      duration: 5000,
      title: 'Lag inlagda/uppdaterade',
    })

    setTeamSeasonData(null)
    setTab('sections')
    setFormContent(null)
  }

  const onMutationError = () => {
    toast({
      duration: 5000,
      title: 'Lag inlagda/uppdaterade',
      variant: 'destructive',
    })
  }

  return mutation
}
