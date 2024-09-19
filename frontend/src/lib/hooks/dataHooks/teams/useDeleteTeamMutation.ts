import { useToast } from '@/components/ui/use-toast'
import { deleteTeam } from '@/lib/requests/teams'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { AxiosError } from 'axios'

export const useDeleteTeamMutation = () => {
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => onMutationSuccess(),
    onError: (error) => onMutationError(error),
  })

  const router = useRouter()

  const onMutationSuccess = () => {
    router.invalidate()
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
