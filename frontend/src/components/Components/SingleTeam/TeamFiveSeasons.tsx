import { fiveSeason } from '@/lib/types/teams/singleTeam'
import { z } from 'zod'
import TeamTable from './TeamTable'

type FiveSeason = z.infer<typeof fiveSeason>

type TeamFiveSeasonsTablesProps = { tableArray: FiveSeason[] }

const TeamFiveSeasonsTables = ({ tableArray }: TeamFiveSeasonsTablesProps) => {
  const sortedSeasons = (a: FiveSeason, b: FiveSeason) => {
    if (a.season < b.season) {
      return 1
    } else if (a.season > b.season) {
      return -1
    } else return 0
  }

  return (
    <div className="mb-6">
      {tableArray.sort(sortedSeasons).map((season) => {
        return (
          <div key={season.season}>
            <TeamTable tables={season.tables} season={season.season} />
          </div>
        )
      })}
    </div>
  )
}

export default TeamFiveSeasonsTables
