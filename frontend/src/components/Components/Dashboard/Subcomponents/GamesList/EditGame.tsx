import ErrorComponent from '@/components/Components/Dashboard/Subcomponents/GamesList/ErrorComponent'
import {
  getGroupArray,
  getTeamSelection,
} from '@/components/Components/Dashboard/Subcomponents/GamesList/utils/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/components/ui/use-toast'
import { editGame } from '@/lib/requests/games'
import { editGame as editGameObject } from '@/lib/types/games/games'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import GameFormComponent from './GameFormComponent'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/games/$serieId/$gameId/edit'
)

const EditGame = () => {
  const data = route.useLoaderData()
  const women = route.useSearch({
    select: (search) => search.women,
  })
  const { seasonId, serieId } = route.useParams()
  const teamSelection = getTeamSelection(data.gameFormData.teams)

  const groupArray = getGroupArray(data.gameFormData.series)

  const { toast } = useToast()
  const navigate = route.useNavigate()
  const router = useRouter()
  const submitMutation = useMutation({
    mutationFn: editGame,
    onSuccess: () => onSuccessSubmit(),
    onError: (error) => onErrorFunction(error),
  })

  const close = () => {
    navigate({
      to: '/dashboard/season/$seasonId/games/$serieId',
      search: { women },
      params: { seasonId, serieId },
    })
  }

  const onSuccessSubmit = () => {
    router.invalidate()
    toast({
      duration: 5000,
      title: 'Match uppdaterad',
    })
    close()
  }

  const onErrorFunction = (error: unknown) => {
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

  const form = useForm<z.infer<typeof editGameObject>>({
    defaultValues: data.gameData,
    criteriaMode: 'all',
    mode: 'onChange',
    resolver: zodResolver(editGameObject),
  })

  const {
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmit: SubmitHandler<z.infer<typeof editGameObject>> = (
    formData
  ) => {
    const gameData = {
      ...formData,
      homeTeamId: formData.homeTeamId ?? 176,
      awayTeamId: formData.awayTeamId ?? 176,
    }

    submitMutation.mutate({ formState: gameData })
  }
  return (
    <>
      <div className="fixed inset-y-40 z-50 m-2 flex items-center justify-center overflow-x-hidden outline-none focus:outline-none">
        <div className="fixed inset-2 mx-auto my-6 w-auto max-w-3xl">
          {/*content*/}
          <Card className="relative flex w-full flex-col">
            <CardHeader>
              <div className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Matchformulär</CardTitle>
                </div>
                <div className="flex flex-row gap-8">
                  <Button size="sm" variant="secondary" onClick={close}>
                    Stäng
                  </Button>
                  <Button size="sm" type="submit" form="GameForm">
                    Spara
                  </Button>
                </div>
              </div>
            </CardHeader>
            {/*body*/}
            <ScrollArea className="h-[400px]">
              <CardContent>
                <Form {...form}>
                  <form onSubmit={handleSubmit(onSubmit)} id="GameForm">
                    <GameFormComponent
                      teamSelection={teamSelection}
                      groupArray={groupArray}
                    />
                  </form>
                </Form>
                <div>
                  <ErrorComponent errors={errors} />
                </div>
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </>
  )
}

export default EditGame
