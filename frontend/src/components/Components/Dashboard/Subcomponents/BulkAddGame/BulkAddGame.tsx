import { useDashboardStore } from '@/lib/zustand/dashboard/dashboardStore'
import { getRouteApi } from '@tanstack/react-router'
import { useState } from 'react'
import BulkGameForm from './BulkGameForm'
import FileInput from './FileInput'

type Games = {
  date: string
  homeTeam: string
  homeTeamId: string
  awayTeam: string
  awayTeamId: string
  seasonId: number
  category: string
  group: string
  women: boolean
  serieId: number
}

type GameArrayType = {
  date: string
  home: string
  away: string
}

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/games/$serieId/bulkGames/'
)

const BulkAddGame = () => {
  const women = useDashboardStore((state) => state.dashboard.women)
  const { serie, teams } = route.useLoaderData()
  const { seasonId, serieId } = route.useParams()
  const [gamesList, setGamesList] = useState<GameArrayType[]>([])

  const group = serie.serieGroupCode
  const category = serie.serieCategory

  const games: Games[] =
    gamesList.length > 0
      ? gamesList.map((game) => {
          return {
            date: game.date,
            homeTeamId: game.home,
            homeTeam:
              teams?.find((team) => team.teamId.toString() === game.home)?.team
                .casualName ?? 'Lag saknas',
            awayTeamId: game.away,
            awayTeam:
              teams?.find((team) => team.teamId.toString() === game.away)?.team
                .casualName ?? 'Lag saknas',
            seasonId,
            group,
            category,
            women,
            serieId,
          }
        })
      : []

  const missingTeams = games.filter(
    (game) => game.homeTeam === 'Lag saknas' || game.awayTeam === 'Lag saknas'
  ).length

  return (
    <div>
      <form className="mb-4">
        <FileInput setGamesList={setGamesList} />
      </form>
      {missingTeams > 0 ? <p>Lag saknas i {missingTeams} match(er).</p> : null}
      {games.length > 0 ? <BulkGameForm gameArray={games} /> : null}
    </div>
  )
}

export default BulkAddGame
