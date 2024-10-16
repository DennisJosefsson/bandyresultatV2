import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { editStaticTableFunction } from '@/lib/requests/tables'
import { editStaticTable } from '@/lib/types/tables/seasonTable'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import TableForm from './TableForm'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info/$serieId/$tableId/editTable'
)

const AddSeries = () => {
  const { toast } = useToast()
  const data = route.useLoaderData()
  const women = route.useSearch({ select: (search) => search.women })
  const navigate = route.useNavigate()
  const { seasonId, serieId } = route.useParams()
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: editStaticTableFunction,
    onSuccess: () => onSuccessSubmit(),
    onError: (error) => onSubmitError(error),
  })

  const form = useForm<z.infer<typeof editStaticTable>>({
    defaultValues: data.staticTable,
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: zodResolver(editStaticTable),
  })

  const onSubmit = (serieFormData: z.infer<typeof editStaticTable>) => {
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
      title: 'Tabell uppdaterad',
    })

    navigate({
      to: '/dashboard/season/$seasonId/info/$serieId',
      params: { seasonId: seasonId, serieId: serieId },
      search: { women },
    })
  }

  const teamName = data.seriesData.teams.find(
    (team) => team.teamId === data.staticTable.teamId
  )?.name

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
