import { dashboardSingleSeries } from '@/lib/types/dashboard/dashboard'
import { getRouteApi } from '@tanstack/react-router'
import { z } from 'zod'

const route = getRouteApi('/_layout/dashboard/season/$seasonId/info/$serieId')

type SeriesTablesProps = {
  tables: z.infer<typeof dashboardSingleSeries>['tables']
}

const SeriesTables = ({ tables }: SeriesTablesProps) => {
  const navigate = route.useNavigate()
  if (tables.length === 0) return <h6 className="text-base xl:text-lg">Tabeller saknas</h6>
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
                  className="cursor-pointer xl:text-lg"
                  onClick={() =>
                    navigate({
                      to: '$tableId/editTable',
                      params: { tableId: table.tableId },
                      search: (prev) => ({ ...prev }),
                    })
                  }
                >
                  <td className="w-8 mx-2 my-1 text-right tabular-nums">
                    {table.position}
                  </td>
                  <td className="w-32 mx-2 my-1">{table.team.casualName}</td>
                  <td className="w-8 mx-2 my-1 text-right tabular-nums">
                    {table.totalGames}
                  </td>
                  <td className="w-8 mx-2 my-1 text-right tabular-nums">
                    {table.totalWins}
                  </td>
                  <td className="w-8 mx-2 my-1 text-right tabular-nums">
                    {table.totalDraws}
                  </td>
                  <td className="w-8 mx-2 my-1 text-right tabular-nums">
                    {table.totalLost}
                  </td>
                  <td className="w-8 mx-2 my-1 text-right tabular-nums">
                    {table.totalGoalsScored}
                  </td>
                  <td className="w-8 mx-2 my-1 text-right tabular-nums">
                    {table.totalGoalsConceded}
                  </td>
                  <td className="w-8 mx-2 my-1 text-right tabular-nums">
                    {table.totalGoalDifference}
                  </td>
                  <td className="w-8 mx-2 my-1 text-right tabular-nums">
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
