import Date from '@/components/Components/Common/Date'
import { GameObjectType } from '@/lib/types/games/games'
import { SerieAttributes } from '@/lib/types/series/series'
import { SortedGamesType } from '@/lib/utils/sortFunction'
import { memo } from 'react'
import GamesListItem from './GamesListSubComponents/GamesListItem'

type GameListProps = {
  gamesArray: SortedGamesType
  title: string
  seriesInfo: SerieAttributes[]
}

const List = memo(function List({ games }: { games: GameObjectType[] }) {
  return (
    <div className="w-full">
      {games.map((game) => {
        return <GamesListItem key={game.gameId} game={game} />
      })}
    </div>
  )
})

const GamesList = ({ gamesArray, title, seriesInfo }: GameListProps) => {
  return (
    <div className="mb-6 w-full font-inter">
      <h1 className="text-xs font-semibold text-primary md:text-base">
        {title}
      </h1>
      <div>
        {gamesArray.map((group) => {
          const seriesObject = seriesInfo.find(
            (serie) => serie.serieGroupCode === group.group
          )
          return (
            <div key={group.group} className="mb-6">
              <h3 className="text-[10px] font-semibold text-primary md:text-xs">
                {gamesArray.length > 1 ? `${seriesObject?.serieName}` : ''}
              </h3>

              {seriesObject && seriesObject.comment && (
                <p className="my-2 max-w-xl bg-background p-1 text-[10px] md:text-xs font-bold">
                  {seriesObject.comment}
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
                      <List games={date.games} />
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
