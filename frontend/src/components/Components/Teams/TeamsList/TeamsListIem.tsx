import { Checkbox, CheckedState } from '@/components/ui/checkbox'
import useTeampreferenceContext from '@/lib/hooks/contextHooks/useTeampreferenceContext'
import { Link } from '@tanstack/react-router'
import { memo } from 'react'

type Team = {
  teamId: number
  casualName: string
}

type TeamsListItemProps = {
  team: Team
  selectedTeams: number[]
  onCheckedChange: (checked: CheckedState, teamId: number) => void
}

const TeamsListItem = ({
  team,
  selectedTeams,
  onCheckedChange,
}: TeamsListItemProps) => {
  const { favTeams } = useTeampreferenceContext()

  return (
    <div className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded bg-muted p-2 text-sm has-[:checked]:bg-primary has-[:checked]:text-white dark:bg-muted/50 md:text-base">
      <span
        className={
          favTeams.includes(team.teamId)
            ? 'w-32 font-bold md:text-base'
            : 'w-32 md:text-base'
        }
      >
        <Link
          from="/teams"
          to="/team/$teamId"
          params={{ teamId: team.teamId.toString() }}
          search={(prev) => ({ ...prev })}
        >
          {team.casualName}
        </Link>
      </span>
      <Checkbox
        name="teamArray"
        checked={selectedTeams.includes(team.teamId)}
        onCheckedChange={(checked) => onCheckedChange(checked, team.teamId)}
        className="bg-muted data-[state=checked]:border-white data-[state=checked]:bg-primary data-[state=checked]:text-white dark:bg-muted/50 dark:data-[state=checked]:border-white dark:data-[state=checked]:bg-primary dark:data-[state=checked]:text-white"
      />
    </div>
  )
}

const arePropsEqual = (prev: TeamsListItemProps, next: TeamsListItemProps) =>
  prev.selectedTeams.includes(prev.team.teamId) ===
  next.selectedTeams.includes(next.team.teamId)

const MemoListItem = memo(TeamsListItem, arePropsEqual)

export default MemoListItem
