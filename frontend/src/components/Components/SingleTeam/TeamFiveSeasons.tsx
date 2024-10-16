import { fiveSeason } from '@/lib/types/teams/singleTeam'
import { z } from 'zod'

import FiveSeasonTeamTable from './FiveSeasonTeamTable'

type FiveSeason = z.infer<typeof fiveSeason>

type TeamFiveSeasonsTablesProps = { tableArray: FiveSeason[] }

const TeamFiveSeasonsTables = ({ tableArray }: TeamFiveSeasonsTablesProps) => {
  return (
    <div className="mb-6">
      {tableArray.map((season) => {
        return (
          <div key={season.season}>
            <FiveSeasonTeamTable
              tables={season.tables}
              season={season.season}
            />
          </div>
        )
      })}
    </div>
  )
}

export default TeamFiveSeasonsTables
