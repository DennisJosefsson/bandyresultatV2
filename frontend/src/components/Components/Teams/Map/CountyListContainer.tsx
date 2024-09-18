import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { LatLng, Map as MapType } from 'leaflet'
import { Dispatch, SetStateAction, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import CountyList from './CountyList'

type Counties = {
  county: string
  center: LatLng
}[]

type CountyListContainerProp = {
  countyArray: Counties
  counties: Counties
  setCounties: Dispatch<SetStateAction<Counties>>
  map: MapType | null
}

const CountyListContainer = ({
  countyArray,
  counties,
  setCounties,
  map,
}: CountyListContainerProp) => {
  const matches = useMediaQuery('(min-width: 768px)')
  const matchesSmall = useMediaQuery('(min-width: 430px)')
  const [open, setOpen] = useState(false)
  return (
    <div>
      {matches ? (
        <Card className="p-2 w-64">
          <CountyList
            countyArray={countyArray}
            setCounties={setCounties}
            counties={counties}
            map={map}
          />
        </Card>
      ) : (
        <div>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" size={matchesSmall ? 'sm' : 'textxxs'}>
                Välj län
              </Button>
            </DrawerTrigger>

            <DrawerContent>
              <div className="m-2 max-h-[2/3]">
                <CountyList
                  countyArray={countyArray}
                  setCounties={setCounties}
                  counties={counties}
                  map={map}
                />
              </div>

              <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                  <Button variant="outline">Stäng</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </div>
  )
}

export default CountyListContainer
