import { useToast } from '@/components/ui/use-toast'

import { postBulkGames } from '@/lib/requests/games'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { AxiosError } from 'axios'

export const useAddGamesMutation = () => {
  const navigate = useNavigate()
  const { seasonId } = useParams({
    from: '/_layout/dashboard/season/$seasonId/bulkgames',
  })
  const { toast } = useToast()
  const mutation = useMutation({
    mutationFn: postBulkGames,
    onSuccess: () => onMutationSuccess(),
    onError: (error) => onMutationError(error),
  })

  const onMutationSuccess = () => {
    toast({
      duration: 2500,
      title: 'Matcher inlagda',
    })
    navigate({
      to: '/dashboard/season/$seasonId',
      params: { seasonId: seasonId },
    })
  }

  const onMutationError = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast({
        duration: 2500,
        title: 'Något gick fel',
        description: <p>{error.response?.data.errors}</p>,
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
