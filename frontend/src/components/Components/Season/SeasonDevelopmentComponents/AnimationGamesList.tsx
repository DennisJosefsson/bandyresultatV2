import Date from '@/components/Components/Common/Date'
import useTeampreferenceContext from '@/lib/hooks/contextHooks/useTeampreferenceContext'
import { gameObjectWithSeason } from '@/lib/types/games/gameObject'
import { z } from 'zod'

type DateArrayItem = {
  date: string
  games: z.infer<typeof gameObjectWithSeason>[]
}

type AnimationGamesListProps = {
  dateArray: DateArrayItem[]
  round: number
}

const AnimationGamesList = ({ dateArray, round }: AnimationGamesListProps) => {
  const { favTeams } = useTeampreferenceContext()

  return (
    <div className="mt-2">
      <div className="text-[10px] sm:text-sm lg:text-base">
        <Date>{dateArray[round]?.date}</Date>
      </div>
      {dateArray[round]?.games.map((game) => {
        return (
          <div
            key={game.gameId}
            className="flex flex-row justify-between border-b px-2 py-1 transition-colors hover:bg-muted/50 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800 text-[10px] lg:text-sm xl:py-2 "
          >
            <div>
              <span
                className={
                  favTeams.includes(game.homeTeamId) ? 'font-bold ' : ''
                }
              >
                {game.homeTeam.casualName}
              </span>
              <span className="w-1 xl:w-4"> - </span>
              <span
                className={
                  favTeams.includes(game.awayTeamId) ? 'font-bold' : ''
                }
              >
                {game.awayTeam.casualName}
              </span>
            </div>
            <div>
              <span className="w-4 pr-2 text-right tabular-nums">
                {game.homeGoal}
              </span>
              <span className="w-4 text-center">-</span>
              <span className="w-4 pl-2 text-justify tabular-nums">
                {game.awayGoal}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AnimationGamesList
