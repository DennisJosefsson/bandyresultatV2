import { useToast } from '@/components/ui/use-toast'
import { postTeamSeason } from '@/lib/requests/teamSeason'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { resetDashboardTeamSeason } from '@/lib/zustand/dashboard/teamSeasonStore'
import { useNavigate, useParams } from '@tanstack/react-router'

export const useAddTeamSeasonMutation = () => {
  const navigate = useNavigate()
  const { seasonId } = useParams({
    from: '/_layout/dashboard/season/$seasonId/teamseason',
  })
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
    resetDashboardTeamSeason()
    navigate({
      to: '/dashboard/season/$seasonId',
      params: { seasonId: seasonId },
    })
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
