import { FormComponent } from '@/components/Components/Common/ReactHookFormComponents/FormComponent'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/components/ui/use-toast'
import { postGame } from '@/lib/requests/games'
import {
  GameFormObjectType,
  GameObjectType,
  inputGameObject,
  InputGameObjectType,
} from '@/lib/types/games/games'

import { sortOrder } from '@/lib/utils/constants'
import { resetGame, useGameStore } from '@/lib/zustand/games/gameStore'
import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {
  useLoaderData,
  useNavigate,
  useParams,
  useRouter,
  useSearch,
} from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form'

const ErrorComponent = ({ errors }: { errors: FieldErrors }) => {
  if (Object.keys(errors).length === 0) {
    return null
  }
  return (
    <div className="mb-2 rounded border-red-700 bg-background p-2 text-sm font-semibold text-red-700 md:text-base">
      {Object.keys(errors).map((fieldName) => (
        <ErrorMessage
          errors={errors}
          name={fieldName}
          as="div"
          key={fieldName}
        />
      ))}
    </div>
  )
}

const initAdd = ({
  seasonId,
  women,
}: {
  seasonId: number
  women: boolean
}): InputGameObjectType => {
  return {
    seasonId: seasonId,
    homeTeamId: undefined,
    awayTeamId: undefined,
    result: '',
    halftimeResult: '',
    date: '',
    category: 'regular',
    group: 'elitserien',
    playoff: false,
    extraTime: false,
    penalties: false,
    women: women,
  }
}

const initEdit = (gameData: GameObjectType): InputGameObjectType => {
  if (!gameData.homeTeam || !gameData.awayTeam) {
    throw new Error('Missing game data')
  }
  return {
    gameId: gameData.gameId,
    seasonId: gameData.seasonId,
    homeTeamId: gameData.homeTeamId,
    awayTeamId: gameData.awayTeamId,
    result: gameData.result ?? '',
    halftimeResult: gameData.halftimeResult ?? '',
    date: gameData.date ?? '',
    category: gameData.category,
    group: gameData.group,
    playoff: gameData.playoff,
    extraTime: gameData.extraTime,
    penalties: gameData.penalties,
    women: gameData.women,
  }
}

const categoryArray = [
  { value: 'final', label: 'Final' },
  { value: 'semi', label: 'Semi' },
  { value: 'quarter', label: 'Kvart' },
  { value: 'eight', label: 'Åttondel' },
  { value: 'regular', label: 'Grundserie' },
  { value: 'qualification', label: 'Kvalmatch' },
]

const GameForm = () => {
  const { teams, series } = useLoaderData({
    from: '/_layout/dashboard/season/$seasonId/games/$serieId/$gameId/edit',
  })
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  const { seasonId, serieId } = useParams({
    from: '/_layout/dashboard/season/$seasonId/games/$serieId/$gameId/edit',
  })
  const navigate = useNavigate({
    from: '/dashboard/season/$seasonId/games/$serieId/$gameId/edit',
  })
  const { toast } = useToast()
  const gameData = useGameStore((state) => state.game)
  const router = useRouter()
  const submitMutation = useMutation({
    mutationFn: (newGameData: GameFormObjectType) => postGame(newGameData),
    onSuccess: () => onSuccessSubmit(),
    onError: (error) => onErrorFunction(error),
  })

  const close = () => {
    resetGame()
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
      title: 'Match inlagd/uppdaterad',
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

  const teamSelection = teams.map((team) => {
    return { value: team.teamId, label: team.name }
  })

  teamSelection.push({ value: 176, label: 'Ej Bestämt' })

  const groupArray = series
    .map((serie) => {
      return { value: serie.serieGroupCode, label: serie.serieName }
    })
    .sort((a, b) => {
      if (sortOrder.indexOf(a.value) > sortOrder.indexOf(b.value)) {
        return 1
      } else if (sortOrder.indexOf(a.value) < sortOrder.indexOf(b.value)) {
        return -1
      } else {
        return 0
      }
    })

  const form = useForm<InputGameObjectType>({
    defaultValues: gameData
      ? initEdit(gameData)
      : initAdd({ seasonId: parseInt(seasonId), women }),
    criteriaMode: 'all',
    mode: 'onChange',
    resolver: zodResolver(inputGameObject),
  })

  const {
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmit: SubmitHandler<InputGameObjectType> = (formData) => {
    const gameData = {
      ...formData,
      homeTeamId: formData.homeTeamId ?? 176,
      awayTeamId: formData.awayTeamId ?? 176,
    }

    submitMutation.mutate(gameData)
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
                    <div className="p-1">
                      <FormComponent methods={form} name="homeTeamId">
                        <FormComponent.Label>Hemmalag</FormComponent.Label>
                        <FormComponent.Select
                          selectionArray={teamSelection}
                          placeholder="Välj lag"
                        />
                      </FormComponent>
                    </div>
                    <div className="p-1">
                      <FormComponent methods={form} name="awayTeamId">
                        <FormComponent.Label>Bortalag</FormComponent.Label>
                        <FormComponent.Select
                          selectionArray={teamSelection}
                          placeholder="Välj lag"
                        />
                      </FormComponent>
                    </div>
                    <div className="flex flex-col py-2">
                      <div className="p-1">
                        <FormComponent methods={form} name="result">
                          <FormComponent.Label>Resultat</FormComponent.Label>
                          <FormComponent.Input />
                        </FormComponent>
                      </div>
                      <div className="p-1">
                        <FormComponent methods={form} name="halftimeResult">
                          <FormComponent.Label>
                            Halvtidsresultat
                          </FormComponent.Label>
                          <FormComponent.Input />
                        </FormComponent>
                      </div>
                      <div className="p-1">
                        <FormComponent methods={form} name="date">
                          <FormComponent.Label>Datum</FormComponent.Label>
                          <FormComponent.Input />
                        </FormComponent>
                      </div>

                      <div className="p-1">
                        <FormComponent methods={form} name="category">
                          <FormComponent.Label>Kategori</FormComponent.Label>
                          <FormComponent.RadioGroup
                            radioGroupArray={categoryArray}
                            className="grid grid-cols-3 gap-2"
                          />
                        </FormComponent>
                      </div>
                      <div className="p-1">
                        <FormComponent methods={form} name="group">
                          <FormComponent.Label>Grupp</FormComponent.Label>
                          <FormComponent.RadioGroup
                            radioGroupArray={groupArray}
                            className="grid grid-cols-2 gap-2"
                          />
                        </FormComponent>
                      </div>
                    </div>

                    <div className="flex flex-row gap-4">
                      <div className="p-1">
                        <FormComponent methods={form} name="playoff">
                          <div className="flex flex-row items-center gap-2">
                            <FormComponent.Label>Slutspel</FormComponent.Label>
                            <FormComponent.SingleCheckbox />
                          </div>
                        </FormComponent>
                      </div>

                      <div className="p-1">
                        <FormComponent methods={form} name="extraTime">
                          <div className="flex flex-row items-center gap-2">
                            <FormComponent.Label>Övertid</FormComponent.Label>
                            <FormComponent.SingleCheckbox />
                          </div>
                        </FormComponent>
                      </div>

                      <div className="p-1">
                        <FormComponent methods={form} name="penalties">
                          <div className="flex flex-row items-center gap-2">
                            <FormComponent.Label>Straffar</FormComponent.Label>
                            <FormComponent.SingleCheckbox />
                          </div>
                        </FormComponent>
                      </div>
                    </div>
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

export default GameForm
