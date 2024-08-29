import { Dialog } from '@/components/ui/dialog'
import { GameObjectType } from '@/lib/types/games/games'
import { groupConstant } from '@/lib/utils/constants'
import PlayoffCard from './PlayoffCard'

type ColstartsType = {
  [key: string]: string
}

type GroupType = {
  group: string
  dates: {
    date: string
    games: GameObjectType[]
  }[]
}

type ResultType = {
  group: string
  result: string
}

type DefaultComponentProps = {
  group: GroupType
  colStarts: ColstartsType
  favTeams: number[]
  results: ResultType[]
}

const DefaultComponent = ({
  group,
  colStarts,
  results,
}: DefaultComponentProps) => {
  const styleClass = colStarts
    ? `${colStarts[group.group]} cursor-pointer`
    : 'cursor-pointer lg:col-start-4 lg:odd:col-start-2'

  const result =
    results.find((table) => table.group === group.group)?.result ?? ''
  const playoffGames = group.dates.map((date) => date.games[0])

  return (
    <PlayoffCard
      styleClass={styleClass}
      playoffGames={playoffGames}
      group={group.group}
    >
      <PlayoffCard.Title>
        <PlayoffCard.Group>{groupConstant[group.group]}</PlayoffCard.Group>
        <PlayoffCard.Result>{result}</PlayoffCard.Result>
      </PlayoffCard.Title>
      <PlayoffCard.Content>
        <Dialog>
          <div>
            {group.dates[0].games.map((game) => {
              return (
                <div key={`${game.date}-${Math.random()}`}>
                  <PlayoffCard.Team teamId={game.homeTeamId}>
                    {game.homeTeam.casualName}
                  </PlayoffCard.Team>
                  <span> - </span>
                  <PlayoffCard.Team teamId={game.awayTeamId}>
                    {game.awayTeam.casualName}
                  </PlayoffCard.Team>
                </div>
              )
            })}
          </div>
        </Dialog>
      </PlayoffCard.Content>
    </PlayoffCard>
  )
}

export default DefaultComponent
