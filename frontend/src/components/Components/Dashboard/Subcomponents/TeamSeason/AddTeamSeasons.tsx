import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useAddTeamSeasonMutation } from '@/lib/hooks/dataHooks/teams/useAddTeamSeasonMutation'
import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/_layout/dashboard/season/$seasonId/teamseason/')

const TeamSeasonForm = () => {
  const navigate = route.useNavigate()
  const { seasonId } = route.useParams()
  const { allTeams, teamseasons } = route.useLoaderData()
  const women = route.useSearch({ select: (search) => search.women })
  const mutation = useAddTeamSeasonMutation()

  const [teamFilter, setTeamFilter] = useState('')
  const teamSelection = allTeams
    .filter((team) => team.women === women)
    .map((team) => {
      if (team.teamId === null) throw Error('Missing teamId')
      return {
        value: team.teamId,
        label: team.name,
      }
    })

  const onClickTeamButton = (teamId: number) => {
    const exist = teamseasons.find((team) => team.teamId === teamId)
    if (exist) return

    const teamSeason = {
      seasonId: seasonId,
      teamId: teamId,
      women: women,
      qualification: false,
      negQualification: false,
      promoted: false,
      relegated: false,
      position: null,
      points: null,
      playoff: false,
      eight: false,
      quarter: false,
      semi: false,
      final: false,
      gold: false,
    }

    mutation.mutate({ formState: teamSeason })
  }

  return (
    <>
      <div className="flex items-start justify-between p-5">
        <h3 className="text-lg font-semibold">Lägg till lag</h3>
        <div className="flex items-center justify-end gap-2 p-6">
          <Button
            onClick={() =>
              navigate({
                to: '/dashboard/season/$seasonId',
                params: { seasonId: seasonId },
                search: { women },
              })
            }
          >
            Tillbaka
          </Button>

          <Input
            className="rounded"
            type="text"
            placeholder="Filter"
            value={teamFilter}
            name="teamFilter"
            onChange={(event) => setTeamFilter(event.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-row flex-wrap content-start gap-2 w-1/3">
          {teamSelection
            .filter((team) => team.label.includes(teamFilter))
            .map((team) => {
              return (
                <div
                  key={team.value}
                  className="flex flex-row items-center bg-background text-xs font-medium text-foreground"
                >
                  <Button
                    size="sm"
                    onClick={() => onClickTeamButton(team.value)}
                  >
                    {team.label}
                  </Button>
                </div>
              )
            })}
        </div>
        <div className="flex flex-col gap-2">
          <h6>Inlagda lag</h6>
          <div>
            <ul>
              {teamseasons.map((team) => {
                return <li key={team.teamId}>{team.team.name}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default TeamSeasonForm
