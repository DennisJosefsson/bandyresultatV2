import { z } from 'zod'

import {
  Column,
  Default,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript'
import Season from './Season.js'
import Team from './Team.js'
import TeamTable from './TeamTable.js'

export const teamSeasonAttributes = z.object({
  teamseasonId: z.number().optional(),
  seasonId: z.number(),
  teamId: z.number(),
  tableId: z.number().nullable().optional(),
  women: z.boolean(),
  qualification: z.boolean(),
  negQualification: z.boolean().nullable().optional(),
  promoted: z.boolean().nullable().optional(),
  relegated: z.boolean().nullable().optional(),
  position: z.coerce.number().nullable().optional(),
  points: z.coerce.number().nullable().optional(),
  playoff: z.boolean().nullable().optional(),
  eight: z.boolean().nullable().optional(),
  quarter: z.boolean().nullable().optional(),
  semi: z.boolean().nullable().optional(),
  final: z.boolean().nullable().optional(),
  gold: z.boolean().nullable().optional(),
})

const teamSeasonInput = teamSeasonAttributes.omit({ teamseasonId: true })

export type TeamSeasonAttributes = z.infer<typeof teamSeasonAttributes>
export type TeamSeasonInput = z.infer<typeof teamSeasonInput>

export interface TeamSeasonOutput extends Required<TeamSeasonAttributes> {}

@Table({
  underscored: true,
  timestamps: false,
  modelName: 'teamseason',
})
class TeamSeason extends Model<TeamSeasonAttributes, TeamSeasonInput> {
  @PrimaryKey
  @Unique
  @Column
  declare teamseasonId?: number

  @ForeignKey(() => Season)
  @Column
  declare seasonId: number

  @ForeignKey(() => Team)
  @Column
  declare teamId: number

  @ForeignKey(() => TeamTable)
  @Column
  declare tableId?: number

  @Default(false)
  @Column
  declare women: boolean

  @Default(false)
  @Column
  declare qualification?: boolean

  @Default(false)
  @Column
  declare negQualification?: boolean

  @Default(false)
  @Column
  declare relegated?: boolean

  @Default(false)
  @Column
  declare promoted?: boolean

  @Default(false)
  @Column
  declare playoff?: boolean

  @Default(false)
  @Column
  declare eight?: boolean

  @Default(false)
  @Column
  declare quarter?: boolean

  @Default(false)
  @Column
  declare semi?: boolean

  @Default(false)
  @Column
  declare final?: boolean

  @Default(false)
  @Column
  declare gold?: boolean

  @Column
  declare position?: number

  @Column
  declare points?: number

  @HasOne(() => Team, { sourceKey: 'teamId', foreignKey: 'teamId' })
  declare team: ReturnType<() => Team>

  @HasOne(() => Season, { sourceKey: 'seasonId', foreignKey: 'seasonId' })
  declare season: ReturnType<() => Season>
}

export default TeamSeason
