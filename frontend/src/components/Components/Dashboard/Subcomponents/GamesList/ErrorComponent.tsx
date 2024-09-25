import { ErrorMessage } from '@hookform/error-message'
import { FieldErrors } from 'react-hook-form'

const ErrorComponent = ({ errors }: { errors: FieldErrors }) => {
  if (Object.keys(errors).length === 0) {
    return null
  }
  return (
    <div className="mb-2 rounded border-red-700 bg-background p-2 text-sm font-semibold text-red-700 md:text-base">
      {Object.keys(errors).map((fieldName) => (
        <ErrorMessage
          errors={errors}
          name={fieldName}
          as="div"
          key={fieldName}
        />
      ))}
    </div>
  )
}

export default ErrorComponent
