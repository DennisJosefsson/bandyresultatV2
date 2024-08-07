// import { useFormContext } from 'react-hook-form'
// import { FormComponent } from '../Common/ReactHookFormComponents/FormComponent'
import LimitSelection from './OrderComponents/LimitSelection'
import OrderSelection from './OrderComponents/OrderSelection'
import OrderVariableSelection from './OrderComponents/OrderVariableSelection'

const OrderFormComponent = () => {
  //const methods = useFormContext()
  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-background lg:w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="flex max-w-[16rem] flex-col">
          <LimitSelection />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <OrderSelection />
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <OrderVariableSelection />
        </div>
      </div>
    </div>
  )
}

export default OrderFormComponent
