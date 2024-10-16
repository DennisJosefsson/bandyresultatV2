import { dashboardSingleSeries } from '@/lib/types/dashboard/dashboard'
import { getRouteApi } from '@tanstack/react-router'
import { z } from 'zod'

const route = getRouteApi('/_layout/dashboard/season/$seasonId/info/$serieId')

type SeriesTablesProps = {
  tables: z.infer<typeof dashboardSingleSeries>['tables']
}

const SeriesTables = ({ tables }: SeriesTablesProps) => {
  const navigate = route.useNavigate()
  if (tables.length === 0) return <h6 className="text-base">Tabeller saknas</h6>
  return (
    <div className="flex flex-col gap-2">
      <table>
        <tbody>
          {tables
            .sort((a, b) => a.position - b.position)
            .map((table) => {
              return (
                <tr
                  key={table.position}
                  className="cursor-pointer"
                  onClick={() =>
                    navigate({
                      to: '$tableId/editTable',
                      params: { tableId: table.tableId },
                      search: (prev) => ({ ...prev }),
                    })
                  }
                >
                  <td className="text-right tabular-nums mx-2 my-1 w-8">
                    {table.position}
                  </td>
                  <td className="mx-2 my-1 w-32">{table.team.casualName}</td>
                  <td className="text-right tabular-nums mx-2 my-1 w-8">
                    {table.totalGames}
                  </td>
                  <td className="text-right tabular-nums mx-2 my-1 w-8">
                    {table.totalWins}
                  </td>
                  <td className="text-right tabular-nums mx-2 my-1 w-8">
                    {table.totalDraws}
                  </td>
                  <td className="text-right tabular-nums mx-2 my-1 w-8">
                    {table.totalLost}
                  </td>
                  <td className="text-right tabular-nums mx-2 my-1 w-8">
                    {table.totalGoalsScored}
                  </td>
                  <td className="text-right tabular-nums mx-2 my-1 w-8">
                    {table.totalGoalsConceded}
                  </td>
                  <td className="text-right tabular-nums mx-2 my-1 w-8">
                    {table.totalGoalDifference}
                  </td>
                  <td className="text-right tabular-nums mx-2 my-1 w-8">
                    {table.totalPoints}
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default SeriesTables
