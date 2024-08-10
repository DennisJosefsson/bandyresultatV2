import Date from '@/components/Components/Common/Date'
import useTeampreferenceContext from '@/lib/hooks/contextHooks/useTeampreferenceContext'
import { SearchGame } from '@/lib/hooks/dataHooks/search/useSearchForm'

type ResultComponentProps = { gameArray: SearchGame[] | undefined }

const ResultComponent = ({ gameArray }: ResultComponentProps) => {
  const { favTeams } = useTeampreferenceContext()

  return (
    <div>
      SökResultat
      {gameArray?.map((game, index) => {
        return (
          <div className="recordCard" key={`${game.date}-${index}`}>
            <div className="pos">{index + 1}</div>
            <div className="flex flex-col">
              <div className="record1st">
                <div className="name">
                  {game.homeTeam.casualName}-{game.awayTeam.casualName}
                </div>
                <div
                  className={
                    favTeams.includes(game.homeTeamId) ||
                    favTeams.includes(game.awayTeamId)
                      ? 'count font-bold'
                      : 'count'
                  }
                >
                  {game.result}
                </div>
              </div>
              <div className="record2nd">
                <div className="dates">
                  <Date>{game.date}</Date>
                  {game.qualification && <span className="ml-1">(K)</span>}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ResultComponent
