import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useParams } from '@tanstack/react-router'
import { KeyboardEvent, useState } from 'react'
import { useCopyToClipboard, useMediaQuery } from 'usehooks-ts'
const FilterComponent = () => {
  const [teamFilter, setTeamFilter] = useState('')
  const [copiedText, copy] = useCopyToClipboard()
  const seasonId = useParams({
    from: '/_layout/season/$seasonId/games',
    select: (param) => param.seasonId,
  })

  const matches = useMediaQuery('(min-width: 430px)')
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  console.log(teamFilter)

  const handleCopy = () => {
    const baseUrl = import.meta.env.PROD
      ? 'https://bandyresultat.se'
      : 'http://localhost:5173'
    copy(`${baseUrl}/season/${seasonId}/games?team=${teamFilter}`)
  }

  return (
    <div className="w-full flex flex-row items-center gap-2">
      <form className="flex-1">
        <Input
          className="h-6 w-full border-foreground bg-muted focus:border-foreground dark:bg-muted/50 md:h-9"
          type="text"
          placeholder="Filter"
          value={teamFilter}
          name="teamFilter"
          onChange={(event) =>
            setTeamFilter(
              event.target.value.replace(/[^a-z0-9\u00C0-\u017F]/gi, '')
            )
          }
          onKeyDown={handleKeyDown}
        />
      </form>
      {teamFilter && (
        <Button onClick={handleCopy} size={matches ? 'sm' : 'xxs'}>
          {copiedText ? 'Kopierat' : 'Länk'}
        </Button>
      )}
    </div>
  )
}

export default FilterComponent
