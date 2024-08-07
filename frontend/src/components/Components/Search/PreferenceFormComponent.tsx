import CategoryArray from './PreferenceFormComponents.tsx/CategoryArray'
import GameResult from './PreferenceFormComponents.tsx/GameResult'
import HomeGame from './PreferenceFormComponents.tsx/HomeGame'
import SelectedGender from './PreferenceFormComponents.tsx/SelectedGender'

const PreferenceFormComponent = () => {
  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-background lg:w-full">
      <div className="grid grid-cols-1 gap-y-2">
        <CategoryArray />
        <GameResult />
        <HomeGame />
        <SelectedGender />
      </div>
    </div>
  )
}

export default PreferenceFormComponent
