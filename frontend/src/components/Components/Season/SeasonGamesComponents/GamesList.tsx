import Date from '@/components/Components/Common/Date'
import { SortedGamesType } from '@/lib/types/games/games'
import GamesListItem from './GamesListSubComponents/GamesListItem'

type GameListProps = {
  gamesArray: SortedGamesType
  title: string
}

const GamesList = ({ gamesArray, title }: GameListProps) => {
  if (gamesArray.length === 0) return null
  return (
    <div className="mb-6 w-full font-inter">
      <h1 className="text-xs font-semibold text-primary md:text-base">
        {title}
      </h1>
      <div>
        {gamesArray.map((group) => {
          return (
            <div key={group.group} className="mb-6">
              <h3 className="text-[10px] font-semibold text-primary md:text-xs">
                {group.name}
              </h3>

              {group.comment && (
                <p className="my-2 max-w-xl bg-background p-1 text-[10px] md:text-xs font-bold">
                  {group.comment}
                </p>
              )}
              <div>
                {group.dates.map((date) => {
                  return (
                    <div key={date.date}>
                      {date.date !== 'null' && (
                        <h3 className="text-[0.75rem] md:text-sm">
                          <Date>{date.date}</Date>
                        </h3>
                      )}
                      {date.games.map((game) => {
                        return <GamesListItem key={game.gameId} game={game} />
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GamesList
