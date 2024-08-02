import { CheckedState } from '@/components/ui/checkbox'

import { useGetTeams } from '@/lib/hooks/dataHooks/teams/useGetTeams'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import FilterComponent from '../FilterComponent'
import MemoMapItem from './MapItem'

const Map = () => {
  const [teamFilter, setTeamFilter] = useState<string>('')
  const { women, teamArray } = useSearch({ from: '/_layout/teams' })
  const [selectedTeams, setSelectedTeams] = useState<number[]>(teamArray ?? [])
  const { data } = useGetTeams()

  const navigate = useNavigate({ from: '/teams' })

  const teams = data
    .filter((team) => team.teamId !== 176)
    .filter((team) => team.women === women)
    .filter((team) =>
      team.name.toLowerCase().includes(teamFilter.toLowerCase())
    )

  const onCheckedChange = useCallback(
    (checked: CheckedState, teamId: number) => {
      if (checked) {
        setSelectedTeams((prev) => [...prev, teamId])
        navigate({
          search: (prev) => {
            if (prev.teamArray) {
              return { ...prev, teamArray: [...prev.teamArray, teamId] }
            } else {
              return { ...prev, teamArray: [teamId] }
            }
          },
        })
      } else {
        setSelectedTeams((prev) => prev.filter((team) => team !== teamId))
        navigate({
          search: (prev) => {
            if (prev.teamArray && prev.teamArray.includes(teamId)) {
              return {
                ...prev,
                teamArray: [
                  ...prev.teamArray.filter((team) => team !== teamId),
                ],
              }
            } else {
              return { ...prev, teamArray: [] }
            }
          },
        })
      }
    },
    [navigate]
  )

  return (
    <div>
      <FilterComponent teamFilter={teamFilter} setTeamFilter={setTeamFilter} />
      <div>
        <div className="mx-auto mb-2 min-h-screen px-1 font-inter text-foreground lg:px-0">
          <div id="map" className="h-[400px] w-screen max-w-xl p-2">
            <MapContainer
              center={[62, 15]}
              zoom={4}
              scrollWheelZoom={true}
              className="h-[400px]"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MarkerClusterGroup chunkedLoading>
                {teams.map((team) => {
                  const position = [team.lat, team.long] as [number, number]
                  return (
                    <MemoMapItem
                      key={team.teamId}
                      team={team}
                      position={position}
                      selectedTeams={selectedTeams}
                      onCheckedChange={onCheckedChange}
                    />
                  )
                })}
              </MarkerClusterGroup>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map
