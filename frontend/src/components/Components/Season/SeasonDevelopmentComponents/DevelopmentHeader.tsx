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

const route = getRouteApi('/_layout/season/$seasonId/development')

const DevelopmentHeader = () => {
  const gameSeries = route.useLoaderData({ select: (data) => data.gameSeries })
  const navigate = route.useNavigate()

  const seriesArray = gameSeries.map((serie) => {
    return { value: serie.serieGroupCode, label: serie.serieName }
  })

  const onGroupChange = (value: string) => {
    navigate({
      resetScroll: false,
      to: '/season/$seasonId/development/$group',
      params: (prev) => ({ seasonId: prev.seasonId, group: value }),
      search: (prev) => ({ ...prev }),
    })
  }

  if (seriesArray.length > 3) {
    return (
      <div className="flex flex-row gap-1 justify-center mt-2">
        <Select onValueChange={onGroupChange}>
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
            from="/season/$seasonId/development"
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

export default DevelopmentHeader
