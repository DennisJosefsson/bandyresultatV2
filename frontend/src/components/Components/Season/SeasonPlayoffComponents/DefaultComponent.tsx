import { Dialog } from '@/components/ui/dialog'
import { PlayoffGroup } from '@/lib/types/tables/tables'
import { groupConstant } from '@/lib/utils/constants'
import PlayoffCard from './PlayoffCard'

type ColstartsType = {
  [key: string]: string
}

type DefaultComponentProps = {
  group: PlayoffGroup
  colStarts: ColstartsType
}

const DefaultComponent = ({ group, colStarts }: DefaultComponentProps) => {
  const styleClass = colStarts
    ? `${colStarts[group.group]} cursor-pointer`
    : 'cursor-pointer lg:col-start-4 lg:odd:col-start-2'

  return (
    <PlayoffCard
      styleClass={styleClass}
      playoffGames={group.games}
      group={group.group}
    >
      <PlayoffCard.Title>
        <PlayoffCard.Group>{groupConstant[group.group]}</PlayoffCard.Group>
        <PlayoffCard.Result>{group.result.result}</PlayoffCard.Result>
      </PlayoffCard.Title>
      <PlayoffCard.Content>
        <Dialog>
          <PlayoffCard.Team teamId={group.result.homeTeam.teamId}>
            {group.result.homeTeam.casualName}
          </PlayoffCard.Team>
          <span> - </span>
          <PlayoffCard.Team teamId={group.result.awayTeam.teamId}>
            {group.result.awayTeam.casualName}
          </PlayoffCard.Team>
        </Dialog>
      </PlayoffCard.Content>
    </PlayoffCard>
  )
}

export default DefaultComponent
