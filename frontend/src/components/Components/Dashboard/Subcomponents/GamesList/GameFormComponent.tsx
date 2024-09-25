import { FormComponent } from '@/components/Components/Common/ReactHookFormComponents/FormComponent'
import { useFormContext } from 'react-hook-form'

const categoryArray = [
  { value: 'final', label: 'Final' },
  { value: 'semi', label: 'Semi' },
  { value: 'quarter', label: 'Kvart' },
  { value: 'eight', label: 'Åttondel' },
  { value: 'regular', label: 'Grundserie' },
  { value: 'qualification', label: 'Kvalmatch' },
]

type GameFormComponentProps = {
  teamSelection: { value: number; label: string }[]
  groupArray: { value: string; label: string }[]
}

const GameFormComponent = ({
  teamSelection,
  groupArray,
}: GameFormComponentProps) => {
  const form = useFormContext()
  return (
    <div>
      <div className="p-1">
        <FormComponent methods={form} name="homeTeamId">
          <FormComponent.Label>Hemmalag</FormComponent.Label>
          <FormComponent.Select
            selectionArray={teamSelection}
            placeholder="Välj lag"
          />
        </FormComponent>
      </div>
      <div className="p-1">
        <FormComponent methods={form} name="awayTeamId">
          <FormComponent.Label>Bortalag</FormComponent.Label>
          <FormComponent.Select
            selectionArray={teamSelection}
            placeholder="Välj lag"
          />
        </FormComponent>
      </div>
      <div className="flex flex-col py-2">
        <div className="p-1">
          <FormComponent methods={form} name="result">
            <FormComponent.Label>Resultat</FormComponent.Label>
            <FormComponent.Input />
          </FormComponent>
        </div>
        <div className="p-1">
          <FormComponent methods={form} name="halftimeResult">
            <FormComponent.Label>Halvtidsresultat</FormComponent.Label>
            <FormComponent.Input />
          </FormComponent>
        </div>
        <div className="p-1">
          <FormComponent methods={form} name="date">
            <FormComponent.Label>Datum</FormComponent.Label>
            <FormComponent.Input />
          </FormComponent>
        </div>

        <div className="p-1">
          <FormComponent methods={form} name="category">
            <FormComponent.Label>Kategori</FormComponent.Label>
            <FormComponent.RadioGroup
              radioGroupArray={categoryArray}
              className="grid grid-cols-3 gap-2"
            />
          </FormComponent>
        </div>
        <div className="p-1">
          <FormComponent methods={form} name="group">
            <FormComponent.Label>Grupp</FormComponent.Label>
            <FormComponent.RadioGroup
              radioGroupArray={groupArray}
              className="grid grid-cols-2 gap-2"
            />
          </FormComponent>
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <div className="p-1">
          <FormComponent methods={form} name="playoff">
            <div className="flex flex-row items-center gap-2">
              <FormComponent.Label>Slutspel</FormComponent.Label>
              <FormComponent.SingleCheckbox />
            </div>
          </FormComponent>
        </div>

        <div className="p-1">
          <FormComponent methods={form} name="extraTime">
            <div className="flex flex-row items-center gap-2">
              <FormComponent.Label>Övertid</FormComponent.Label>
              <FormComponent.SingleCheckbox />
            </div>
          </FormComponent>
        </div>

        <div className="p-1">
          <FormComponent methods={form} name="penalties">
            <div className="flex flex-row items-center gap-2">
              <FormComponent.Label>Straffar</FormComponent.Label>
              <FormComponent.SingleCheckbox />
            </div>
          </FormComponent>
        </div>
      </div>
    </div>
  )
}

export default GameFormComponent
