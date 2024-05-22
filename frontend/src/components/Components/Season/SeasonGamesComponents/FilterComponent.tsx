import { Dispatch, SetStateAction, KeyboardEvent } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
const FilterComponent = ({
  teamFilter,
  setTeamFilter,
  seasonId,
}: {
  teamFilter: string | undefined
  setTeamFilter: Dispatch<SetStateAction<string>>
  seasonId: string
}) => {
  const [copiedText, copy] = useCopyToClipboard()
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  const handleCopy = () => {
    const baseUrl = import.meta.env.PROD
      ? 'https://bandyresultat.se'
      : 'http://localhost:5173'
    copy(`${baseUrl}/season/${seasonId}/games?team=${teamFilter}`)
  }

  return (
    <div className="w-full flex flex-row gap-2">
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
        <Button onClick={handleCopy}>{copiedText ? 'Kopierat' : 'Länk'}</Button>
      )}
    </div>
  )
}

export default FilterComponent
