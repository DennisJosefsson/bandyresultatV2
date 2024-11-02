import Loading from '@/components/Components/Common/Loading'
import TableList from '@/components/Components/SingleTeam/SeasonData/Tables/TableList'
import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetFirstAndLastSeason } from '@/lib/hooks/dataHooks/season/useGetFirstAndLastSeason'
import { getSingleTeamSeason } from '@/lib/requests/teams'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { z } from 'zod'

export const Route = createFileRoute('/_layout/team/$teamId/$seasonId')({
  params: {
    parse: (params) => ({
      seasonId: z.number().int().parse(Number(params.seasonId)),
    }),
    stringify: ({ seasonId }) => ({ seasonId: `${seasonId}` }),
  },
  loader: ({ params: { teamId, seasonId } }) =>
    getSingleTeamSeason({ teamId, seasonId }),
  component: Season,
  pendingComponent: Loading,
})

function Season() {
  const { lastSeason } = useGetFirstAndLastSeason()
  const seasonId = Route.useParams({ select: (p) => p.seasonId })
  const season = Route.useLoaderData()

  return (
    <CardContent>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <Link
            from="/team/$teamId/$seasonId"
            to="/team/$teamId/$seasonId"
            search={(prev) => ({ ...prev })}
            params={(prev) => ({
              ...prev,
              seasonId:
                season.previousSeason?.seasonId ?? season.lastSeason.seasonId,
            })}
          >
            <Button variant="ghost" aria-label="Gå till föregående säsong">
              <div className="inline-flex gap-1 items-center">
                <ChevronLeftIcon className="h-4 w-4" />
                <span className="hidden sm:block">Föregående</span>
              </div>
            </Button>
          </Link>
          <h4 className="font-semibold text-sm md:text-lg">
            {season.seasonYear}
          </h4>
          <Link
            from="/team/$teamId/$seasonId"
            to="/team/$teamId/$seasonId"
            search={(prev) => ({ ...prev })}
            params={(prev) => ({
              ...prev,
              seasonId:
                season.nextSeason?.seasonId ?? season.firstSeason.seasonId,
            })}
          >
            <Button variant="ghost" aria-label="Gå till nästa säsong">
              <div className="inline-flex gap-1 items-center">
                <span className="hidden sm:block">Nästa</span>
                <ChevronRightIcon className="h-4 w-4" />
              </div>
            </Button>
          </Link>
        </div>
        <div>
          <Tabs defaultValue="tables">
            <TabsList>
              <TabsTrigger
                className="text-[10px] md:text-sm truncate"
                value="tables"
              >
                Tabeller
              </TabsTrigger>
              <TabsTrigger
                className="text-[10px] md:text-sm truncate"
                value="games"
              >
                Matcher
              </TabsTrigger>
              {seasonId === lastSeason ? (
                <TabsTrigger
                  className="text-[10px] md:text-sm truncate"
                  value="upcoming"
                >
                  Ospelade matcher
                </TabsTrigger>
              ) : null}
            </TabsList>
            <TabsContent value="tables">
              <TableList
                tableArray={season.tables}
                casualName={season.team.casualName}
              />
            </TabsContent>
            <TabsContent value="games">
              <p>Spelade matcher</p>
            </TabsContent>
            {seasonId === lastSeason ? (
              <TabsContent value="upcoming">
                <p>Ospelade matcher</p>
              </TabsContent>
            ) : null}
          </Tabs>
        </div>
      </div>
    </CardContent>
  )
}
