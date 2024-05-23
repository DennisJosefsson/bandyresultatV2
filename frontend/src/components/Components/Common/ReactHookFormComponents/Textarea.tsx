import { FormControl } from '@/components/ui/form'
import { useFormField } from '@/components/ui/useFormField'
import { Textarea, TextareaProps } from '@/components/ui/textarea'

import { useController } from 'react-hook-form'

function TextareaComponent({ ...props }: TextareaProps) {
  const { name } = useFormField()

  const { field } = useController({ name })

  return (
    <FormControl>
      <Textarea {...props} {...field} id={name} />
    </FormControl>
  )
}

export default TextareaComponent
