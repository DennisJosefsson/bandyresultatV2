import { Button } from '@/components/ui/button'
import { CompareFormState } from '@/lib/types/teams/teams'
import {
  getOrigin,
  resetOrigin,
} from '@/lib/zustand/linkOrigin/linkOriginStore'
import { Link, useSearch } from '@tanstack/react-router'
import { useCopyToClipboard, useMediaQuery } from 'usehooks-ts'

type CompareHeaderProps = {
  length: number
  searchObject: CompareFormState | null
  link: string
  compareHeaderText: string
}

const Buttons = ({ link, length }: { link: string; length: number }) => {
  const { women } = useSearch({ from: '/_layout' })
  const { origin } = getOrigin()
  const [copiedText, copy] = useCopyToClipboard()
  const matches = useMediaQuery('(min-width: 430px)')
  return (
    <div className="mb-2 flex flex-row justify-end gap-2 xl:mb-6">
      {origin !== null && (
        <Button
          onClick={() => resetOrigin()}
          size={matches ? 'sm' : 'xxs'}
          asChild
        >
          <Link to={origin} search={{ women }}>
            Tillbaka
          </Link>
        </Button>
      )}
      {length > 0 && (
        <Button onClick={() => copy(link)} size={matches ? 'sm' : 'xxs'}>
          {copiedText ? 'Kopierad!' : `Länk`}
        </Button>
      )}
    </div>
  )
}

const CompareHeader = ({
  length,
  searchObject,
  link,
  compareHeaderText,
}: CompareHeaderProps) => {
  if (!searchObject) return null

  return (
    <>
      {length === 0 && (
        <div className="p-1 md:p-2">
          <div className="flex flex-row justify-between items-center">
            <span className="text-xs md:text-base mb-2">
              {compareHeaderText}
            </span>

            <Buttons link={link} length={length} />
          </div>
        </div>
      )}
      {length > 0 && (
        <div className="md:p-2">
          <div className="w-full">
            <div className="flex flex-row justify-between items-center">
              <span className="text-xs md:text-base mb-2 font-semibold">
                Inbördes möten
              </span>
              <Buttons link={link} length={length} />
            </div>

            <span className="text-[10px] md:text-sm text-muted-foreground">
              {compareHeaderText}
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default CompareHeader
