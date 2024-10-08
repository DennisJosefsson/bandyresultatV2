import { FormControl } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { useFormField } from '@/components/ui/useFormField'
import { useController } from 'react-hook-form'

const SwitchComponent = () => {
  const { name } = useFormField()

  const { field } = useController({ name })
  return (
    <FormControl>
      <Switch
        checked={field.value}
        onCheckedChange={field.onChange}
        id={name}
      />
    </FormControl>
  )
}

export default SwitchComponent
