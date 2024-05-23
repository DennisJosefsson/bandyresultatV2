import { FormField, FormItem, FormControl } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import { Button } from '@/components/ui/button'
import { useGetTeams } from '@/lib/hooks/dataHooks/teams/useGetTeams'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'

import { memo } from 'react'

interface MemoMapProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  methods: UseFormReturn<TFieldValues>
  name: TName
}

const MemoMap = memo(
  <
    TFieldValues extends FieldValues = FieldValues,
    TName extends Path<TFieldValues> = Path<TFieldValues>,
  >({
    methods,
    name,
  }: MemoMapProps<TFieldValues, TName>) => {
    const { women } = useGenderContext()
    const { data } = useGetTeams()

    const teams = data
      .filter((team) => team.teamId !== 176)
      .filter((team) => team.women === women)

    return (
      <div className="mx-auto mb-2 min-h-screen px-1 font-inter text-foreground lg:px-0">
        <div id="map" className="h-[400px] w-screen max-w-xl p-2">
          <MapContainer
            center={[62, 15]}
            zoom={4}
            scrollWheelZoom={true}
            className="h-[400px]"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup chunkedLoading>
              <FormField
                control={methods.control}
                name={name}
                render={() => (
                  <FormItem>
                    {teams.map((team) => {
                      const position = [team.lat, team.long] as [number, number]
                      return (
                        <FormField
                          key={team.teamId}
                          control={methods.control}
                          name={name}
                          render={({ field }) => {
                            return (
                              <FormItem key={team.teamId}>
                                <Marker key={team.teamId} position={position}>
                                  <Popup>
                                    <div className="flex flex-row items-center justify-evenly gap-2 p-2">
                                      <Button variant="link">
                                        {team.casualName}
                                      </Button>
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(
                                            team.teamId
                                          )}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  team.teamId,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value: number) =>
                                                      value !== team.teamId
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                    </div>
                                  </Popup>
                                </Marker>
                              </FormItem>
                            )
                          }}
                        />
                      )
                    })}
                  </FormItem>
                )}
              />
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      </div>
    )
  },
  (prevProps, nextProps) =>
    prevProps.methods.getFieldState('teamArray', prevProps.methods.formState)
      .isDirty ===
    nextProps.methods.getFieldState('teamArray', nextProps.methods.formState)
      .isDirty
)

export default MemoMap
