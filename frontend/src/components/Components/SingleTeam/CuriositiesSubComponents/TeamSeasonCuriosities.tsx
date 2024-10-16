import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { singleTeam } from '@/lib/types/teams/singleTeam'
import { z } from 'zod'

const TeamSeasonCuriosities = ({
  team,
}: {
  team: z.infer<typeof singleTeam>
}) => {
  const playoffStreak = team.playoffStreak

  return (
    <Card className="mb-2 p-1">
      <CardHeader className="p-1 md:p-6">
        <CardTitle className="text-[10px] md:text-sm">Kuriosa</CardTitle>
      </CardHeader>
      <CardContent className="text-[10px] xxs:text-xs p-1 md:p-6 lg:mr-0 lg:text-sm">
        {/* <div className="mb-1"><span className="whitespace-pre-line">{team.seasonString}</span></div> */}
        <div className="mb-1">{team.seasonString}</div>

        <div className="mb-1">{team.finalsAndWinsString}</div>

        <div className="mb-1">{team.playoffCountString}</div>

        {playoffStreak.length > 0 && (
          <div className="mb-1">
            {playoffStreak.map((streak, index) => {
              return (
                <div key={`${streak.start_year}-${index}`}>
                  {team.team.casualName} spelade slutspel {streak.streak_length}{' '}
                  år på raken mellan {streak.start_year} och {streak.end_year}.
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TeamSeasonCuriosities
