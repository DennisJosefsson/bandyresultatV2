import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { editSerie } from '@/lib/requests/series'
import { serie } from '@/lib/types/series/series'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import SeriesForm from './SeriesForm'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/games/$serieId/edit/'
)

const EditSeries = () => {
  const { toast } = useToast()
  const navigate = route.useNavigate()
  const women = route.useSearch({ select: (search) => search.women })
  const seasonId = route.useParams({ select: (s) => s.seasonId })
  const seriesData = route.useLoaderData()
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: editSerie,
    onSuccess: (data) => onSuccessSubmit(data),
    onError: (error) => onSubmitError(error),
  })

  const form = useForm<z.infer<typeof serie>>({
    defaultValues: { ...seriesData, comment: seriesData.comment ?? '' },
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: zodResolver(serie),
  })

  const onSubmit = (serieFormData: z.infer<typeof serie>) => {
    mutation.mutate({ formState: serieFormData })
  }

  const onSubmitError = (error: unknown) => {
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

  const onSuccessSubmit = (data: z.infer<typeof serie>) => {
    router.invalidate()
    toast({
      duration: 5000,
      title: 'Uppdaterad serie',
      description: data.serieName,
    })

    navigate({
      to: '/dashboard/season/$seasonId',
      params: { seasonId: seasonId },
      search: { women },
    })
  }

  return (
    <Card className="mt-2">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle>Serie</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="seriedataForm">
            <SeriesForm seasonId={seasonId} />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default EditSeries
