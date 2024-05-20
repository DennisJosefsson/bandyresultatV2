import { FormControl } from '@/components/ui/form'
import { useFormField } from '@/components/ui/useFormField'
import { Checkbox } from '@/components/ui/checkbox'
import { useController } from 'react-hook-form'

const SingleCheckboxComponent = () => {
  const { name, id } = useFormField()

  const { field } = useController({ name })
  return (
    <FormControl>
      <Checkbox
        checked={field.value}
        onCheckedChange={field.onChange}
        id={id}
      />
    </FormControl>
  )
}

export default SingleCheckboxComponent
