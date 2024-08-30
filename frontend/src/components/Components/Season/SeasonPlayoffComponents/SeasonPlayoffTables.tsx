import { SingleSeasonPlayoffType } from '@/lib/types/tables/tables'
import {
  eightColStarts,
  eightColStartsFourTeams,
  quarterColStarts,
  quarterColStartsTwoQuarter,
  semiColStarts,
} from '@/lib/utils/constants'
import { useParams, useSearch } from '@tanstack/react-router'
import DefaultComponent from './DefaultComponent'
import FinalCard from './FinalCard'
import NilComponent from './NilComponent'
import NilFinalComponent from './NilFinalComponent'

type SeasonPlayoffTablesProps = {
  data: SingleSeasonPlayoffType
  lastSeason: string
}

const SeasonPlayoffTables = ({
  data,
  lastSeason,
}: SeasonPlayoffTablesProps) => {
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  const seasonId = useParams({
    from: '/_layout/season/$seasonId/playoff',
    select: (param) => param.seasonId,
  })

  const semiResults = data['results']['semiResults']
  const quarterResults = data['results']['quarterResults']
  const eightResults = data['results']['eightResults']

  const nilSemiGroups = ['S1', 'S2']
  const nilQuarterGroups = ['Q1', 'Q2', 'Q3', 'Q4']
  const nilEightGroups = ['E1', 'E2']

  return (
    <div className="m-0 mt-4 lg:justify-self-center">
      <div className="grid gap-2">
        {data['final'].length === 0 && <NilFinalComponent />}
        {data['final'].length > 0 && (
          <>
            {data['final'].map((game) => {
              return <FinalCard key={game.gameId} game={game} />
            })}
          </>
        )}

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-5">
          {semiResults.length === 0 && seasonId === lastSeason && (
            <>
              {nilSemiGroups.map((group, index) => {
                return (
                  <NilComponent
                    key={`{Math.random()}-${group}-${index}`}
                    group={group}
                    colStarts={semiColStarts}
                  />
                )
              })}
            </>
          )}
          {semiResults.length > 0 && (
            <>
              {semiResults.map((group, index) => {
                return (
                  <DefaultComponent
                    key={`${group.group}-${index}`}
                    group={group}
                    colStarts={semiColStarts}
                  />
                )
              })}
            </>
          )}
        </div>
        {quarterResults.length === 0 && seasonId === lastSeason && (
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
            {nilQuarterGroups.map((group, index) => {
              return (
                <NilComponent
                  key={`{Math.random()}-${group}-${index}`}
                  group={group}
                  colStarts={quarterColStarts}
                />
              )
            })}
          </div>
        )}
        {quarterResults.length !== 2 && quarterResults.length !== 0 && (
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
            {quarterResults.map((group, index) => {
              return (
                <DefaultComponent
                  key={`${group.group}-${index}`}
                  group={group}
                  colStarts={quarterColStarts}
                />
              )
            })}
          </div>
        )}

        {quarterResults.length === 2 && (
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-5">
            {quarterResults.map((group, index) => {
              return (
                <DefaultComponent
                  key={`${group.group}-${index}`}
                  group={group}
                  colStarts={quarterColStartsTwoQuarter}
                />
              )
            })}
          </div>
        )}
        {eightResults.length === 0 &&
          seasonId === lastSeason &&
          women === false && (
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-5">
              {nilEightGroups.map((group, index) => {
                return (
                  <NilComponent
                    key={`{Math.random()}-${group}-${index}`}
                    group={group}
                    colStarts={eightColStarts}
                  />
                )
              })}
            </div>
          )}
        {eightResults.length === 2 && (
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-5">
            {eightResults.map((group, index) => {
              return (
                <DefaultComponent
                  key={`${group.group}-${index}`}
                  group={group}
                  colStarts={eightColStarts}
                />
              )
            })}
          </div>
        )}
        {eightResults.length === 4 && (
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
            {eightResults.map((group, index) => {
              return (
                <DefaultComponent
                  key={`${group.group}-${index}`}
                  group={group}
                  colStarts={eightColStartsFourTeams}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default SeasonPlayoffTables
