import { Button } from '@/components/ui/button'
import { CardHeader, CardTitle } from '@/components/ui/card'
import useTeampreferenceContext from '@/lib/hooks/contextHooks/useTeampreferenceContext'
import {
  addToFavTeams,
  removeFromFavTeams,
} from '@/lib/reducers/favteamsReducer'

import {
  getOrigin,
  resetOrigin,
} from '@/lib/zustand/linkOrigin/linkOriginStore'
import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { useMediaQuery } from 'usehooks-ts'

const route = getRouteApi('/_layout/team/$teamId')

const TeamHeader = () => {
  const team = route.useLoaderData({ select: (data) => data.team })
  const teamId = route.useParams({ select: (params) => params.teamId })
  const matches = useMediaQuery('(min-width: 430px)')
  const { favTeams, favTeamsDispatch } = useTeampreferenceContext()
  const { origin } = getOrigin()
  const navigate = useNavigate()

  const goBack = () => {
    origin && navigate({ to: origin })
    resetOrigin()
  }

  const add = () => {
    favTeamsDispatch(addToFavTeams(teamId))
  }

  const remove = () => {
    favTeamsDispatch(removeFromFavTeams(teamId))
  }

  return (
    <CardHeader className="p-1 md:p-6">
      <div className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm md:text-lg">{team.name}</CardTitle>

        <div className="flex flex-row gap-1">
          <Button onClick={goBack} size={matches ? 'sm' : 'xxs'}>
            Tillbaka
          </Button>
          {favTeams.includes(teamId) && (
            <Button onClick={remove} size={matches ? 'sm' : 'xxs'}>
              Ta bort favorit
            </Button>
          )}
          {!favTeams.includes(teamId) && (
            <div>
              <Button onClick={add} size={matches ? 'sm' : 'xxs'}>
                Favoritlag
              </Button>
            </div>
          )}
        </div>
      </div>
    </CardHeader>
  )
}

export default TeamHeader
