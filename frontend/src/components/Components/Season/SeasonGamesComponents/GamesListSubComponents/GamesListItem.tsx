import { Button } from '@/components/ui/button'
import useTeampreferenceContext from '@/lib/hooks/contextHooks/useTeampreferenceContext'
import useUserContext from '@/lib/hooks/contextHooks/useUserContext'
import { GameObjectType } from '@/lib/types/games/games'
import { setOrigin } from '@/lib/zustand/linkOrigin/linkOriginStore'
import { Link, useLocation, useSearch } from '@tanstack/react-router'
import { useMediaQuery } from 'usehooks-ts'
import EditGameButton from './EditGameButton'

type GamesListItemProps = {
  startSeason: number
  endSeason: number
  game: GameObjectType
}

const GamesListItem = ({ game }: GamesListItemProps) => {
  const { favTeams } = useTeampreferenceContext()
  const { women } = useSearch({ from: '/_layout' })
  const { user } = useUserContext()
  const pathname = useLocation({
    select: (location) => location.pathname,
  })
  const matches = useMediaQuery('(min-width: 768px)')

  return (
    <div key={game.gameId} className="flex w-full flex-row items-center gap-1">
      <div className="mb-1 flex w-full flex-row items-center justify-between gap-1 bg-muted px-1 md:px-2 text-[8px] transition-colors hover:bg-slate-100/50 dark:bg-muted/50  dark:hover:bg-slate-800/50 md:text-sm xl:mb-2 xl:w-[36rem] ">
        <span
          className={
            favTeams.includes(game.homeTeamId)
              ? 'w-24 font-bold text-primary sm:w-40 lg:w-40 xl:w-52'
              : 'w-24 sm:w-40 lg:w-40 xl:w-52'
          }
        >
          {game.homeTeam.casualName}
        </span>
        <span className="w-1 text-center xl:w-4"> - </span>
        <span
          className={
            favTeams.includes(game.awayTeamId)
              ? 'w-24 font-bold text-primary sm:w-40 lg:w-40 xl:w-52'
              : 'w-24 sm:w-40 lg:w-40 xl:w-52'
          }
        >
          {game.awayTeam.casualName}
        </span>

        <span className="w-16 text-right tabular-nums">{game.result}</span>

        {game.halftimeResult && (
          <>
            <span className="w-10 text-right text-[8px] tabular-nums md:text-xs">
              ({game.halftimeResult})
            </span>
          </>
        )}
        <Button
          asChild
          size={matches ? 'icon' : 'xs'}
          variant="ghost"
          onClick={() => setOrigin(pathname)}
        >
          <Link
            to="/teams/compare"
            search={{
              teamArray: [game.homeTeamId, game.awayTeamId],
              women: women,
            }}
          >
            <span className="text-[8px] md:text-xs">H2H</span>
          </Link>
        </Button>
        {user && matches && <EditGameButton game={game} />}
      </div>
    </div>
  )
}

export default GamesListItem
