import { z } from 'zod'

import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import Season from './Season.js'
import TableSeason from './TableSeason.js'
import Team from './Team.js'

export const teamTableAttributes = z.object({
  tableId: z.number().optional(),
  teamId: z.number(),
  seasonId: z.number(),
  position: z.number(),
  totalGames: z.number(),
  totalWins: z.number(),
  totalDraws: z.number(),
  totalLost: z.number(),
  totalGoalsScored: z.number(),
  totalGoalsConceded: z.number(),
  totalGoalDifference: z.number(),
  totalPoints: z.number(),
  qualification: z.boolean(),
  group: z.string(),
  women: z.boolean(),
})

export const teamTableInput = teamTableAttributes.partial({ tableId: true })

export type TeamTableAttributes = z.infer<typeof teamTableAttributes>
export type TeamTableInput = z.infer<typeof teamTableInput>

export interface TeamTableOutput extends Required<TeamTableAttributes> {}

@Table({
  underscored: true,
  timestamps: false,
  modelName: 'table',
})
class TeamTable extends Model<TeamTableAttributes, TeamTableInput> {
  @PrimaryKey
  @Column
  declare tableId?: number

  @AllowNull(false)
  @ForeignKey(() => Team)
  @Column
  declare teamId: number

  @AllowNull(false)
  @ForeignKey(() => Season)
  @Column
  declare seasonId: number

  @AllowNull(false)
  @Column
  declare position: number

  @AllowNull(false)
  @Column({ field: 'games' })
  declare totalGames: number

  @AllowNull(false)
  @Column({ field: 'won' })
  declare totalWins: number

  @AllowNull(false)
  @Column({ field: 'draw' })
  declare totalDraws: number

  @AllowNull(false)
  @Column({ field: 'lost' })
  declare totalLost: number

  @AllowNull(false)
  @Column({ field: 'scored_goals' })
  declare totalGoalsScored: number

  @AllowNull(false)
  @Column({ field: 'conceded_goals' })
  declare totalGoalsConceded: number

  @AllowNull(false)
  @Column({ field: 'goal_difference' })
  declare totalGoalDifference: number

  @AllowNull(false)
  @Column({ field: 'points' })
  declare totalPoints: number

  @Default(false)
  @Column
  declare qualification: boolean

  @Default(false)
  @Column
  declare women: boolean

  @Column
  declare group: string

  @BelongsTo(() => Team, 'teamId')
  declare team: ReturnType<() => Team>

  @BelongsToMany(() => Season, () => TableSeason, 'tableId')
  declare seasontable: ReturnType<() => Season>
}

export default TeamTable
