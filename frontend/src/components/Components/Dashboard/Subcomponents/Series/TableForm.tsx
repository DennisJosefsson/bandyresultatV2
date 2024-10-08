import { FormComponent } from '@/components/Components/Common/ReactHookFormComponents/FormComponent'
import { Button } from '@/components/ui/button'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useFormContext } from 'react-hook-form'
import ParseData from './ParseData'

const TableForm = ({
  teamName,
  seasonId,
  serieId,
}: {
  teamName: string | undefined
  seasonId: number
  serieId: number
}) => {
  const form = useFormContext()
  const navigate = useNavigate()
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })

  return (
    <div className="flex flex-auto flex-col p-5 px-16 gap-2">
      <div className="flex flex-row gap-2 justify-between">
        <h4 className="text-lg font-semibold">{teamName}</h4>
        <div className="flex flex-row gap-2">
          <Button
            type="button"
            onClick={() =>
              navigate({
                to: '/dashboard/season/$seasonId/info/$serieId',
                params: { seasonId, serieId },
                search: { women },
              })
            }
          >
            Tillbaka
          </Button>
          <Button type="submit" form="staticTableForm">
            Skicka
          </Button>
        </div>
      </div>
      <ParseData />
      <div className="grid grid-cols-3 gap-x-20 gap-y-4">
        <FormComponent name="position" methods={form}>
          <FormComponent.Label>Position</FormComponent.Label>
          <FormComponent.Input />
        </FormComponent>

        <FormComponent name="totalGames" methods={form}>
          <FormComponent.Label>Matcher</FormComponent.Label>
          <FormComponent.Input />
        </FormComponent>

        <FormComponent name="totalWins" methods={form}>
          <FormComponent.Label>Vinster</FormComponent.Label>
          <FormComponent.Input />
        </FormComponent>

        <FormComponent name="totalDraws" methods={form}>
          <FormComponent.Label>Oavgjorda</FormComponent.Label>
          <FormComponent.Input />
        </FormComponent>

        <FormComponent name="totalLost" methods={form}>
          <FormComponent.Label>Förluster</FormComponent.Label>
          <FormComponent.Input />
        </FormComponent>
        <FormComponent name="totalGoalsScored" methods={form}>
          <FormComponent.Label>Gjorda mål</FormComponent.Label>
          <FormComponent.Input />
        </FormComponent>
        <FormComponent name="totalGoalsConceded" methods={form}>
          <FormComponent.Label>Insläppta mål</FormComponent.Label>
          <FormComponent.Input />
        </FormComponent>
        <FormComponent name="totalGoalDifference" methods={form}>
          <FormComponent.Label>Målskillnad</FormComponent.Label>
          <FormComponent.Input />
        </FormComponent>
        <FormComponent name="totalPoints" methods={form}>
          <FormComponent.Label>Poäng</FormComponent.Label>
          <FormComponent.Input />
        </FormComponent>
      </div>
    </div>
  )
}

export default TableForm
