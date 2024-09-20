import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { countyQueries } from '@/lib/queries/county/queries'
import { municipalityQueries } from '@/lib/queries/municipality/queries'
import teamFormReducer from '@/lib/reducers/teamFormReducer'
import { postTeam } from '@/lib/requests/teams'
import {
  getTeam,
  resetTeam,
  TeamStore,
} from '@/lib/zustand/dashboard/teamStore'
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { ChangeEvent, SyntheticEvent, useReducer, useState } from 'react'

export type TeamFormInit = {
  teamId: number | null
  city: string
  name: string
  casualName: string
  shortName: string
  lat: number | null
  long: number | null
  women: boolean
  countyId: string
  municipalityId: string
}

const initState = {
  teamId: null,
  city: '',
  name: '',
  casualName: '',
  shortName: '',
  lat: 0,
  long: 0,
  women: false,
  countyId: '',
  municipalityId: '',
} satisfies TeamFormInit

const formDataInitiation = (teamStore: TeamStore): TeamFormInit => {
  const { team } = teamStore
  if (!team) return initState
  return {
    ...team,
    lat: team.lat ?? 0,
    long: team.long ?? 0,
    countyId: team.countyId.toString(),
    municipalityId: team.municipalityId?.toString() ?? '',
  }
}

const TeamForm = () => {
  const mutation = useMutation({
    mutationFn: postTeam,
    onSuccess: () => onSuccessMutation(),
    onError: (error) => onErrorMutation(error),
  })
  const team = getTeam()
  const [formState, dispatch] = useReducer(
    teamFormReducer,
    formDataInitiation(team)
  )
  const [countyId, setCountyId] = useState<number | null>(
    team.team ? team.team.countyId : null
  )
  const { data: counties, isPending } = useSuspenseQuery(countyQueries['all']())
  const { data: municipalities } = useQuery(
    municipalityQueries['teamForm'](countyId)
  )
  const queryClient = useQueryClient()
  const navigate = useNavigate({ from: '/dashboard/addTeams' })
  const { toast } = useToast()
  const women = useSearch({
    from: '/_layout',
    select(search) {
      return search.women
    },
  })

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    mutation.mutate({ formState })
  }

  const onSuccessMutation = () => {
    queryClient.invalidateQueries({ queryKey: ['teams'] })
    toast({
      duration: 5000,
      title: 'Nytt lag inlagt',
    })
    resetTeam()
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'INPUT',
      field: event.target.name,
      payload: event.target.value,
    })
  }

  const handleCountyChange = (value: string) => {
    dispatch({
      type: 'INPUT',
      field: 'countyId',
      payload: value,
    })
    setCountyId(parseInt(value))
  }

  const handleMunicipalityChange = (value: string) => {
    dispatch({
      type: 'INPUT',
      field: 'municipalityId',
      payload: value,
    })
  }

  if (isPending) {
    return (
      <div className="mt-2 flex flex-row justify-center">
        <p>Väntar...</p>
      </div>
    )
  }

  return (
    <div className="mt-2">
      <Card>
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <CardTitle>Lägg till nytt lag</CardTitle>

            <Button type="submit" form="teamForm" value="Spara">
              Spara
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} id="teamForm">
            <div className="flex flex-col gap-2">
              <div>
                <label
                  htmlFor="name"
                  className="flex flex-row items-center text-sm font-medium text-foreground"
                >
                  <div className="w-32">Lagnamn:</div>
                  <div>
                    <Input
                      className="w-72 rounded-lg border border-gray-300 bg-background text-sm text-foreground"
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={(event) => handleChange(event)}
                    />
                  </div>
                </label>
              </div>
              <div>
                <label
                  htmlFor="casualName"
                  className="flex flex-row items-center text-sm font-medium text-foreground"
                >
                  <div className="w-32">Vanligt namn:</div>
                  <div>
                    <Input
                      className="w-72 rounded-lg border border-gray-300 bg-background text-sm text-foreground"
                      type="text"
                      name="casualName"
                      value={formState.casualName}
                      onChange={(event) => handleChange(event)}
                    />
                  </div>
                </label>
              </div>
              <div>
                <label
                  htmlFor="shortName"
                  className="flex flex-row items-center text-sm font-medium text-foreground"
                >
                  <div className="w-32">Förkortning:</div>
                  <div>
                    <Input
                      className="w-72 rounded-lg border border-gray-300 bg-background text-sm text-foreground"
                      type="text"
                      name="shortName"
                      value={formState.shortName}
                      onChange={(event) => handleChange(event)}
                    />
                  </div>
                </label>
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="flex flex-row items-center text-sm font-medium text-foreground"
                >
                  <div className="w-32">Stad:</div>
                  <div>
                    <Input
                      className="w-72 rounded-lg border border-gray-300 bg-background text-sm text-foreground"
                      type="text"
                      name="city"
                      value={formState.city}
                      onChange={(event) => handleChange(event)}
                    />
                  </div>
                </label>
              </div>
              <div>
                <label
                  htmlFor="lat"
                  className="flex flex-row items-center text-sm font-medium text-foreground"
                >
                  <div className="w-32">Latitud:</div>
                  <div>
                    <Input
                      className="w-72 rounded-lg border border-gray-300 bg-background text-sm text-foreground"
                      type="text"
                      name="lat"
                      value={formState.lat?.toString()}
                      onChange={(event) => handleChange(event)}
                    />
                  </div>
                </label>
              </div>
              <div>
                <label
                  htmlFor="long"
                  className="flex flex-row items-center text-sm font-medium text-foreground"
                >
                  <div className="w-32">Longitud:</div>
                  <div>
                    <Input
                      className="w-72 rounded-lg border border-gray-300 bg-background text-sm text-foreground"
                      type="text"
                      name="long"
                      value={formState.long?.toString()}
                      onChange={(event) => handleChange(event)}
                    />
                  </div>
                </label>
              </div>
              <div>
                <label
                  htmlFor="countyId"
                  className="flex flex-row items-center text-sm font-medium text-foreground"
                >
                  <div className="w-32">Län</div>
                  <Select
                    name="countyId"
                    onValueChange={handleCountyChange}
                    defaultValue={formState.countyId ?? 'Välj län'}
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Välj län" />
                    </SelectTrigger>
                    <SelectContent>
                      {counties.map((county) => {
                        return (
                          <SelectItem
                            value={county.countyId.toString()}
                            key={`county-${county.countyId}`}
                          >
                            {county.name}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </label>
              </div>
              {municipalities ? (
                <div>
                  <label
                    htmlFor="municipalityId"
                    className="flex flex-row items-center text-sm font-medium text-foreground"
                  >
                    <div className="w-32">Kommun</div>
                    <Select
                      name="municipalityId"
                      onValueChange={handleMunicipalityChange}
                      defaultValue={formState.municipalityId ?? 'Välj kommun'}
                    >
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Välj kommun" />
                      </SelectTrigger>
                      <SelectContent>
                        {municipalities.map((muni) => {
                          return (
                            <SelectItem
                              value={muni.municipalityId.toString()}
                              key={`muni-${muni.municipalityId}`}
                            >
                              {muni.name}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </label>
                </div>
              ) : (
                <p>Väntar på län...</p>
              )}

              <div>
                <label
                  htmlFor="women"
                  className="flex flex-row items-center text-sm font-medium text-foreground mt-4"
                >
                  <div className="w-32">Damlag?</div>
                  <div>
                    <Checkbox
                      className="text-foreground focus:ring-gray-500"
                      name="women"
                      checked={formState.women}
                      onCheckedChange={() => dispatch({ type: 'TOGGLE' })}
                    />
                  </div>
                </label>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default TeamForm
