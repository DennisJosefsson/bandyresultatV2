import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import useTeampreferenceContext from '@/lib/hooks/contextHooks/useTeampreferenceContext'
import { ReactNode, useState } from 'react'
import { GameObjectType } from '@/lib/types/games/games'

import Date from '@/components/Components/Common/Date'

const PlayoffCard = ({
  styleClass = '',
  children,
  playoffGames,
  group,
}: {
  styleClass?: string
  children: ReactNode
  playoffGames?: GameObjectType[]
  group: string
}) => {
  const [open, setOpen] = useState(false)

  if (group === 'final') {
    return <Card>{children}</Card>
  }

  return (
    <Card className={styleClass}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div>{children}</div>
        </DialogTrigger>
        <DialogContent>
          {playoffGames && (
            <div>
              {playoffGames.map((game, index) => (
                <div key={`${game.date}-${index}`} className="flex flex-col">
                  <div>
                    <Date className="font-bold">{game.date}</Date>
                  </div>
                  <div>
                    <span> {game.homeTeam.casualName}</span>-
                    <span>{game.awayTeam.casualName}</span>{' '}
                    <span>{game.result}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Button onClick={() => setOpen(false)}>Stäng</Button>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

function Title({ children }: { children: ReactNode }) {
  return (
    <CardHeader>
      <CardTitle>
        <div className="flex flex-row justify-between text-[10px] sm:text-xs lg:text-sm xl:text-base">
          {children}
        </div>
      </CardTitle>
    </CardHeader>
  )
}

function Group({ children }: { children: ReactNode }) {
  return <span>{children}</span>
}

function Result({ children }: { children: ReactNode }) {
  return <span>{children}</span>
}

function Content({ children }: { children: ReactNode }) {
  return (
    <CardContent className="text-[10px] sm:text-xs lg:text-sm">
      {children}
    </CardContent>
  )
}

function Team({ teamId, children }: { teamId: number; children: ReactNode }) {
  const { favTeams } = useTeampreferenceContext()
  return (
    <span className={favTeams.includes(teamId) ? 'font-bold' : undefined}>
      {children}
    </span>
  )
}

PlayoffCard.Title = Title
PlayoffCard.Group = Group
PlayoffCard.Result = Result
PlayoffCard.Content = Content
PlayoffCard.Team = Team

export default PlayoffCard
