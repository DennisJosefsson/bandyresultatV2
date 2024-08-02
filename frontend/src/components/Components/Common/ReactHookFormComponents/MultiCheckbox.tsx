import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { useFormField } from '@/components/ui/useFormField'
import { HTMLAttributes } from 'react'

type CheckboxArray = { value: string | number; label: string }[]

interface MultiCheckboxComponentProps extends HTMLAttributes<HTMLDivElement> {
  checkboxArray: CheckboxArray
}

function MultiCheckboxComponent({
  checkboxArray,
  ...otherProps
}: MultiCheckboxComponentProps) {
  const { name, control } = useFormField()
  return (
    <>
      {checkboxArray.map((item) => (
        <FormField
          key={item.value}
          control={control}
          name={name}
          render={({ field }) => {
            console.log('Rendering category checkbox', field.name)
            console.count('checkbox')
            return (
              <FormItem key={item.value} {...otherProps}>
                <FormLabel className="text-sm font-normal" htmlFor={item.label}>
                  {item.label}
                </FormLabel>
                <FormControl>
                  <Checkbox
                    id={item.label}
                    checked={field.value?.includes(item.value)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([...field.value, item.value])
                        : field.onChange(
                            field.value?.filter(
                              (value: string) => value !== item.value
                            )
                          )
                    }}
                  />
                </FormControl>
              </FormItem>
            )
          }}
        />
      ))}
    </>
  )
}

export default MultiCheckboxComponent
