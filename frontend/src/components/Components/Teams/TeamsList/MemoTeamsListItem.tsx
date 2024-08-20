import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import useTeampreferenceContext from '@/lib/hooks/contextHooks/useTeampreferenceContext'
import { Link } from '@tanstack/react-router'
import { memo } from 'react'
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form'

type Team = {
  teamId: number
  casualName: string
}

interface TeamsListItemProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  arrayValues: PathValue<TFieldValues, TName>
  name: TName
  team: Team
}

const TeamsListItem = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  arrayValues,
  team,
  name,
}: TeamsListItemProps<TFieldValues, TName>) => {
  const { favTeams } = useTeampreferenceContext()
  const methods = useFormContext()

  return (
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
                  ? 'w-32 font-bold md:text-base'
                  : 'w-32 md:text-base'
              }
            >
              <Link
                to="/team/$teamId"
                params={{ teamId: team.teamId.toString() }}
                search={(prev) => ({ ...prev })}
              >
                {team.casualName}
              </Link>
            </span>
            <FormControl>
              <Checkbox
                name={field.name}
                checked={arrayValues.includes(team.teamId)}
                onCheckedChange={(checked) => {
                  return checked
                    ? field.onChange([...field.value, team.teamId])
                    : field.onChange(
                        field.value?.filter(
                          (value: number) => value !== team.teamId
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
  )
}

const arePropsEqual = (prev: TeamsListItemProps, next: TeamsListItemProps) =>
  prev.arrayValues.includes(prev.team.teamId) ===
  next.arrayValues.includes(next.team.teamId)

const MemoTeamsListItem = memo(TeamsListItem, arePropsEqual)

export default MemoTeamsListItem
