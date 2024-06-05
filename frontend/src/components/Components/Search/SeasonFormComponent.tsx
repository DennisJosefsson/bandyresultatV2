import { useFormContext } from 'react-hook-form'
import { FormComponent } from '../Common/ReactHookFormComponents/FormComponent'
import { useGetFirstAndLastSeason } from '@/lib/hooks/dataHooks/season/useGetFirstAndLastSeason'

const SeasonFormComponent = () => {
  const methods = useFormContext()
  const { lastSeason } = useGetFirstAndLastSeason()

  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-background lg:w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="flex max-w-[16rem] flex-col">
          <FormComponent methods={methods} name="startSeason">
            <FormComponent.Label>Första år</FormComponent.Label>
            <FormComponent.Input placeholder="1907" />
            <FormComponent.Description>{`1907-${lastSeason}`}</FormComponent.Description>
          </FormComponent>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <FormComponent methods={methods} name="endSeason">
            <FormComponent.Label>Sista år</FormComponent.Label>
            <FormComponent.Input placeholder={`${lastSeason}`} />
            <FormComponent.Description>{`1907-${lastSeason}`}</FormComponent.Description>
          </FormComponent>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <FormComponent methods={methods} name="inputDate">
            <FormComponent.Label>Matchdatum</FormComponent.Label>
            <FormComponent.Input placeholder="Datum" />
            <FormComponent.Description>
              T.ex. 26/12 för annandagen.
            </FormComponent.Description>
          </FormComponent>
        </div>
      </div>
    </div>
  )
}

export default SeasonFormComponent
