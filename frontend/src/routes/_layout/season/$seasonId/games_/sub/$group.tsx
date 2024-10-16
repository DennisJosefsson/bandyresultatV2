import Loading from '@/components/Components/Common/Loading'
import SubSeasonGames from '@/components/Components/Season/SeasonGamesComponents/SubSeasonGames'
import { getSeasonSubGames } from '@/lib/requests/games'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/season/$seasonId/games/sub/$group'
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: ({ params, deps }) =>
    getSeasonSubGames({
      seasonId: params.seasonId,
      women: deps.women,
      group: params.group,
    }),
  pendingComponent: () => <Loading page="seasonGamesList" />,
  component: SubSeasonGames,
})
