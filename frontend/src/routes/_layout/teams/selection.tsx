import Loading from '@/components/Components/Common/Loading'
import CategoryArray from '@/components/Components/Teams/Selection/CategoryArray'
import EndSeason from '@/components/Components/Teams/Selection/EndSeason'
import StartSeason from '@/components/Components/Teams/Selection/StartSeason'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/teams/selection')({
  component: Selection,
  pendingComponent: () => <Loading page="searchSelection" />,
})

function Selection() {
  return (
    <div className="m-2 font-inter text-foreground xl:mx-0">
      <div className=" flex flex-col gap-2">
        <CategoryArray />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <StartSeason />
          <EndSeason />
        </div>
      </div>
    </div>
  )
}
