import { CheckedState } from '@/components/ui/checkbox'

import { useGetTeams } from '@/lib/hooks/dataHooks/teams/useGetTeams'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import FilterComponent from '../FilterComponent'
import MemoListItem from './TeamsListIem'

const TeamsList = () => {
  const [teamFilter, setTeamFilter] = useState<string>('')
  const { women, teamArray } = useSearch({ from: '/_layout/teams/' })
  const [selectedTeams, setSelectedTeams] = useState<number[]>(teamArray ?? [])
  const { data } = useGetTeams()

  const navigate = useNavigate({ from: '/teams/' })

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
      <div className="grid w-2/3 grid-cols-1 gap-x-8 gap-y-2 pt-2 lg:grid-cols-3">
        {teams.map((team) => {
          return (
            <MemoListItem
              key={team.teamId}
              team={team}
              selectedTeams={selectedTeams}
              onCheckedChange={onCheckedChange}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TeamsList