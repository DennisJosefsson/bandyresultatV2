import { useToast } from '@/components/ui/use-toast'
import { postTeamSerie } from '@/lib/requests/teamSeries'
import { useMutation } from '@tanstack/react-query'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { AxiosError } from 'axios'

const route = getRouteApi('/_layout/dashboard/season/$seasonId/info/$serieId')

const AddTeamToSeries = () => {
  const router = useRouter()
  const { toast } = useToast()
  const seasonTeams = route.useLoaderData({ select: (s) => s.season.teams })
  const serieId = route.useParams({ select: (params) => params.serieId })
  const mutation = useMutation({
    mutationFn: postTeamSerie,
    onSuccess: () => onSuccessMutation(),
    onError: (error) => onErrorMutation(error),
  })

  const onSuccessMutation = () => {
    router.invalidate()
    toast({
      duration: 2500,
      title: 'Lag tillagt',
    })
  }

  const onErrorMutation = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast({
        duration: 2500,
        title: 'Fel',
        description: error.response?.data.errors,
        variant: 'destructive',
      })
    } else {
      toast({
        duration: 2500,
        title: 'Något gick fel',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <h6 className="text-base">Lag från säsongen</h6>
      <ul>
        {seasonTeams.map((team) => {
          return (
            <li
              key={team.teamId}
              className="cursor-pointer"
              onClick={() =>
                mutation.mutate({ serieId: serieId, teamId: team.teamId })
              }
            >
              {team.team.casualName}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default AddTeamToSeries
