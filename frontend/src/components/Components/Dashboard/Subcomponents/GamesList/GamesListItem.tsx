import { GameObjectType } from '@/lib/types/games/games'
import EditGameButton from './EditGameButton'

type GamesListItemProps = {
  game: GameObjectType
  changeButtonOnClick: (gameId: number) => void
  deleteButtonOnClick: (gameId: number) => void
}

const GamesListItem = ({
  game,
  changeButtonOnClick,
  deleteButtonOnClick,
}: GamesListItemProps) => {
  return (
    <div className="flex w-full flex-row items-center gap-1">
      <div
        id={game.gameId?.toString()}
        className="py-0.5 mb-1 flex w-full flex-row items-center justify-between gap-1 bg-muted px-1 md:px-2 text-[8px] transition-colors hover:bg-slate-100/50 dark:bg-muted/50  dark:hover:bg-slate-800/50 md:text-sm xl:mb-2 xl:w-[36rem] "
      >
        <span className="w-24 sm:w-40 lg:w-40 xl:w-52">
          {game.homeTeam.casualName}
        </span>
        <span className="w-1 text-center xl:w-4"> - </span>
        <span className="w-24 sm:w-40 lg:w-40 xl:w-52">
          {game.awayTeam.casualName}
        </span>

        <span className="w-16 text-right tabular-nums">{game.result}</span>
        <EditGameButton
          game={game}
          changeButtonOnClick={changeButtonOnClick}
          deleteButtonOnClick={deleteButtonOnClick}
        />
      </div>
    </div>
  )
}

export default GamesListItem
