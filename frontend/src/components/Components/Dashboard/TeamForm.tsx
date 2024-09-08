import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import teamFormReducer from '@/lib/reducers/teamFormReducer'
import { postTeam } from '@/lib/requests/teams'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, SyntheticEvent, useReducer } from 'react'

const initState = {
  city: '',
  name: '',
  casualName: '',
  shortName: '',
  lat: 0,
  long: 0,
  women: false,
}

const TeamForm = () => {
  const mutation = useMutation({ mutationFn: postTeam })
  const [formState, dispatch] = useReducer(teamFormReducer, initState)
  const queryClient = useQueryClient()

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    mutation.mutate({ formState })
    queryClient.invalidateQueries({ queryKey: ['teams'] })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'INPUT',
      field: event.target.name,
      payload: event.target.value,
    })
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
                      value={formState.lat}
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
                      value={formState.long}
                      onChange={(event) => handleChange(event)}
                    />
                  </div>
                </label>
              </div>

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
                      onChange={() => dispatch({ type: 'TOGGLE' })}
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
