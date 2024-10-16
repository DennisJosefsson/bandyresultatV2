import { useToast } from '@/components/ui/use-toast'
import { postTeamSeason } from '@/lib/requests/teamSeason'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { AxiosError } from 'axios'

export const useAddTeamSeasonMutation = () => {
  const router = useRouter()
  const { toast } = useToast()
  const mutation = useMutation({
    mutationFn: postTeamSeason,
    onSuccess: () => onMutationSuccess(),
    onError: (error) => onMutationError(error),
  })

  const onMutationSuccess = () => {
    router.invalidate()
    toast({
      duration: 2500,
      title: 'Lag inlagt',
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
