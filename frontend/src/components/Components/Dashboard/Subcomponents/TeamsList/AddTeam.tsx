import { Form } from '@/components/ui/form'
import { addTeam } from '@/lib/requests/teams'
import { newTeam } from '@/lib/types/teams/teams'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {
  getRouteApi,
  useNavigate,
  useRouter,
  useSearch,
} from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import TeamForm from './TeamForm'

import { useToast } from '@/components/ui/use-toast'
import { AxiosError } from 'axios'

const route = getRouteApi('/_layout/dashboard/addTeams')

const AddTeam = () => {
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  const navigate = useNavigate({ from: '/dashboard/addTeams' })
  const counties = route.useLoaderData()
  const { toast } = useToast()
  const router = useRouter()
  const { mutate } = useMutation({
    mutationFn: addTeam,
    onSuccess: () => onSuccessMutation(),
    onError: (error) => onErrorMutation(error),
  })
  const form = useForm<z.infer<typeof newTeam>>({
    resolver: zodResolver(newTeam),
    defaultValues: {
      name: '',
      casualName: '',
      shortName: '',
      city: '',
      lat: 0,
      long: 0,
      women: women,
      countyId: undefined,
      municipalityId: undefined,
    },
  })

  const onSubmit = (formState: z.infer<typeof newTeam>) => {
    mutate({ formState })
  }

  const onSuccessMutation = () => {
    router.invalidate()
    toast({
      duration: 5000,
      title: 'Nytt lag inlagt',
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

export default AddTeam
