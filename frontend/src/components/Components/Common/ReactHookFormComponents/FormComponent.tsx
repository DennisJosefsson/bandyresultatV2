import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useFormField } from '@/components/ui/useFormField'
import { HTMLAttributes, ReactNode } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import Input from './Input'
import MultiCheckbox from './MultiCheckbox'
import RadioGroup from './RadioGroup'
import Select from './Select'
import SingleCheckbox from './SingleCheckbox'
import Switch from './Switch'
import Textarea from './Textarea'

interface FormComponentProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> extends HTMLAttributes<HTMLDivElement> {
  methods: UseFormReturn<TFieldValues>
  name: TName
  children: ReactNode
}

export function FormComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  methods,
  name,
  children,
  ...otherProps
}: FormComponentProps<TFieldValues, TName>) {
  return (
    <FormField
      control={methods.control}
      name={name}
      render={() => (
        <div {...otherProps}>
          <FormItem>
            {children}

            <FormMessage />
          </FormItem>
        </div>
      )}
    />
  )
}

FormComponent.Label = Label
FormComponent.Description = Description
FormComponent.Input = Input
FormComponent.Textarea = Textarea
FormComponent.MultiCheckbox = MultiCheckbox
FormComponent.SingleCheckbox = SingleCheckbox
FormComponent.Select = Select
FormComponent.RadioGroup = RadioGroup
FormComponent.Switch = Switch

function Label({ children, ...otherProps }: { children: ReactNode }) {
  const { name } = useFormField()
  return (
    <FormLabel {...otherProps} htmlFor={name}>
      {children}
    </FormLabel>
  )
}

function Description({ children, ...otherProps }: { children: ReactNode }) {
  return <FormDescription {...otherProps}>{children}</FormDescription>
}
