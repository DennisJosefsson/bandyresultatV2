import { FormControl } from '@/components/ui/form'
import { useFormField } from '@/components/ui/useFormField'
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useController } from 'react-hook-form'

type SelectComponentProps = {
  selectionArray: {
    value: number | string
    label: string
  }[]
  placeholder: string
}

const SelectComponent = ({
  selectionArray,
  placeholder,
}: SelectComponentProps) => {
  const { name } = useFormField()
  const { field } = useController({ name })
  return (
    <Select
      onValueChange={field.onChange}
      defaultValue={field.value ? field.value.toString() : placeholder}
      value={field.value?.toString()}
    >
      <FormControl>
        <SelectTrigger className="ml-px">
          <SelectValue placeholder={placeholder} id={name} />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="w-60">
        {selectionArray.map((item) => {
          return (
            <SelectItem
              key={`${String(name)}-${item.value}`}
              value={
                typeof item.value === 'string'
                  ? item.value
                  : item.value.toString()
              }
            >
              {item.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export default SelectComponent
