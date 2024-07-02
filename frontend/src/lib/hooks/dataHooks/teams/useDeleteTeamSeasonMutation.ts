import { useToast } from '@/components/ui/use-toast'
import { seasonKeys } from '@/lib/queries/season/queries'
import { deleteTeamSeason } from '@/lib/requests/teamSeason'
import { useDashboardTeamSeasonStore } from '@/lib/zustand/dashboard/teamSeasonStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useDeleteTeamSeasonMutation = () => {
  const { toast } = useToast()
  const dashboardData = useDashboardTeamSeasonStore(
    (state) => state.dashboardTeamSeason
  )
  const mutation = useMutation({
    mutationFn: deleteTeamSeason,
    onSuccess: () => onMutationSuccess(),
    onError: (error) => onMutationError(error),
  })

  const queryClient = useQueryClient()

  const onMutationSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: seasonKeys.singleSeason(dashboardData.year.slice(-4)),
    })
    toast({
      duration: 2500,
      title: mutation.data ? `${mutation.data.message}` : 'Borttagen',
    })
  }

  const onMutationError = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast({
        duration: 2500,
        title: `${error.response?.data.errors}`,
        variant: 'destructive',
      })
    } else {
      toast({
        duration: 2500,
        title: 'Något gick fel',
        variant: 'destructive',
      })
    }
  }

  return mutation
}
