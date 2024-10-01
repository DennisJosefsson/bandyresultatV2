import Date from '@/components/Components/Common/Date'
import { gameObject } from '@/lib/types/games/gameObject'
import { z } from 'zod'
import PlayoffCard from './PlayoffCard'
type FinalCardProps = {
  game: z.infer<typeof gameObject>
}

const FinalCard = ({ game }: FinalCardProps) => {
  return (
    <div className="grid w-auto min-w-[33%] grid-cols-1 justify-center lg:mx-auto">
      <PlayoffCard group="final">
        <PlayoffCard.Title>
          <PlayoffCard.Group>Final</PlayoffCard.Group>
          <PlayoffCard.Result>
            <Date>{game.date}</Date>
          </PlayoffCard.Result>
        </PlayoffCard.Title>
        <PlayoffCard.Content>
          <div className="flex flex-row justify-between text-xs md:text-sm lg:text-base">
            <div>
              <PlayoffCard.Team teamId={game.homeTeam.teamId}>
                {game.homeTeam.name}
              </PlayoffCard.Team>
              <span> - </span>
              <PlayoffCard.Team teamId={game.awayTeamId}>
                {game.awayTeam.name}
              </PlayoffCard.Team>
            </div>
            <div>
              <PlayoffCard.Result>{game.result}</PlayoffCard.Result>
            </div>
          </div>
        </PlayoffCard.Content>
      </PlayoffCard>
    </div>
  )
}

export default FinalCard
