import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { SerieAttributes } from '@/lib/types/series/series'
import { TeamAndSeasonAttributes } from '@/lib/types/teams/teams'
import { sortOrder } from '@/lib/utils/constants'
import { useState } from 'react'
import BulkGameForm from './BulkGameForm'
import FileInput from './FileInput'

type Games = {
  date: string
  homeTeam: string
  homeTeamId: string
  awayTeam: string
  awayTeamId: string
  seasonId: number
  category: string
  group: string
  women: boolean
  serieId: number | undefined | null
}

const categoryArray = [
  { value: 'final', label: 'Final' },
  { value: 'semi', label: 'Semi' },
  { value: 'quarter', label: 'Kvart' },
  { value: 'eight', label: 'Åttondel' },
  { value: 'regular', label: 'Grundserie' },
  { value: 'qualification', label: 'Kval' },
]

type BulkAddGameProps = {
  teams: TeamAndSeasonAttributes[] | undefined
  seasonId: number
  series: SerieAttributes[] | undefined
  women: boolean
}

type GameArrayType = {
  date: string
  home: string
  away: string
}

const BulkAddGame = ({ teams, seasonId, series, women }: BulkAddGameProps) => {
  const [gamesList, setGamesList] = useState<GameArrayType[]>([])

  const [category, setCategory] = useState<string>('regular')
  const [group, setGroup] = useState<string>('elitserien')

  const groupArray = series
    ?.map((serie) => {
      return { value: serie.serieGroupCode, label: serie.serieName }
    })
    .sort((a, b) => {
      if (sortOrder.indexOf(a.value) > sortOrder.indexOf(b.value)) {
        return 1
      } else if (sortOrder.indexOf(a.value) < sortOrder.indexOf(b.value)) {
        return -1
      } else {
        return 0
      }
    })

  const games: Games[] =
    gamesList.length > 0
      ? gamesList.map((game) => {
          return {
            date: game.date,
            homeTeamId: game.home,
            homeTeam:
              teams?.find((team) => team.teamId.toString() === game.home)
                ?.casualName ?? 'Lag saknas',
            awayTeamId: game.away,
            awayTeam:
              teams?.find((team) => team.teamId.toString() === game.away)
                ?.casualName ?? 'Lag saknas',
            seasonId,
            group,
            category,
            women,
            serieId:
              series?.find((serie) => serie.serieGroupCode === group)
                ?.serieId ?? undefined,
          }
        })
      : []

  return (
    <div>
      <form className="mb-4">
        <RadioGroup
          value={category}
          onValueChange={setCategory}
          className="mb-4 flex flex-row gap-4"
        >
          {categoryArray.map((cat) => {
            return (
              <div key={cat.value} className="flex items-center space-x-2">
                <Label htmlFor={cat.value}>{cat.label}</Label>
                <RadioGroupItem value={cat.value} id={cat.value} />
              </div>
            )
          })}
        </RadioGroup>
        <RadioGroup
          value={group}
          onValueChange={setGroup}
          className="mb-4 flex flex-row flex-wrap gap-4"
        >
          {groupArray?.map((group) => {
            return (
              <div key={group.value} className="flex items-center space-x-2">
                <Label htmlFor={group.value}>{group.label}</Label>
                <RadioGroupItem value={group.value} id={group.value} />
              </div>
            )
          })}
        </RadioGroup>
        <FileInput setGamesList={setGamesList} />
      </form>

      {games.length > 0 ? <BulkGameForm gameArray={games} /> : null}
    </div>
  )
}

export default BulkAddGame
