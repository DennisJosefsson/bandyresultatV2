import { FormComponent } from '@/components/Components/Common/ReactHookFormComponents/FormComponent'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { postTeamSeason } from '@/lib/requests/teamSeason'
import { teamSeason } from '@/lib/types/teamSeason/teamSeason'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/teamseason/$teamseasonId/edit'
)

const EditTeamSeason = () => {
  const data = route.useLoaderData()
  const router = useRouter()
  const navigate = route.useNavigate()
  const form = useForm<z.infer<typeof teamSeason>>({
    resolver: zodResolver(teamSeason),
    criteriaMode: 'all',
    mode: 'onChange',
    defaultValues: {
      ...data,
      points: data.points ?? 0,
      position: data.position ?? 0,
    },
  })
  const women = route.useSearch({ select: (search) => search.women })
  const { seasonId } = route.useParams()
  const mutation = useMutation({
    mutationFn: postTeamSeason,
    onSuccess: () => onSuccessMutation(),
    onError: (error) => onErrorMutation(error),
  })

  const { toast } = useToast()

  const handleSubmit: SubmitHandler<z.infer<typeof teamSeason>> = (
    formData
  ) => {
    mutation.mutate({ formState: formData })
  }

  const onSuccessMutation = () => {
    router.invalidate()
    toast({
      duration: 2500,
      title: 'Teamseason uppdaterad',
    })
    navigate({
      to: '/dashboard/season/$seasonId',
      params: { seasonId: seasonId },
      search: { women },
    })
  }

  const onErrorMutation = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast({
        duration: 2500,
        title: 'Fel',
        description: error.response?.data.errors,
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
  return (
    <Card className="mt-2">
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Teamseason - {data.team.name}</CardTitle>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              type="button"
              onClick={() =>
                navigate({
                  to: '/dashboard/season/$seasonId',
                  params: { seasonId: seasonId },
                  search: { women },
                })
              }
            >
              Tillbaka
            </Button>
            <Button type="submit" form="teamseasonForm">
              Skicka
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            id="teamseasonForm"
            className="flex flex-col gap-2"
          >
            <div className="grid grid-cols-5">
              <FormComponent name="qualification" methods={form}>
                <div className="flex flex-row justify-between items-center mx-8 my-2">
                  <FormComponent.Label>Kval</FormComponent.Label>
                  <FormComponent.Switch />
                </div>
              </FormComponent>
              <FormComponent name="negQualification" methods={form}>
                <div className="flex flex-row justify-between items-center mx-8 my-2">
                  <FormComponent.Label>Neg. kval</FormComponent.Label>
                  <FormComponent.Switch />
                </div>
              </FormComponent>
              <FormComponent name="relegated" methods={form}>
                <div className="flex flex-row justify-between items-center mx-8 my-2">
                  <FormComponent.Label>Nedflyttad</FormComponent.Label>
                  <FormComponent.Switch />
                </div>
              </FormComponent>
              <FormComponent name="promoted" methods={form}>
                <div className="flex flex-row justify-between items-center mx-8 my-2">
                  <FormComponent.Label>Uppflyttad</FormComponent.Label>
                  <FormComponent.Switch />
                </div>
              </FormComponent>
              <FormComponent name="playoff" methods={form}>
                <div className="flex flex-row justify-between items-center mx-8 my-2">
                  <FormComponent.Label>Slutspel</FormComponent.Label>
                  <FormComponent.Switch />
                </div>
              </FormComponent>
              <FormComponent name="eight" methods={form}>
                <div className="flex flex-row justify-between items-center mx-8 my-2">
                  <FormComponent.Label>Åttondel</FormComponent.Label>
                  <FormComponent.Switch />
                </div>
              </FormComponent>
              <FormComponent name="quarter" methods={form}>
                <div className="flex flex-row justify-between items-center mx-8 my-2">
                  <FormComponent.Label>Kvart</FormComponent.Label>
                  <FormComponent.Switch />
                </div>
              </FormComponent>
              <FormComponent name="semi" methods={form}>
                <div className="flex flex-row justify-between items-center mx-8 my-2">
                  <FormComponent.Label>Semi</FormComponent.Label>
                  <FormComponent.Switch />
                </div>
              </FormComponent>
              <FormComponent name="final" methods={form}>
                <div className="flex flex-row justify-between items-center mx-8 my-2">
                  <FormComponent.Label>Final</FormComponent.Label>
                  <FormComponent.Switch />
                </div>
              </FormComponent>
              <FormComponent name="gold" methods={form}>
                <div className="flex flex-row justify-between items-center mx-8 my-2">
                  <FormComponent.Label>Guld</FormComponent.Label>
                  <FormComponent.Switch />
                </div>
              </FormComponent>
            </div>
            <div className="flex flex-row gap-2">
              <FormComponent name="position" methods={form}>
                <FormComponent.Label>Position</FormComponent.Label>
                <FormComponent.Input />
              </FormComponent>
              <FormComponent name="points" methods={form}>
                <FormComponent.Label>Points</FormComponent.Label>
                <FormComponent.Input />
              </FormComponent>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default EditTeamSeason
