import { Checkbox, CheckedState } from '@/components/ui/checkbox'
import useTeampreferenceContext from '@/lib/hooks/contextHooks/useTeampreferenceContext'
import { setOrigin } from '@/lib/zustand/linkOrigin/linkOriginStore'
import { Link, useLocation, useSearch } from '@tanstack/react-router'
import { memo } from 'react'

type Team = {
  teamId: number | null
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
  const pathName = useLocation().pathname
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })

  if (team.teamId === null) return null

  return (
    <div className="has-data-[state=checked]:font-bold flex flex-row items-center justify-between space-x-3 space-y-0 rounded bg-muted p-2 text-sm dark:bg-muted/50 md:text-base">
      <span
        className={
          favTeams.includes(team.teamId)
            ? 'w-32 font-bold md:text-base peer-data-[state=checked]:underline'
            : 'w-32 md:text-base peer-data-[state=checked]:underline'
        }
      >
        <Link
          from="/teams"
          to="/team/$teamId"
          params={{ teamId: team.teamId.toString() }}
          search={(prev) => ({ ...prev })}
          onClick={() => setOrigin(`${pathName}?women=${women}`)}
        >
          {team.casualName}
        </Link>
      </span>
      <Checkbox
        name="teamArray"
        checked={selectedTeams.includes(team.teamId)}
        onCheckedChange={(checked) =>
          team.teamId && onCheckedChange(checked, team.teamId)
        }
        className="peer bg-muted data-[state=checked]:border-primary data-[state=checked]:bg-background data-[state=checked]:text-primary dark:bg-muted/50 dark:data-[state=checked]:border-white dark:data-[state=checked]:bg-background dark:data-[state=checked]:text-primary"
      />
    </div>
  )
}

const arePropsEqual = (prev: TeamsListItemProps, next: TeamsListItemProps) =>
  prev.selectedTeams.includes(prev.team.teamId ?? 0) ===
  next.selectedTeams.includes(next.team.teamId ?? 0)

const MemoListItem = memo(TeamsListItem, arePropsEqual)

export default MemoListItem
