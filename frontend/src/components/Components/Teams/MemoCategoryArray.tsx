import { memo } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { FormComponent } from '../Common/ReactHookFormComponents/FormComponent'

const categoryArray = [
  { value: 'final', label: 'Final' },
  { value: 'semi', label: 'Semi' },
  { value: 'quarter', label: 'Kvart' },
  { value: 'eight', label: 'Åttondel' },
  { value: 'regular', label: 'Grundserie' },
  { value: 'qualification', label: 'Kval' },
]

interface MemoCategoryArrayProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  methods: UseFormReturn<TFieldValues>
  name: TName
}

const MemoCategoryArray = memo(
  <
    TFieldValues extends FieldValues = FieldValues,
    TName extends Path<TFieldValues> = Path<TFieldValues>,
  >({
    methods,
    name,
  }: MemoCategoryArrayProps<TFieldValues, TName>) => {
    return (
      <div>
        <FormComponent name={name} methods={methods}>
          <FormComponent.Label>Matchkategorier</FormComponent.Label>
          <FormComponent.Description>
            Välj minst en kategori.
          </FormComponent.Description>
          <div className="grid grid-cols-1 gap-y-1 lg:grid-cols-3 lg:gap-x-32">
            <FormComponent.MultiCheckbox
              checkboxArray={categoryArray}
              className="flex flex-row items-center justify-between space-x-3 space-y-0"
            />
          </div>
        </FormComponent>
      </div>
    )
  },
  (prevProps, nextProps) =>
    prevProps.methods.getFieldState(
      'categoryArray',
      prevProps.methods.formState
    ).isDirty ===
    nextProps.methods.getFieldState(
      'categoryArray',
      nextProps.methods.formState
    ).isDirty
)

export default MemoCategoryArray
