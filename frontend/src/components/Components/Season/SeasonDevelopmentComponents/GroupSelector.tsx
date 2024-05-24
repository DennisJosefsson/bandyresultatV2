import { Dispatch, SetStateAction } from 'react'
import { CarouselApi } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { sortOrder } from '@/lib/utils/constants'
type GroupArrayObject = {
  group: string
  serieName: string
}

type GroupSelectorProps = {
  groupName: string | undefined
  setRound: Dispatch<SetStateAction<number>>
  setGroup: Dispatch<SetStateAction<string | null>>
  group: string | null
  groupArray: GroupArrayObject[]
  api: CarouselApi | undefined
  dateApi: CarouselApi | undefined
}

const GroupSelector = ({
  groupArray,
  setRound,
  setGroup,
  group,
  groupName,
  api,
  dateApi,
}: GroupSelectorProps) => {
  return (
    <>
      <div className="flex flex-row justify-center gap-1">
        {groupArray
          .sort((a, b) => {
            if (sortOrder.indexOf(a.group) > sortOrder.indexOf(b.group)) {
              return 1
            } else if (
              sortOrder.indexOf(a.group) < sortOrder.indexOf(b.group)
            ) {
              return -1
            } else {
              return 0
            }
          })
          .map((groupItem) => {
            return (
              <Button
                key={groupItem.group}
                onClick={() => {
                  setGroup(groupItem.group)
                  setRound(0)
                  api && api.scrollTo(0)
                  dateApi && dateApi.scrollTo(0)
                }}
                className="truncate"
                size="sm"
                variant={group === groupItem.group ? 'default' : 'outline'}
              >
                {groupItem.serieName}
              </Button>
            )
          })}
      </div>
      {!groupName ? (
        <div className="mt-2 grid place-content-center font-bold">
          Välj serie.
        </div>
      ) : null}
    </>
  )
}

export default GroupSelector
