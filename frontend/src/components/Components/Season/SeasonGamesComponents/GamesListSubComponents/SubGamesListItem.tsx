import { Button } from '@/components/ui/button'
import useTeampreferenceContext from '@/lib/hooks/contextHooks/useTeampreferenceContext'
import { gameObject } from '@/lib/types/games/gameObject'
import { cn } from '@/lib/utils/utils'
import { setOrigin } from '@/lib/zustand/linkOrigin/linkOriginStore'
import { useLocation, useNavigate, useSearch } from '@tanstack/react-router'
import { useMediaQuery } from 'usehooks-ts'
import { z } from 'zod'

type SubGamesListItemProps = {
  game: z.infer<typeof gameObject>
}

const SubGamesListItem = ({ game }: SubGamesListItemProps) => {
  const { favTeams } = useTeampreferenceContext()
  const navigate = useNavigate({ from: '/season/$seasonId/games/sub/$group' })
  const pathName = useLocation().pathname
  const matches = useMediaQuery('(min-width: 768px)')
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })

  const onClickHandler = (gameId: number) => {
    setOrigin(`${pathName}?women=${women}#${gameId}`)
    navigate({
      to: '/teams/compare',
      search: (prev) => ({
        ...prev,
        teamArray: [game.homeTeamId, game.awayTeamId],
      }),
    })
  }

  return (
    <div className="flex flex-row items-center w-full gap-1">
      <div
        id={game.gameId?.toString()}
        className="rounded-sm py-0.5 mb-1 flex w-full flex-row items-center justify-between gap-1 bg-muted px-1 md:px-2 text-[10px] transition-colors dark:bg-muted/50  dark:hover:bg-slate-800/50 md:text-sm xl:text-base 2xl:text-lg xl:mb-2 xl:w-[36rem] 2xl:w-[44rem]"
      >
        <span
          className={cn('w-24 sm:w-40 lg:w-40 xl:w-52 2xl:w-60', favTeams.includes(game.homeTeamId)
            ? 'font-bold'
            : null)
            
          }
        >
          {game.homeTeam.casualName}
        </span>
        <span className="w-1 text-center xl:w-4"> - </span>
        <span
          className={cn('w-24 sm:w-40 lg:w-40 xl:w-52 2xl:w-60', favTeams.includes(game.awayTeamId)
            ? 'font-bold'
            : null)
            
          }
        >
          {game.awayTeam.casualName}
        </span>

        <span className="w-16 text-right tabular-nums">{game.result}</span>

        {game.halftimeResult && (
          <>
            <span className="w-10 text-right md:w-16 tabular-nums">
              ({game.halftimeResult})
            </span>
          </>
        )}

        <Button
          size={matches ? 'sm' : 'xs'}
          variant="ghost"
          className="group hover:bg-muted/90"
          onClick={() => game.gameId && onClickHandler(game.gameId)}
        >
          <span className="text-[10px] md:text-sm xl:text-base 2xl:text-lg group-hover:font-semibold">
            H2H
          </span>
        </Button>
      </div>
    </div>
  )
}

export default SubGamesListItem
