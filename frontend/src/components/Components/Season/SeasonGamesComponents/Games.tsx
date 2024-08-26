import { SortedGamesType } from '@/lib/types/games/games'
import GamesList from './GamesList'

type GameListObject = {
  [key: string]: SortedGamesType
}

type GamesProps = {
  games: GameListObject
  title: string
}

const Games = ({ games, title }: GamesProps) => {
  return (
    <div>
      <h1 className="text-sm font-bold md:text-base">{title}</h1>
      <div className="w-full xl:px-2">
        <GamesList gamesArray={games['FinalGames']} title={'Final'} />

        <GamesList gamesArray={games['SemiGames']} title={'Semifinaler'} />

        <GamesList gamesArray={games['QuarterGames']} title={'Kvartsfinaler'} />

        <GamesList
          gamesArray={games['EightGames']}
          title={'Åttondelsfinaler'}
        />

        <GamesList
          gamesArray={games['RegularGames']}
          title={'Grundseriematcher'}
        />
        <GamesList
          gamesArray={games['QualificationGames']}
          title={'Kvalmatcher'}
        />
      </div>
    </div>
  )
}

export default Games
