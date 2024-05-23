import Loading from '@/components/Components/Common/Loading'
import MemoCategoryArray from '@/components/Components/Teams/MemoCategoryArray'
import MemoEndSeason from '@/components/Components/Teams/MemoEndOptions'
import MemoStartSeason from '@/components/Components/Teams/MemoStartOptions'
import { createFileRoute } from '@tanstack/react-router'
import { useFormContext } from 'react-hook-form'

export const Route = createFileRoute('/_layout/teams/selection')({
  component: Selection,
  pendingComponent: Loading,
})

function Selection() {
  const methods = useFormContext()
  return (
    <div className="m-2 font-inter text-foreground xl:mx-0">
      <div className=" flex flex-col gap-2">
        <MemoCategoryArray methods={methods} name="categoryArray" />
        <MemoStartSeason methods={methods} name="startSeason" />
        <MemoEndSeason methods={methods} name="endSeason" />
      </div>
    </div>
  )
}
