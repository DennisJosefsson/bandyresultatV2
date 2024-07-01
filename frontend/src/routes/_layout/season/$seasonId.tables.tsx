import Loading from '@/components/Components/Common/Loading'
import { NoWomenSeason } from '@/components/Components/Common/NoWomenSeason'
import SeasonTablesButtonList from '@/components/Components/Season/SeasonTableComponents/SeasonTablesButtonList'
import StaticTables from '@/components/Components/Season/SeasonTableComponents/StaticTables'
import TableList from '@/components/Components/Season/SeasonTableComponents/TableList'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { useGetFirstAndLastSeason } from '@/lib/hooks/dataHooks/season/useGetFirstAndLastSeason'
import { useGetSingleSeason } from '@/lib/hooks/dataHooks/season/useGetSingleSeason'
import { useGetSingleSeasonTables } from '@/lib/hooks/dataHooks/tables/useGetSingleSeasonTables'
import useScrollTo from '@/lib/hooks/domHooks/useScrollTo'
import { seasonQueries } from '@/lib/queries/season/queries'
import { tableQueries } from '@/lib/queries/tables/queries'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_layout/season/$seasonId/tables')({
  component: Tables,
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(
      seasonQueries['singleSeason'](params.seasonId)
    ),
      context.queryClient.ensureQueryData(
        tableQueries['singleSeasonTables'](params.seasonId)
      )
  },
  pendingComponent: Loading,
})

function Tables() {
  const { seasonId } = Route.useParams()
  const { lastSeason } = useGetFirstAndLastSeason()
  const { women } = useGenderContext()
  const [selectedTable, setSelectedTable] = useState<string>('all')
  const [homeAwayTitle, setHomeAwayTitle] = useState<string>('')
  const season = useGetSingleSeason(seasonId)
  const tables = useGetSingleSeasonTables(seasonId, selectedTable)
  useScrollTo()

  if (women && parseInt(seasonId) < 1973) {
    return <NoWomenSeason />
  }

  if (
    parseInt(seasonId) < 1930 ||
    (season.seasonData.tableLength === 0 &&
      tables.tableData.regularTables.length === 0)
  ) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-foreground md:text-base">
        <p className="mx-10 text-center">
          Inga serietabeller för denna säsong.
        </p>
      </div>
    )
  }
  return (
    <div>
      {season.seasonData.tableLength === 0 &&
        parseInt(seasonId) <= lastSeason && (
          <div>
            <SeasonTablesButtonList
              setHomeAwayTitle={setHomeAwayTitle}
              setSelectedTable={setSelectedTable}
              table={selectedTable}
            />

            <div>
              {tables.tableData.regularTables.length > 0 && (
                <TableList
                  tableArray={tables.tableData.regularTables}
                  seriesInfo={season.seasonData.seriesInfo}
                  homeAwayTitle={homeAwayTitle}
                  selectedTable={selectedTable}
                />
              )}
              {tables.tableData.qualificationTables.length > 0 && (
                <TableList
                  tableArray={tables.tableData.qualificationTables}
                  seriesInfo={season.seasonData.seriesInfo}
                  homeAwayTitle={homeAwayTitle}
                  selectedTable={selectedTable}
                />
              )}
            </div>
          </div>
        )}
      {season.seasonData.tableLength > 0 && season.seasonData.womensSeason ? (
        <div>
          <StaticTables
            tableArray={season.seasonData.seasonTables}
            seriesInfo={season.seasonData.seriesInfo}
          />
        </div>
      ) : null}
    </div>
  )
}
