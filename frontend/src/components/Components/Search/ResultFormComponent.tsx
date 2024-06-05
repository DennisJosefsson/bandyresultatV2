import { useFormContext } from 'react-hook-form'
import { FormComponent } from '../Common/ReactHookFormComponents/FormComponent'

const operatorSelection = [
  { value: 'gte', label: 'Lika eller större än' },
  { value: 'lte', label: 'Lika eller mindre än' },
  { value: 'eq', label: 'Lika' },
]

const ResultFormComponent = () => {
  const methods = useFormContext()
  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-background lg:w-full">
      <div className="w grid grid-cols-1 gap-2 lg:grid-cols-2">
        <div className="flex max-w-[16rem] flex-col lg:col-span-2">
          <FormComponent methods={methods} name="result">
            <FormComponent.Label>Resultat</FormComponent.Label>
            <FormComponent.Input placeholder="Resultat" />
            <FormComponent.Description>
              Ange resultat i format t.ex. 3-2.
            </FormComponent.Description>
          </FormComponent>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <FormComponent methods={methods} name="goalDiff">
            <FormComponent.Label>Målskillnad</FormComponent.Label>
            <FormComponent.Input placeholder="Målskillnad" />
            <FormComponent.Description>
              Målskillnad siffra större än 0.
            </FormComponent.Description>
          </FormComponent>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <FormComponent methods={methods} name="goalDiffOperator">
            <FormComponent.Label>Jämförelse målskillnad</FormComponent.Label>
            <FormComponent.Select
              placeholder="Välj"
              selectionArray={operatorSelection}
            />
          </FormComponent>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <FormComponent methods={methods} name="goalScored">
            <FormComponent.Label>Gjorda mål</FormComponent.Label>
            <FormComponent.Input placeholder="5" />
            <FormComponent.Description>
              Antalet gjorda mål, siffra större än 0.
            </FormComponent.Description>
          </FormComponent>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <FormComponent methods={methods} name="goalScoredOperator">
            <FormComponent.Label>Jämförelse gjorda mål</FormComponent.Label>
            <FormComponent.Select
              placeholder="Välj"
              selectionArray={operatorSelection}
            />
          </FormComponent>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <FormComponent methods={methods} name="goalsConceded">
            <FormComponent.Label>Insläppta mål</FormComponent.Label>
            <FormComponent.Input placeholder="5" />
            <FormComponent.Description>
              Antalet insläppta mål, siffra större än 0.
            </FormComponent.Description>
          </FormComponent>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <FormComponent methods={methods} name="goalsConcededOperator">
            <FormComponent.Label>Jämförelse insläppta mål</FormComponent.Label>
            <FormComponent.Select
              placeholder="Välj"
              selectionArray={operatorSelection}
            />
          </FormComponent>
        </div>
      </div>
    </div>
  )
}

export default ResultFormComponent
