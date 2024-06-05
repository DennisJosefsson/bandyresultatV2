import { useFormContext } from 'react-hook-form'
import { FormComponent } from '../Common/ReactHookFormComponents/FormComponent'
const categoryArray = [
  { value: 'final', label: 'Final' },
  { value: 'semi', label: 'Semi' },
  { value: 'quarter', label: 'Kvart' },
  { value: 'eight', label: 'Åttondel' },
  { value: 'regular', label: 'Grundserie' },
  { value: 'qualification', label: 'Kval' },
]

const resultCategoryArray = [
  { value: 'all', label: 'Alla' },
  { value: 'win', label: 'Vinst' },
  { value: 'lost', label: 'Förlust' },
  { value: 'draw', label: 'Oavgjort' },
]

const homeGameArray = [
  { value: 'both', label: 'Alla' },
  { value: 'home', label: 'Hemma' },
  { value: 'away', label: 'Borta' },
]
const selectedGenderArray = [
  { value: 'all', label: 'Alla' },
  { value: 'men', label: 'Herrar' },
  { value: 'women', label: 'Damer' },
]

const PreferenceFormComponent = () => {
  const methods = useFormContext()
  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-background lg:w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="text-left">
          <FormComponent methods={methods} name="categoryArray">
            <FormComponent.Label>Matchkategorier</FormComponent.Label>
            <FormComponent.Description>
              Välj minst en kategori.
            </FormComponent.Description>
            <FormComponent.MultiCheckbox checkboxArray={categoryArray} />
          </FormComponent>
          <FormComponent methods={methods} name="gameResult">
            <FormComponent.Label>Matchresultat</FormComponent.Label>
            <FormComponent.RadioGroup radioGroupArray={resultCategoryArray} />
          </FormComponent>
          <FormComponent methods={methods} name="homeGame">
            <FormComponent.Label>Hemma/Borta</FormComponent.Label>
            <FormComponent.RadioGroup radioGroupArray={homeGameArray} />
          </FormComponent>
          <FormComponent methods={methods} name="selectedGender">
            <FormComponent.Label>Sökpreferens</FormComponent.Label>
            <FormComponent.RadioGroup radioGroupArray={selectedGenderArray} />
          </FormComponent>
        </div>
      </div>
    </div>
  )
}

export default PreferenceFormComponent
