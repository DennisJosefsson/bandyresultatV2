import { z } from 'zod'

import {
  AllowNull,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import Municipality from './Municipality.js'
import Team from './Team.js'

export const county = z.object({
  countyId: z.number(),
  name: z.string(),
})

export type CountyType = z.infer<typeof county>

@Table({
  underscored: true,
  timestamps: false,
  modelName: 'county',
  freezeTableName: true,
})
class County extends Model<CountyType> {
  @PrimaryKey
  @Column
  declare countyId: number

  @AllowNull(false)
  @Column
  declare name: string

  @HasMany(() => Team, 'countyId')
  declare teams: Team[]

  @HasMany(() => Municipality, 'countyId')
  declare municipalities: Municipality[]
}

export default County
