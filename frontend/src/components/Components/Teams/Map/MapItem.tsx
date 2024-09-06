import { Checkbox, CheckedState } from '@/components/ui/checkbox'
import { Link, useSearch } from '@tanstack/react-router'
import { memo } from 'react'
import { Marker, Popup } from 'react-leaflet'

type Team = {
  teamId: number
  casualName: string
}

type MapItemProps = {
  team: Team
  selectedTeams: number[]
  position: [number, number]
  onCheckedChange: (checked: CheckedState, teamId: number) => void
}

const MapItem = ({
  team,
  position,
  selectedTeams,
  onCheckedChange,
}: MapItemProps) => {
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  return (
    <Marker key={team.teamId} position={position}>
      <Popup>
        <div className="flex flex-row items-center justify-evenly gap-2 p-2">
          <Link
            to="/team/$teamId"
            params={{
              teamId: team.teamId.toString(),
            }}
            search={{ women }}
          >
            {team.casualName}
          </Link>

          <Checkbox
            name="teamArray"
            checked={selectedTeams.includes(team.teamId)}
            onCheckedChange={(checked) => onCheckedChange(checked, team.teamId)}
          />
        </div>
      </Popup>
    </Marker>
  )
}

const arePropsEqual = (prev: MapItemProps, next: MapItemProps) =>
  prev.selectedTeams.includes(prev.team.teamId) ===
  next.selectedTeams.includes(next.team.teamId)

const MemoMapItem = memo(MapItem, arePropsEqual)

export default MemoMapItem
