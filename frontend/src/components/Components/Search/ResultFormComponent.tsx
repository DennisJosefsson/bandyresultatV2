import GoalDiffInput from './ResultComponents/GoalDiffInput'
import GoalsConcededInput from './ResultComponents/GoalsConcededInput'
import GoalsScoredInput from './ResultComponents/GoalsScoredInput'
import OperatorSelector from './ResultComponents/OperatorSelector'
import ResultInput from './ResultComponents/ResultInput'

const operatorSelection = [
  { value: 'gte', label: 'Lika eller större än' },
  { value: 'lte', label: 'Lika eller mindre än' },
  { value: 'eq', label: 'Lika' },
]

const ResultFormComponent = () => {
  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-background lg:w-full">
      <div className="w grid grid-cols-1 gap-2 lg:grid-cols-2">
        <div className="flex max-w-[16rem] flex-col lg:col-span-2">
          <ResultInput />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <GoalDiffInput />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <OperatorSelector
            operatorSelection={operatorSelection}
            field="goalDiffOperator"
            defaultValue="gte"
            label="Sortering"
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <GoalsScoredInput />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <OperatorSelector
            operatorSelection={operatorSelection}
            field="goalsScoredOperator"
            defaultValue="gte"
            label="Sortering"
          />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <GoalsConcededInput />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <OperatorSelector
            operatorSelection={operatorSelection}
            field="goalsConcededOperator"
            defaultValue="lte"
            label="Sortering"
          />
        </div>
      </div>
    </div>
  )
}

export default ResultFormComponent
