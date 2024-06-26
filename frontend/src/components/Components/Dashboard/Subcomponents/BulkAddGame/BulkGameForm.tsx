import {
  Form,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FormContent } from '../SeasonsList'
import { useAddGamesMutation } from '@/lib/hooks/dataHooks/games/useAddGamesMutation'
import {
  useAddGamesForm,
  Game,
  initialData,
} from '@/lib/hooks/dataHooks/games/useBulkGameForm'

type BulkGameFormProps = {
  gameArray: Game[]
  setTab: Dispatch<SetStateAction<string>>
  setFormContent: Dispatch<SetStateAction<FormContent>>
}

const BulkGameForm = ({
  gameArray,
  setTab,
  setFormContent,
}: BulkGameFormProps) => {
  const [games, setGames] = useState<Game[]>(() => initialData)

  const mutation = useAddGamesMutation(setTab, setFormContent)

  const { form, handleSubmit, fields, replace } = useAddGamesForm(games)

  useEffect(() => {
    setGames(gameArray)
    replace(gameArray)
  }, [gameArray, replace])

  const onSubmit = ({ games }: { games: Game[] }) => {
    mutation.mutate(games)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            {fields.map((field, index) => {
              return (
                <div className="flex flex-row gap-2" key={field.id}>
                  <FormField
                    control={form.control}
                    name={`games.${index}.date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Datum</FormLabel>

                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`games.${index}.homeTeam`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hemmalag</FormLabel>

                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`games.${index}.homeTeamId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hemma-ID</FormLabel>

                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`games.${index}.awayTeam`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bortalag</FormLabel>

                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`games.${index}.awayTeamId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Borta-ID</FormLabel>

                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )
            })}
          </div>
          <Button type="submit">Skicka</Button>
        </form>
      </Form>
    </div>
  )
}

export default BulkGameForm
