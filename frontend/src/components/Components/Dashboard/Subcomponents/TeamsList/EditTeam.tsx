import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { editTeam } from '@/lib/requests/teams'
import { team } from '@/lib/types/teams/teams'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useNavigate, useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import TeamForm from './TeamForm'

import { AxiosError } from 'axios'

const route = getRouteApi('/_layout/dashboard/teams/$teamId/edit')

const EditTeam = () => {
  const { teamData } = route.useLoaderData()
  const women = route.useSearch({ select: (search) => search.women })
  const { counties } = route.useLoaderData()
  const { toast } = useToast()
  const router = useRouter()
  const { mutate } = useMutation({
    mutationFn: editTeam,
    onSuccess: () => onSuccessMutation(),
    onError: (error) => onErrorMutation(error),
  })
  const navigate = useNavigate({ from: '/dashboard/teams/$teamId/edit' })
  const form = useForm<z.infer<typeof team>>({
    resolver: zodResolver(team),
    defaultValues: teamData,
  })

  const onSubmit = (formState: z.infer<typeof team>) => {
    mutate({ formState })
  }

  const onSuccessMutation = () => {
    router.invalidate()
    toast({
      duration: 5000,
      title: 'Lag ändrat',
    })

    navigate({
      to: '/dashboard',
      search: { women },
    })
  }

  const onErrorMutation = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast({
        duration: 5000,
        title: 'Fel',
        description: error.response?.data.errors,
        variant: 'destructive',
      })
    } else {
      toast({
        duration: 5000,
        title: 'Något gick fel',
        variant: 'destructive',
      })
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TeamForm counties={counties} />
        </form>
      </Form>
    </div>
  )
}

export default EditTeam
