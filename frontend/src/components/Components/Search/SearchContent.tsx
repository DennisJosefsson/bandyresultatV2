import useTeampreferenceContext from '@/lib/hooks/contextHooks/useTeampreferenceContext'
//import ResultComponent from './ResultComponent'
import { SearchGame } from '@/lib/hooks/dataHooks/search/useSearchForm'
import Date from '../Common/Date'

const SearchContent = ({ gameArray }: { gameArray: SearchGame[] }) => {
  const { favTeams } = useTeampreferenceContext()

  console.log('gameArray from SearchContent', gameArray)

  return (
    <div className="mx-1 mt-2 xl:mx-0">
      <div className="ml-2 w-[18rem] max-w-[800px] lg:ml-0 lg:w-full">
        {/* {searchResult && searchResult.searchResult.length === 0 && (
          <div className="rounded bg-background p-2">
            <p className="">Din sökning gav inga träffar.</p>
          </div>
        )} */}
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
    </div>
  )
}

export default SearchContent
