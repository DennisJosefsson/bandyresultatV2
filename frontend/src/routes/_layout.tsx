import Header from '@/components/Components/Header/Header'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Toaster } from '@/components/ui/toaster'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
  notFoundComponent: () => <div>Länken finns inte.</div>,
})

function LayoutComponent() {
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
