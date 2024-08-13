import Header from '@/components/Components/Header/Header'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Toaster } from '@/components/ui/toaster'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { z } from 'zod'

const searchWomen = z.object({ women: z.boolean().optional().default(false) })

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
  notFoundComponent: () => <div>Länken finns inte.</div>,
  validateSearch: searchWomen,
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
    <div className="flex flex-col bg-background text-foreground">
      <Header />
      <Toaster />
      <ScrollArea className="content-container">
        <Outlet />
      </ScrollArea>
    </div>
  )
}
