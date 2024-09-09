import { useForm } from 'react-hook-form'

import { postSerie } from '@/lib/requests/series'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Form } from '@/components/ui/form'
import { SerieAttributes, serieAttributes } from '@/lib/types/series/series'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormComponent } from '@/components/Components/Common/ReactHookFormComponents/FormComponent'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'

type NewSeriesFormProps = {
  women: boolean
  seasonId: number
  serieData: SerieAttributes | undefined
}

const NewSeriesForm = ({ women, seasonId, serieData }: NewSeriesFormProps) => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: (formData: SerieAttributes) => postSerie(formData),
    onSuccess: (data) => onSuccessSubmit(data),
    onError: (error) => onSubmitError(error),
  })
  const client = useQueryClient()
  const form = useForm<SerieAttributes>({
    defaultValues: {
      serieCategory: serieData ? serieData.serieCategory : '',
      serieGroupCode: serieData ? serieData.serieGroupCode : '',
      serieStructure: serieData ? serieData.serieStructure : [],
      serieName: serieData ? serieData.serieName : '',
      comment: serieData && serieData.comment ? serieData.comment : '',
      seasonId: seasonId,
      women: women,
      serieId: serieData ? serieData.serieId : null,
    },
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: zodResolver(serieAttributes),
  })

  const onSubmit = (serieFormData: SerieAttributes) => {
    mutation.mutate(serieFormData)
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

  const onSuccessSubmit = (data: SerieAttributes) => {
    client.invalidateQueries({ queryKey: ['singleSeason'] })
    toast({
      duration: 5000,
      title: serieData ? 'Uppdaterad serie' : 'Ny serie',
      description: data.serieName,
    })

    navigate({
      to: '/dashboard/season/$seasonId',
      params: { seasonId: seasonId },
      search: { women },
    })
  }

  const serieStructureArray = Array.from(
    { length: 14 },
    (_, index) => index + 1
  ).map((_, index) => {
    return { value: index + 1, label: `${index + 1}` }
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle>Serie</CardTitle>
          <div className="flex flex-row gap-2">
            <Button
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
            <Button type="submit" form="seriedataForm">
              Skicka
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="seriedataForm">
            <div className="flex flex-auto flex-col p-5 px-16">
              <div className="grid grid-cols-3 gap-x-20 gap-y-4">
                <FormComponent name="serieName" methods={form}>
                  <FormComponent.Label>Serienamn</FormComponent.Label>
                  <FormComponent.Input />
                </FormComponent>

                <FormComponent name="serieGroupCode" methods={form}>
                  <FormComponent.Label>Grupp</FormComponent.Label>
                  <FormComponent.Input />
                </FormComponent>

                <FormComponent name="serieCategory" methods={form}>
                  <FormComponent.Label>Kategori</FormComponent.Label>
                  <FormComponent.Input />
                </FormComponent>

                <FormComponent name="serieStructure" methods={form}>
                  <FormComponent.Label>Seriestruktur</FormComponent.Label>
                  <FormComponent.MultiCheckbox
                    className="grid grid-cols-1 gap-y-1 lg:grid-cols-3 lg:gap-x-16"
                    checkboxArray={serieStructureArray}
                  />
                </FormComponent>

                <FormComponent name="comment" methods={form}>
                  <FormComponent.Label>Kommentar</FormComponent.Label>
                  <FormComponent.Textarea className="min-w-[320px]" />
                </FormComponent>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default NewSeriesForm
