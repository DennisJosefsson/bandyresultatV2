import { useState, KeyboardEvent } from 'react'

import SeasonsList from './Subcomponents/SeasonsList'
import FilterComponent from './Subcomponents/FilterComponent'
import useGetAllSeasons from '@/lib/hooks/dataHooks/season/useGetAllSeasons'
import useScrollTo from '@/lib/hooks/domHooks/useScrollTo'

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
    <div className="mx-auto mb-2 min-h-screen max-w-7xl font-inter text-foreground">
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
