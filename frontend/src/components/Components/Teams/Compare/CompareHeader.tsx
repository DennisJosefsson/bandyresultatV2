import { Button } from '@/components/ui/button'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CompareFormState } from '@/lib/types/teams/teams'
import { useRouter } from '@tanstack/react-router'
import { useCopyToClipboard } from 'usehooks-ts'

type CompareHeaderProps = {
  length: number
  searchObject: CompareFormState | null
  link: string
  origin: string
  compareHeaderText: string
}

const Buttons = ({
  link,
  origin,
  length,
}: {
  link: string
  origin: string | undefined
  length: number
}) => {
  const router = useRouter()
  const [copiedText, copy] = useCopyToClipboard()
  return (
    <div className="mb-2 flex flex-col-reverse justify-end gap-2 xl:mb-6 xl:flex-row xl:justify-end">
      {origin === 'gamesList' && (
        <Button onClick={() => router.history.back()} size="sm">
          Tillbaka
        </Button>
      )}
      {length > 0 && (
        <Button onClick={() => copy(link)} size="sm">
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
  origin,
  compareHeaderText,
}: CompareHeaderProps) => {
  if (!searchObject) return null

  return (
    <>
      {length === 0 && (
        <CardHeader>
          <div className="flex flex-row justify-between">
            <CardTitle>{compareHeaderText}</CardTitle>

            <Buttons link={link} origin={origin} length={length} />
          </div>
        </CardHeader>
      )}
      {length > 0 && (
        <CardHeader>
          <div className="w-full">
            <div className="flex flex-row justify-between">
              <CardTitle className="mb-2">Inbördes möten</CardTitle>
              <Buttons link={link} origin={origin} length={length} />
            </div>

            <CardDescription>{compareHeaderText}</CardDescription>
          </div>
        </CardHeader>
      )}
    </>
  )
}

export default CompareHeader
