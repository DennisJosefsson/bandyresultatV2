import { FormControl } from '@/components/ui/form'
import { useFormField } from '@/components/ui/useFormField'
import { Input, InputProps } from '@/components/ui/input'

import { useController } from 'react-hook-form'

function InputComponent({ ...props }: InputProps) {
  const { name } = useFormField()

  const { field } = useController({ name })

  return (
    <FormControl>
      <Input {...props} {...field} id={name} />
    </FormControl>
  )
}

export default InputComponent
