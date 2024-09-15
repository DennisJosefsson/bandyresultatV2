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
import { getBaseUrl } from '@/lib/utils/utils'
import { useLocation } from '@tanstack/react-router'
import { useState } from 'react'
import { useCopyToClipboard, useMediaQuery } from 'usehooks-ts'
import ResultComponent from './ResultComponent'

type SearchContentProps = { gameArray: SearchGame[] | undefined }

const { serverBaseUrl: baseUrl } = getBaseUrl()

const SearchContent = ({ gameArray }: SearchContentProps) => {
  const matches = useMediaQuery('(min-width: 430px)')
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
            <DrawerTitle className="text-[10px] sm:text-sm md:text-base">
              Sökresultat
            </DrawerTitle>
            <div className="flex flex-row gap-2">
              <Button
                size={matches ? 'sm' : 'xxs'}
                onClick={() => copy(`${baseUrl + link + '&submit=true'}`)}
              >
                {copiedText ? 'Kopierad!' : 'Länk'}
              </Button>

              <DrawerClose asChild>
                <Button size={matches ? 'sm' : 'xxs'}>Stäng</Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <div className="w-full">
            <ScrollArea className="h-[360px] w-full">
              <ResultComponent gameArray={gameArray} />
            </ScrollArea>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default SearchContent
