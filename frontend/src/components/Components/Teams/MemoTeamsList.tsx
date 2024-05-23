import FilterComponent from '@/components/Components/Teams/FilterComponent'
import { FormField, FormItem, FormControl } from '@/components/ui/form'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import useTeampreferenceContext from '@/lib/hooks/contextHooks/useTeampreferenceContext'
import { useGetTeams } from '@/lib/hooks/dataHooks/teams/useGetTeams'

import { Checkbox } from '@/components/ui/checkbox'

import { useState, memo } from 'react'
import { Path, FieldValues, UseFormReturn } from 'react-hook-form'

interface MemoTeamsListProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  methods: UseFormReturn<TFieldValues>
  name: TName
}

const MemoTeamsList = memo(
  <
    TFieldValues extends FieldValues = FieldValues,
    TName extends Path<TFieldValues> = Path<TFieldValues>,
  >({
    methods,
    name,
  }: MemoTeamsListProps<TFieldValues, TName>) => {
    const [teamFilter, setTeamFilter] = useState<string>('')
    const { women } = useGenderContext()
    const { data } = useGetTeams()
    const { favTeams } = useTeampreferenceContext()

    const teams = data
      .filter((team) => team.teamId !== 176)
      .filter((team) => team.women === women)
      .filter((team) =>
        team.name.toLowerCase().includes(teamFilter.toLowerCase())
      )
    return (
      <div>
        <FilterComponent
          teamFilter={teamFilter}
          setTeamFilter={setTeamFilter}
        />
        <FormField
          control={methods.control}
          name={name}
          render={() => (
            <FormItem>
              <div className="grid w-2/3 grid-cols-1 gap-x-8 gap-y-2 pt-2 lg:grid-cols-3">
                {teams.map((team) => {
                  return (
                    <div key={team.teamId} className="">
                      <FormField
                        key={team.teamId}
                        control={methods.control}
                        name={name}
                        render={({ field }) => {
                          return (
                            <FormItem
                              id={team.teamId.toString()}
                              key={team.teamId}
                              className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded bg-muted p-2 text-sm has-[:checked]:bg-primary has-[:checked]:text-white dark:bg-muted/50 md:text-base"
                            >
                              <span
                                className={
                                  favTeams.includes(team.teamId)
                                    ? 'w-32 cursor-pointer font-bold md:text-base'
                                    : 'w-32 cursor-pointer md:text-base'
                                }
                              >
                                {team.casualName}
                              </span>
                              <FormControl>
                                <Checkbox
                                  name={field.name}
                                  checked={field.value?.includes(team.teamId)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          team.teamId,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value: number) =>
                                              value !== team.teamId
                                          )
                                        )
                                  }}
                                  className="bg-muted data-[state=checked]:border-white data-[state=checked]:bg-primary data-[state=checked]:text-white dark:bg-muted/50 dark:data-[state=checked]:border-white dark:data-[state=checked]:bg-primary dark:data-[state=checked]:text-white"
                                />
                              </FormControl>
                            </FormItem>
                          )
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </FormItem>
          )}
        />
      </div>
    )
  },
  (prevProps, nextProps) =>
    prevProps.methods.getFieldState('teamArray', prevProps.methods.formState)
      .isDirty ===
    nextProps.methods.getFieldState('teamArray', nextProps.methods.formState)
      .isDirty
)

export default MemoTeamsList
