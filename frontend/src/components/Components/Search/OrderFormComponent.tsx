import { useFormContext } from 'react-hook-form'
import { FormComponent } from '../Common/ReactHookFormComponents/FormComponent'

const limitSelection = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
]

const orderSelection = [
  { value: 'asc', label: 'Stigande' },
  { value: 'desc', label: 'Fallande' },
]

const orderVariableSelection = [
  { value: 'date', label: 'Datum' },
  { value: 'totalGoals', label: 'Antal mål' },
  { value: 'goalDifference', label: 'Målskillnad' },
  { value: 'goalsScored', label: 'Gjorda mål' },
  { value: 'goalsConceded', label: 'Insläppta mål' },
]

const OrderFormComponent = () => {
  const methods = useFormContext()
  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-background lg:w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="flex max-w-[16rem] flex-col">
          <FormComponent methods={methods} name="limit">
            <FormComponent.Label>Max antal träffar</FormComponent.Label>
            <FormComponent.Select
              selectionArray={limitSelection}
              placeholder="Välj"
            />
          </FormComponent>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <FormComponent methods={methods} name="order">
            <FormComponent.Label>Sorteringsordning</FormComponent.Label>
            <FormComponent.Select
              selectionArray={orderSelection}
              placeholder="Välj"
            />
          </FormComponent>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <FormComponent methods={methods} name="orderVar">
            <FormComponent.Label>Välj sorteringsfält</FormComponent.Label>
            <FormComponent.Select
              selectionArray={orderVariableSelection}
              placeholder="Välj"
            />
          </FormComponent>
        </div>
      </div>
    </div>
  )
}

export default OrderFormComponent
