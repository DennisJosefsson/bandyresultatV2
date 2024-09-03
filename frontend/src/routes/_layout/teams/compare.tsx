import Loading from '@/components/Components/Common/Loading'
import AllData from '@/components/Components/Teams/Compare/AllData'
import CompareHeader from '@/components/Components/Teams/Compare/CompareHeader'
import CompareStats from '@/components/Components/Teams/Compare/CompareStats'
import DetailedData from '@/components/Components/Teams/Compare/DetailedData'
import { useCompareResults } from '@/lib/hooks/dataHooks/teams/useCompare'
import { createFileRoute, Link } from '@tanstack/react-router'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AxiosError } from 'axios'

export const Route = createFileRoute('/_layout/teams/compare')({
  component: Compare,
  pendingComponent: () => <Loading page="compare" />,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
})

function Compare() {
  const compareObject = Route.useSearch()
  const { data: compareData, compareLink } = useCompareResults(compareObject)

  return (
    <>
      {compareData && (
        <div className="mt-2">
          <CompareHeader
            length={compareData.allData.length}
            compareHeaderText={compareData.compareHeaderText}
            link={compareLink}
            searchObject={compareObject}
          />
          <div>
            <Tabs defaultValue="tables">
              <TabsList>
                <TabsTrigger value="tables" className="text-[10px] md:text-sm">
                  Tabeller
                </TabsTrigger>
                <TabsTrigger value="games" className="text-[10px] md:text-sm">
                  Matcher
                </TabsTrigger>
                <TabsTrigger value="stats" className="text-[10px] md:text-sm">
                  Statistik
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tables">
                <AllData
                  allData={compareData.allData}
                  sortedData={compareData.sortedData}
                  searchObject={compareObject}
                />
                <DetailedData
                  categoryData={compareData.categoryData}
                  searchObject={compareObject}
                />
              </TabsContent>

              <CompareStats
                searchObject={compareObject}
                firstGames={compareData.firstGames}
                latestGames={compareData.latestGames}
                golds={compareData.golds}
                playoffs={compareData.playoffs}
                allPlayoffs={compareData.allPlayoffs}
                seasons={compareData.seasons}
                allSeasons={compareData.allSeasons}
              />
            </Tabs>
          </div>
        </div>
      )}
    </>
  )
}

function ErrorComponent({ error }: { error: unknown }) {
  const compareObject = Route.useSearch()

  if (error && error instanceof AxiosError) {
    if (error.response?.status === 400) {
      return (
        <div className="flex flex-row justify-center items-center mt-2 font-inter">
          <p className="text-center">
            {error.response?.data.errors ?? 'Något gick fel.'}
            <br />
            Gå till{' '}
            <Link
              to="/teams"
              search={compareObject}
              className="text-blue-700 underline font-semibold"
            >
              laglistan
            </Link>{' '}
            eller ändra{' '}
            <Link
              to="/teams/selection"
              search={compareObject}
              className="underline text-blue-700 font-semibold"
            >
              sökval
            </Link>
            .
          </p>
        </div>
      )
    }

    return (
      <div className="flex flex-row justify-center items-center mt-2">
        Något gick tyvärr fel.
      </div>
    )
  }

  return (
    <div className="flex flex-row justify-center items-center mt-2">Fel</div>
  )
}
