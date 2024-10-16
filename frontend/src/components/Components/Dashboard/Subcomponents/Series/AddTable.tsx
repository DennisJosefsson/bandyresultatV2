import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { newStaticTableFunction } from '@/lib/requests/tables'
import { newStaticTable } from '@/lib/types/tables/seasonTable'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import TableForm from './TableForm'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info/$serieId/$teamId/newTable'
)

const AddSeries = () => {
  const { toast } = useToast()
  const data = route.useLoaderData()
  const women = route.useSearch({ select: (search) => search.women })
  const navigate = route.useNavigate()
  const { seasonId, serieId, teamId } = route.useParams()
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: newStaticTableFunction,
    onSuccess: () => onSuccessSubmit(),
    onError: (error) => onSubmitError(error),
  })

  const form = useForm<z.infer<typeof newStaticTable>>({
    defaultValues: {
      seasonId: seasonId,
      group: data.serieGroupCode,
      serieId: serieId,
      teamId: teamId,
      position: 0,
      totalGames: 0,
      totalWins: 0,
      totalDraws: 0,
      totalLost: 0,
      totalGoalsScored: 0,
      totalGoalsConceded: 0,
      totalGoalDifference: 0,
      totalPoints: 0,
      women: women,
      qualification: data.serieCategory === 'qualification' ? true : false,
    },
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: zodResolver(newStaticTable),
  })

  const onSubmit = (serieFormData: z.infer<typeof newStaticTable>) => {
    mutation.mutate({ formState: serieFormData })
  }

  const onSubmitError = (error: unknown) => {
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

  const onSuccessSubmit = () => {
    router.invalidate()
    toast({
      duration: 2500,
      title: 'Ny tabell',
    })

    navigate({
      to: '/dashboard/season/$seasonId/info/$serieId',
      params: { seasonId: seasonId, serieId: serieId },
      search: { women },
    })
  }

  const teamName = data.teams.find((team) => team.teamId === teamId)?.name

  return (
    <Card className="mt-2">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle>Serie</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="staticTableForm">
            <TableForm
              teamName={teamName}
              seasonId={seasonId}
              serieId={serieId}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default AddSeries
