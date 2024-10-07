import { z } from 'zod'

import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import Game from './Game.js'
import Season from './Season.js'
import Team from './Team.js'
import TeamGame from './TeamGame.js'
import TeamSerie from './TeamSerie.js'
import TeamTable from './TeamTable.js'

export const serieAttributes = z.object({
  serieId: z.number().optional().nullable(),
  serieGroupCode: z.string(),
  serieCategory: z.string(),
  serieName: z.string(),
  serieStructure: z.array(z.number()).nullable().optional(),
  seasonId: z.number(),
  bonusPoints: z.string().nullable().optional(),
  comment: z.string().nullable().optional(),
  level: z.number(),
})

export const serieInput = serieAttributes.partial({ serieId: true })

export type SerieAttributes = z.infer<typeof serieAttributes>
export type SerieInput = z.infer<typeof serieInput>

export interface SerieOutput extends Required<SerieAttributes> {}

@Table({
  underscored: true,
  timestamps: false,
  modelName: 'serie',
})
class Serie extends Model<SerieAttributes, SerieInput> {
  @PrimaryKey
  @Column
  declare serieId?: number

  @AllowNull(false)
  @Column
  declare serieGroupCode: string

  @AllowNull(false)
  @Column
  declare serieCategory: string

  @Column
  declare serieName: string

  @Column(DataType.ARRAY(DataType.INTEGER))
  declare serieStructure: number[]

  @ForeignKey(() => Season)
  @Column
  declare seasonId: number

  @Column
  declare bonusPoints: string

  @Column
  declare comment: string

  @Column
  declare level: number

  @BelongsTo(() => Season, 'seasonId')
  declare season: ReturnType<() => Season>

  @HasMany(() => Game, 'serieId')
  declare games: Game[]

  @HasMany(() => TeamGame, 'serieId')
  declare teamgames: TeamGame[]

  @HasMany(() => TeamTable, 'serieId')
  declare tables: TeamTable[]

  @BelongsToMany(() => Team, () => TeamSerie, 'serieId')
  declare teams: Team[]
}

export default Serie
