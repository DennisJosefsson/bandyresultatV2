import Loading from '@/components/Components/Common/Loading'
import AllData from '@/components/Components/Teams/Compare/AllData'
import CompareHeader from '@/components/Components/Teams/Compare/CompareHeader'
import CompareStats from '@/components/Components/Teams/Compare/CompareStats'
import DetailedData from '@/components/Components/Teams/Compare/DetailedData'
import { Card, CardContent } from '@/components/ui/card'
import { useCompareResults } from '@/lib/hooks/dataHooks/teams/useCompare'
import { compareFormState } from '@/lib/types/teams/teams'
import { createFileRoute, Link } from '@tanstack/react-router'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const Route = createFileRoute('/_layout/teams/compare')({
  component: Compare,
  pendingComponent: Loading,
  validateSearch: compareFormState,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
})

function Compare() {
  const compareObject = Route.useSearch()
  const { data: compareData, compareLink } = useCompareResults(compareObject)

  return (
    <>
      {compareData && (
        <Card className="mt-2">
          <CompareHeader
            length={compareData.allData.length}
            seasonNames={compareData.seasonNames}
            link={compareLink}
            searchObject={compareObject}
            compareAllGames={compareData.compareAllGames}
            origin={origin}
          />
          <CardContent>
            <Tabs defaultValue="tables">
              <TabsList>
                <TabsTrigger value="tables">Tabeller</TabsTrigger>
                <TabsTrigger value="games">Matcher</TabsTrigger>
                <TabsTrigger value="stats">Statistik</TabsTrigger>
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
          </CardContent>
        </Card>
      )}
    </>
  )
}

function ErrorComponent({ error }: { error: unknown }) {
  const compareObject = Route.useSearch()
  if (error && error instanceof Error) {
    console.log('errorMessage', error.message)
    const messages = JSON.parse(error.message)
    if (Array.isArray(messages)) {
      const errorMess = messages.map((error) => error.message).join(',')
      return (
        <div className="flex flex-row justify-center items-center mt-2">
          <p>
            {errorMess}. Gå till{' '}
            <Link to="/teams" search={compareObject}>
              laglistan
            </Link>{' '}
            eller ändra{' '}
            <Link to="/teams/selection" search={compareObject}>
              sökval
            </Link>
            .
          </p>
        </div>
      )
    }
    return <div>Felmeddelande</div>
  }

  return <div>Fel</div>
}
