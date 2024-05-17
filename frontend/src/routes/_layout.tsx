import Header from '@/components/Components/Header/Header'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className="flex flex-col bg-background text-foreground">
      <Header />
      <ScrollArea className="content-container">
        <Outlet />
      </ScrollArea>
    </div>
  )
}
