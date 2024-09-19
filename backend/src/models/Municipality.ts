import { z } from 'zod'

import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import County from './County.js'

export const municipality = z.object({
  municipalityId: z.number(),
  name: z.string(),
  countyId: z.number(),
})

export type MunicipalityType = z.infer<typeof municipality>

@Table({
  underscored: true,
  timestamps: false,
  modelName: 'municipality',
  freezeTableName: true,
})
class Municipality extends Model<MunicipalityType> {
  @PrimaryKey
  @Column
  declare municipalityId: number

  @AllowNull(false)
  @Column
  declare name: string

  @ForeignKey(() => County)
  @Column
  declare countyId: number

  @BelongsTo(() => County, 'countyId')
  declare county: ReturnType<() => County>
}

export default Municipality
