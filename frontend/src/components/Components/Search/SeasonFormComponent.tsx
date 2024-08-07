// import { useFormContext } from 'react-hook-form'
// import { FormComponent } from '../Common/ReactHookFormComponents/FormComponent'
// import { useGetFirstAndLastSeason } from '@/lib/hooks/dataHooks/season/useGetFirstAndLastSeason'

import EndSeasonInput from './SeasonComponents/EndSeasonInput'
import GameDateInput from './SeasonComponents/GameDateInput'
import StartSeasonInput from './SeasonComponents/StartSeasonInput'

const SeasonFormComponent = () => {
  // const methods = useFormContext()
  // const { lastSeason } = useGetFirstAndLastSeason()

  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-background lg:w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="flex max-w-[16rem] flex-col">
          <StartSeasonInput />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <EndSeasonInput />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <GameDateInput />
        </div>
      </div>
    </div>
  )
}

export default SeasonFormComponent
