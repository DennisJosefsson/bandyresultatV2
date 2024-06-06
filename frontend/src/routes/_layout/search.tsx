import SearchTabBar from '@/components/Components/Search/SearchTabBar'
import { Card, CardContent } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { useSearchForm } from '@/lib/hooks/dataHooks/search/useSearchForm'
import { SearchParamsObject } from '@/lib/types/games/search'

import { Outlet, createFileRoute } from '@tanstack/react-router'
import { SubmitHandler } from 'react-hook-form'

export const Route = createFileRoute('/_layout/search')({
  component: SearchHeader,
})

function SearchHeader() {
  const { methods } = useSearchForm()
  const onSubmit: SubmitHandler<SearchParamsObject> = (data) =>
    console.log(data)

  //const formValues = methods.watch()

  return (
    <div className="mx-auto mb-2 min-h-screen px-1 font-inter text-foreground">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} id="compare">
          <Card>
            <CardContent className="p-2 pt-2 md:p-6 md:pt-6">
              <SearchTabBar />
            </CardContent>
          </Card>
          <Card className="mt-2">
            <CardContent>
              <Outlet />
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}
