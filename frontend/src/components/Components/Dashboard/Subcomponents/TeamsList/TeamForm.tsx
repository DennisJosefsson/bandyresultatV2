import { FormComponent } from '@/components/Components/Common/ReactHookFormComponents/FormComponent'
import { Button } from '@/components/ui/button'
import { municipalityQueries } from '@/lib/queries/municipality/queries'
import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'

const TeamForm = ({
  counties,
}: {
  counties: { countyId: number; name: string }[]
}) => {
  const form = useFormContext()
  const values = form.watch()

  const { data: municipalities } = useQuery(
    municipalityQueries['teamForm'](values.countyId)
  )

  const countySelection = counties.map((county) => {
    return { value: county.countyId, label: county.name }
  })

  const municipalitySelection = municipalities?.map((muni) => {
    return { value: muni.municipalityId, label: muni.name }
  })

  return (
    <div className="flex flex-row justify-between p-6">
      <div className="flex flex-col gap-2 w-64">
        <FormComponent name="name" methods={form}>
          <FormComponent.Label>Lagnamn</FormComponent.Label>
          <FormComponent.Input />
        </FormComponent>
        <FormComponent name="casualName" methods={form}>
          <FormComponent.Label>Vanligt namn</FormComponent.Label>
          <FormComponent.Input />
        </FormComponent>
        <FormComponent name="shortName" methods={form}>
          <FormComponent.Label>Kort namn</FormComponent.Label>
          <FormComponent.Input />
        </FormComponent>
        <FormComponent name="city" methods={form}>
          <FormComponent.Label>Stad</FormComponent.Label>
          <FormComponent.Input />
        </FormComponent>
        <FormComponent name="lat" methods={form}>
          <FormComponent.Label>Latitud</FormComponent.Label>
          <FormComponent.Input />
        </FormComponent>
        <FormComponent name="long" methods={form}>
          <FormComponent.Label>Longitud</FormComponent.Label>
          <FormComponent.Input />
        </FormComponent>
        <FormComponent name="women" methods={form}>
          <div className="flex flex-row items-center gap-2">
            <FormComponent.Label>Damer</FormComponent.Label>
            <FormComponent.SingleCheckbox />
          </div>
        </FormComponent>
        <FormComponent name="countyId" methods={form}>
          <FormComponent.Label>Län</FormComponent.Label>
          <FormComponent.Select
            selectionArray={countySelection}
            placeholder="Välj län"
          />
        </FormComponent>
        {municipalitySelection ? (
          <FormComponent name="municipalityId" methods={form}>
            <FormComponent.Label>Kommun</FormComponent.Label>
            <FormComponent.Select
              selectionArray={municipalitySelection}
              placeholder="Välj kommun"
            />
          </FormComponent>
        ) : (
          <p>Väntar på län.</p>
        )}
      </div>
      <div>
        <Button type="submit">Skicka</Button>
      </div>
    </div>
  )
}

export default TeamForm
