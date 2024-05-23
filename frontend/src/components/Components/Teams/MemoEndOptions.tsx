import { memo } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { FormComponent } from '../Common/ReactHookFormComponents/FormComponent'
import { useCompareSeasons } from '@/lib/hooks/dataHooks/teams/useCompare'

interface MemoEndSeasonProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  methods: UseFormReturn<TFieldValues>
  name: TName
}

const MemoEndSeason = memo(
  <
    TFieldValues extends FieldValues = FieldValues,
    TName extends Path<TFieldValues> = Path<TFieldValues>,
  >({
    methods,
    name,
  }: MemoEndSeasonProps<TFieldValues, TName>) => {
    const { endOptions, endOptionsPlaceholder } = useCompareSeasons()
    return (
      <div className="w-60">
        <FormComponent methods={methods} name={name}>
          <FormComponent.Label>Första säsong</FormComponent.Label>
          <FormComponent.Select
            selectionArray={endOptions}
            placeholder={endOptionsPlaceholder}
          />
        </FormComponent>
      </div>
    )
  },
  (prevProps, nextProps) =>
    prevProps.methods.getFieldState('endSeason', prevProps.methods.formState)
      .isDirty ===
    nextProps.methods.getFieldState('endSeason', nextProps.methods.formState)
      .isDirty
)

export default MemoEndSeason
