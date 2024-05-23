import { memo } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { FormComponent } from '../Common/ReactHookFormComponents/FormComponent'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { useCompareSeasons } from '@/lib/hooks/dataHooks/teams/useCompare'

interface MemoStartSeasonProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  methods: UseFormReturn<TFieldValues>
  name: TName
}

const MemoStartSeason = memo(
  <
    TFieldValues extends FieldValues = FieldValues,
    TName extends Path<TFieldValues> = Path<TFieldValues>,
  >({
    methods,
    name,
  }: MemoStartSeasonProps<TFieldValues, TName>) => {
    const { women } = useGenderContext()
    const { startOptions } = useCompareSeasons()
    return (
      <div className="w-60">
        <FormComponent methods={methods} name={name}>
          <FormComponent.Label>Första säsong</FormComponent.Label>
          <FormComponent.Select
            selectionArray={startOptions}
            placeholder={women ? '1972/73' : '1907'}
          />
        </FormComponent>
      </div>
    )
  },
  (prevProps, nextProps) =>
    prevProps.methods.getFieldState('startSeason', prevProps.methods.formState)
      .isDirty ===
    nextProps.methods.getFieldState('startSeason', nextProps.methods.formState)
      .isDirty
)

export default MemoStartSeason
