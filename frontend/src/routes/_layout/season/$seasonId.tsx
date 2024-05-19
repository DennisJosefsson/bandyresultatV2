import SeasonHeader from '@/components/Components/Season/SeasonHeader'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/season/$seasonId')({
  component: Season,
})

function Season() {
  return (
    <div>
      <SeasonHeader />
      <Outlet />
    </div>
  )
}
