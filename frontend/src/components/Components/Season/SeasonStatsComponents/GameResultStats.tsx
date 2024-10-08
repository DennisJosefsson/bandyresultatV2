import GameCountStats from './GameCountStats'
import ResultCatCountStats from './ResultCatCountStats'
import ResultCountStats from './ResultCountStats'

const GameResultStats = () => {
  return (
    <div>
      <h4 className="text-xs font-bold md:text-sm ml-0 xl:text-base">
        Match- och resultatstatistik
      </h4>
      <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 xl:gap-x-44">
        <GameCountStats />
        <ResultCountStats />
      </div>
      <ResultCatCountStats />
    </div>
  )
}

export default GameResultStats
