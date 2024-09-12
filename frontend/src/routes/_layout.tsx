import SimpleErrorComponent from '@/components/Components/Common/SimpleErrorComponent'
import Header from '@/components/Components/Header/Header'
//import { ScrollArea } from '@/components/ui/scroll-area'

import { Toaster } from '@/components/ui/toaster'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { CatchBoundary, Outlet, createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { z } from 'zod'

const searchWomen = z.object({ women: z.boolean().optional().default(false) })

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
  notFoundComponent: () => <div>Länken finns inte.</div>,
  validateSearch: searchWomen,
  errorComponent: () => <div>Oj, här gick något fel.</div>,
})

function LayoutComponent() {
  const { womenContext, dispatch } = useGenderContext()
  const { women } = Route.useSearch()

  useEffect(() => {
    if (women !== womenContext) {
      dispatch({ type: 'SET', payload: women })
    }
  }, [women, womenContext, dispatch])
  return (
    <div className="flex flex-col bg-background text-foreground w-full">
      <Header />
      <Toaster />
      {/* <ScrollArea className="content-container"> */}
      <div className="w-full">
        <CatchBoundary
          getResetKey={() => 'reset'}
          onCatch={(error) => {
            console.error(error)
          }}
          errorComponent={({ error, reset }) => (
            <SimpleErrorComponent id="layout" error={error} reset={reset} />
          )}
        >
          <Outlet />
        </CatchBoundary>
      </div>
      {/* </ScrollArea> */}
    </div>
  )
}
