import { z } from 'zod'

import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import County from './County.js'
import Game from './Game.js'
import Municipality from './Municipality.js'
import Season from './Season.js'
import TeamGame from './TeamGame.js'
import TeamSeason from './TeamSeason.js'
import TeamTable from './TeamTable.js'

export const teamAttributes = z.object({
  teamId: z.number().nullable(),
  name: z.string(),
  city: z.string(),
  casualName: z.string(),
  shortName: z.string(),
  women: z.boolean().optional(),
  lat: z.coerce.number().optional().nullable(),
  long: z.coerce.number().optional().nullable(),
  countyId: z.coerce.number(),
  municipalityId: z.coerce.number().transform((val) => {
    if (val === 0) return null
    return val
  }),
})

export const teamInput = teamAttributes.partial({ teamId: true })

export type TeamAttributes = z.infer<typeof teamAttributes>
export type TeamInput = z.infer<typeof teamInput>

export interface TeamOutput extends Required<TeamAttributes> {}

@Table({
  underscored: true,
  timestamps: false,
  modelName: 'team',
})
class Team extends Model<TeamAttributes, TeamInput> {
  @PrimaryKey
  @Column
  declare teamId: number

  @AllowNull(false)
  @Column
  declare name: string

  @AllowNull(false)
  @Column
  declare city: string

  @Column
  declare casualName: string

  @Column
  declare shortName: string

  @Default(false)
  @Column
  declare women: boolean

  @Column(DataType.FLOAT)
  declare lat?: number

  @Column(DataType.FLOAT)
  declare long?: number

  @ForeignKey(() => County)
  @Column
  declare countyId: number

  @ForeignKey(() => Municipality)
  @AllowNull(true)
  @Column
  declare municipalityId: number

  @BelongsToMany(() => Season, () => TeamSeason, 'teamId')
  declare seasonteam: Season[]

  @HasMany(() => Game, 'gameId')
  declare games: Game[]

  @HasMany(() => TeamGame, 'teamGameId')
  declare teamgames: TeamGame[]

  @HasMany(() => TeamTable, 'teamId')
  declare tables: TeamTable[]

  @BelongsTo(() => County, 'countyId')
  declare county: ReturnType<() => County>

  @BelongsTo(() => Municipality, 'municipalityId')
  declare municipality: ReturnType<() => Municipality>
}

export default Team
