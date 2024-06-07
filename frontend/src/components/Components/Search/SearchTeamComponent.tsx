import { useGetSearchTeams } from '@/lib/hooks/dataHooks/search/useSearchForm'
import { FormComponent } from '../Common/ReactHookFormComponents/FormComponent'
import { useFormContext } from 'react-hook-form'

const SearchTeamComponent = () => {
  const methods = useFormContext()
  const { teamSelection, opponentSelection } = useGetSearchTeams()
  return (
    <div className="mb-2 grid grid-cols-1 gap-2 lg:grid-cols-2 lg:justify-between">
      <div className="flex max-w-[24rem] flex-col lg:w-full">
        <div>
          <FormComponent methods={methods} name="team">
            <FormComponent.Label>Välj lag</FormComponent.Label>
            <FormComponent.Select
              selectionArray={teamSelection}
              placeholder="Välj"
            />
          </FormComponent>
        </div>
      </div>

      <div className="flex max-w-[18rem] flex-col">
        <div>
          <FormComponent methods={methods} name="opponent">
            <FormComponent.Label>Välj motståndare</FormComponent.Label>
            <FormComponent.Select
              selectionArray={opponentSelection}
              placeholder="Välj"
            />
          </FormComponent>
        </div>
      </div>
    </div>
  )
}

export default SearchTeamComponent
