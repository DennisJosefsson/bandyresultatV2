import Date from '@/components/Components/Common/Date'
import { Card } from '@/components/ui/card'
import useTeampreferenceContext from '@/lib/hooks/contextHooks/useTeampreferenceContext'
import { SearchGame } from '@/lib/hooks/dataHooks/search/useSearchForm'

type ResultComponentProps = { gameArray: SearchGame[] | undefined }

const ResultComponent = ({ gameArray }: ResultComponentProps) => {
  const { favTeams } = useTeampreferenceContext()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-2 m-2">
      {gameArray?.map((game, index) => {
        return (
          <Card
            className="mb-1 p-1 flex flex-row items-center text-[10px] md:text-sm xl:text-base 2xl:text-lg md:mb-2 md:p-2"
            key={`${game.date}-${index}`}
          >
            <span className="mr-4 w-8 text-right text-base md:text-2xl font-bold tabular-nums">
              {index + 1}
            </span>
            <div className="flex flex-col gap-1">
              <div className="flex flex-row justify-between gap-2 w-full">
                <span className="w-32 md:w-48">
                  <span
                    className={
                      favTeams.includes(game.homeTeamId) ? 'font-bold' : ''
                    }
                  >
                    {game.homeTeam.casualName}
                  </span>
                  -
                  <span
                    className={
                      favTeams.includes(game.awayTeamId) ? 'font-bold' : ''
                    }
                  >
                    {game.awayTeam.casualName}
                  </span>
                </span>
                <span
                  className={
                    favTeams.includes(game.homeTeamId) ||
                    favTeams.includes(game.awayTeamId)
                      ? 'text-right font-bold'
                      : 'text-right'
                  }
                >
                  {game.result}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1 text-[10px] md:text-xs xl:text-sm">
                <span>
                  <Date>{game.date}</Date>
                </span>
                {game.qualification && <span className="ml-1">(K)</span>}
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export default ResultComponent
