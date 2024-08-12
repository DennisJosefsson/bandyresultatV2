import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SearchGame } from '@/lib/hooks/dataHooks/search/useSearchForm'
import { useLocation } from '@tanstack/react-router'
import { useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'
import ResultComponent from './ResultComponent'

type SearchContentProps = { gameArray: SearchGame[] | undefined }

const baseUrl = import.meta.env.PROD
  ? 'https://bandyresultat.se'
  : 'http://localhost:5173'

const SearchContent = ({ gameArray }: SearchContentProps) => {
  const [copiedText, copy] = useCopyToClipboard()

  const link = useLocation({
    select: (location) => location.href,
  })
  const [open, setOpen] = useState(true)
  return (
    <div className="mx-1 mt-2 xl:mx-0">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader className="flex flex-row justify-between items-center">
            <DrawerTitle>Sökresultat</DrawerTitle>
            <div className="flex flex-row gap-2">
              <Button
                className="w-24"
                onClick={() => copy(`${baseUrl + link + '&submit=true'}`)}
              >
                {copiedText ? 'Kopierad!' : 'Länk'}
              </Button>

              <DrawerClose asChild>
                <Button>Stäng</Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <div className="ml-2 w-full lg:ml-0">
            <ScrollArea className="h-[360px] w-full rounded-md border p-4">
              {/* {searchResult && searchResult.searchResult.length === 0 && (
          <div className="rounded bg-background p-2">
            <p className="">Din sökning gav inga träffar.</p>
          </div>
        )} */}
              <ResultComponent gameArray={gameArray} />
            </ScrollArea>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default SearchContent
