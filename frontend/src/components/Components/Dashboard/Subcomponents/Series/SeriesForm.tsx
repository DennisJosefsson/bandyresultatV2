import { FormComponent } from '@/components/Components/Common/ReactHookFormComponents/FormComponent'
import { Button } from '@/components/ui/button'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useFormContext } from 'react-hook-form'

const serieStructureArray = Array.from(
  { length: 16 },
  (_, index) => index + 1
).map((_, index) => {
  return { value: index + 1, label: `${index + 1}` }
})

const SeriesForm = ({ seasonId }: { seasonId: number }) => {
  const form = useFormContext()
  const navigate = useNavigate()
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })

  return (
    <div className="flex flex-auto flex-col p-5 px-16">
      <div className="flex flex-row gap-2 justify-end">
        <Button
          onClick={() =>
            navigate({
              to: '/dashboard/season/$seasonId',
              params: { seasonId: seasonId },
              search: { women },
            })
          }
          type="button"
        >
          Tillbaka
        </Button>
        <Button type="submit" form="seriedataForm">
          Skicka
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-x-20 gap-y-4">
        <FormComponent name="serieName" methods={form}>
          <FormComponent.Label>Serienamn</FormComponent.Label>
          <FormComponent.Input />
        </FormComponent>

        <FormComponent name="serieGroupCode" methods={form}>
          <FormComponent.Label>Grupp</FormComponent.Label>
          <FormComponent.Input />
        </FormComponent>

        <FormComponent name="serieCategory" methods={form}>
          <FormComponent.Label>Kategori</FormComponent.Label>
          <FormComponent.Input />
        </FormComponent>

        <FormComponent name="serieStructure" methods={form}>
          <FormComponent.Label>Seriestruktur</FormComponent.Label>
          <FormComponent.MultiCheckbox
            className="grid grid-cols-1 gap-y-1 lg:grid-cols-3 lg:gap-x-16"
            checkboxArray={serieStructureArray}
          />
        </FormComponent>
        <FormComponent name="level" methods={form}>
          <FormComponent.Label>Level</FormComponent.Label>
          <FormComponent.Input />
        </FormComponent>

        <FormComponent name="comment" methods={form}>
          <FormComponent.Label>Kommentar</FormComponent.Label>
          <FormComponent.Textarea className="min-w-[320px]" />
        </FormComponent>
      </div>
    </div>
  )
}

export default SeriesForm
