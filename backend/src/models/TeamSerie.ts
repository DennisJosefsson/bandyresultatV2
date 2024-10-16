import {
  Column,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript'
import { z } from 'zod'
import Serie from './Serie.js'
import Team from './Team.js'

export const teamSerie = z.object({
  teamseriesId: z.number(),
  teamId: z.number(),
  serieId: z.number(),
})

export const teamSerieInput = teamSerie.omit({ teamseriesId: true })

export type TeamSeries = z.infer<typeof teamSerie>
export type TeamSeriesInput = z.infer<typeof teamSerieInput>

export interface TeamSeriesOutput extends Required<TeamSeries> {}

@Table({
  underscored: true,
  timestamps: false,
  modelName: 'teamseries',
})
class TeamSerie extends Model<TeamSeries, TeamSeriesInput> {
  @PrimaryKey
  @Unique
  @Column
  declare teamseriesId?: number

  @ForeignKey(() => Team)
  @Column
  declare teamId: number

  @ForeignKey(() => Serie)
  @Column
  declare serieId: number

  @HasOne(() => Team, { sourceKey: 'teamId', foreignKey: 'teamId' })
  declare team: ReturnType<() => Team>

  @HasOne(() => Serie, { sourceKey: 'serieId', foreignKey: 'serieId' })
  declare serie: ReturnType<() => Serie>
}

export default TeamSerie
