import { useToast } from '@/components/ui/use-toast'
import { postTeamSeason } from '@/lib/requests/teamSeason'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams, useSearch } from '@tanstack/react-router'
import { AxiosError } from 'axios'

export const useAddTeamSeasonMutation = () => {
  const navigate = useNavigate()
  const seasonId = useParams({
    from: '/_layout/dashboard/season/$seasonId/teamseason/',
    select: (params) => params.seasonId,
  })
  const women = useSearch({
    from: '/_layout/dashboard',
    select: (search) => search.women,
  })
  const { toast } = useToast()
  const mutation = useMutation({
    mutationFn: postTeamSeason,
    onSuccess: () => onMutationSuccess(),
    onError: (error) => onMutationError(error),
  })

  const queryClient = useQueryClient()

  const onMutationSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['singleSeason'] })
    toast({
      duration: 5000,
      title: 'Lag inlagda/uppdaterade',
    })
    navigate({
      to: '/dashboard/season/$seasonId',
      params: { seasonId: seasonId },
      search: { women },
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
