import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getRouteApi, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

const route = getRouteApi('/_layout/season/$seasonId/tables/sub')

const SubHeader = () => {
  const [key, setKey] = useState(+new Date())
  const allSeries = route.useLoaderData({ select: (data) => data.allSeries })
  const navigate = route.useNavigate()

  const seriesArray = allSeries.map((serie) => {
    return { value: serie.serieGroupCode, label: serie.serieName }
  })

  useEffect(() => {
    setKey(+new Date())
  }, [allSeries])

  const onGroupChange = (value: string) => {
    navigate({
      resetScroll: false,
      to: '/season/$seasonId/tables/sub/$group',
      params: (prev) => ({ seasonId: prev.seasonId, group: value }),
      search: (prev) => ({ ...prev }),
    })
  }

  if (seriesArray.length > 4) {
    return (
      <div className="flex flex-row gap-1 justify-center mt-2">
        <Select key={key} onValueChange={onGroupChange}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Välj grupp" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="overflow-y-auto max-h-[12rem]">
              {seriesArray.map((serie) => {
                return (
                  <SelectItem key={serie.value} value={serie.value}>
                    {serie.label}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    )
  }

  return (
    <div className="flex flex-row gap-1 justify-center mt-2">
      {seriesArray.map((serie) => {
        return (
          <Link
            from="/season/$seasonId/tables/sub"
            to="$group"
            params={{ group: serie.value }}
            search={(prev) => ({ ...prev })}
            key={serie.value}
            resetScroll={false}
          >
            {({ isActive }) => {
              return (
                <Button variant={isActive ? 'default' : 'outline'} size="sm">
                  {serie.label}
                </Button>
              )
            }}
          </Link>
        )
      })}
    </div>
  )
}

export default SubHeader
