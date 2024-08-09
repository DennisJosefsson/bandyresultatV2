import {
  gameResultArray,
  homeGameArray,
  selectedGenderArray,
} from './FormComponents/arrays/arrays'
import CategoryArray from './FormComponents/Category/CategoryArray'
import RadioComponent from './FormComponents/RadioComponent'

const PreferenceFormComponent = () => {
  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-background lg:w-full">
      <div className="grid grid-cols-1 gap-y-2">
        <CategoryArray />
        <RadioComponent
          array={gameResultArray}
          label="Matchresultat"
          field="gameResult"
        />
        <RadioComponent
          array={homeGameArray}
          label="Hemma/Borta"
          field="homeGame"
        />
        <RadioComponent
          array={selectedGenderArray}
          label="Dam/Herr"
          field="selectedGender"
        />
      </div>
    </div>
  )
}

export default PreferenceFormComponent
