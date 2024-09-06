import { KeyboardEvent, useState } from 'react'

import useGetAllSeasons from '@/lib/hooks/dataHooks/season/useGetAllSeasons'
import useScrollTo from '@/lib/hooks/domHooks/useScrollTo'
import FilterComponent from './Subcomponents/FilterComponent'
import SeasonsList from './Subcomponents/SeasonsList'

const Seasons = () => {
  const [seasonFilter, setSeasonFilter] = useState('')
  const { seasons } = useGetAllSeasons()

  useScrollTo()

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  return (
    <div className="mx-auto my-2 min-h-screen font-inter text-foreground">
      <FilterComponent
        seasonFilter={seasonFilter}
        setSeasonFilter={setSeasonFilter}
        handleKeyDown={handleKeyDown}
      />

      <div className="self-center">
        <SeasonsList
          seasons={seasons.filter((season) =>
            season.year.includes(seasonFilter)
          )}
        />
      </div>
    </div>
  )
}

export default Seasons
