import { Button } from '@/components/ui/button'
import useTeampreferenceContext from '@/lib/hooks/contextHooks/useTeampreferenceContext'
import { GameObjectType } from '@/lib/types/games/games'
import { useNavigate } from '@tanstack/react-router'
import { useMediaQuery } from 'usehooks-ts'

type GamesListItemProps = {
  game: GameObjectType
}

const GamesListItem = ({ game }: GamesListItemProps) => {
  const { favTeams } = useTeampreferenceContext()
  const navigate = useNavigate({ from: '/season/$seasonId/games' })

  const matches = useMediaQuery('(min-width: 768px)')

  const onClickHandler = () => {
    navigate({
      to: '/teams/compare',
      search: (prev) => ({
        ...prev,
        teamArray: [game.homeTeamId, game.awayTeamId],
      }),
    })
  }

  return (
    <div key={game.gameId} className="flex w-full flex-row items-center gap-1">
      <div className="py-0.5 mb-1 flex w-full flex-row items-center justify-between gap-1 bg-muted px-1 md:px-2 text-[8px] transition-colors hover:bg-slate-100/50 dark:bg-muted/50  dark:hover:bg-slate-800/50 md:text-sm xl:mb-2 xl:w-[36rem] ">
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
          size={matches ? 'sm' : 'xs'}
          variant="ghost"
          onClick={onClickHandler}
        >
          H2H
        </Button>
      </div>
    </div>
  )
}

export default GamesListItem
