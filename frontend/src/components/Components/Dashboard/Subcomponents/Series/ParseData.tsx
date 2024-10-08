import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

type ErrorState = { error: false } | { error: true; message: string }

const ParseData = () => {
  const [values, setValues] = useState('')
  const [error, setError] = useState<ErrorState>({ error: false })
  const form = useFormContext()
  const formValues = form.getValues()

  const parseValues = () => {
    setError({ error: false })
    const valueArray = values.split(' ')
    if (valueArray.length !== 9) {
      setError({ error: true, message: 'Fel antal värden' })
      return
    }
    if (
      !valueArray.every((item) => {
        const num = parseInt(item)
        return typeof num === 'number'
      })
    ) {
      setError({ error: true, message: 'Alla värden måste vara nummer' })
      return
    }

    const insertValues = {
      ...formValues,
      position: valueArray[0],
      totalGames: valueArray[1],
      totalWins: valueArray[2],
      totalDraws: valueArray[3],
      totalLost: valueArray[4],
      totalGoalsScored: valueArray[5],
      totalGoalsConceded: valueArray[6],
      totalGoalDifference: valueArray[7],
      totalPoints: valueArray[8],
    }

    form.reset(insertValues)
  }

  return (
    <div>
      <div className="flex flex-row gap-2">
        <Input value={values} onChange={(e) => setValues(e.target.value)} />{' '}
        <Button type="button" onClick={parseValues}>
          Parse
        </Button>
      </div>
      <div>{error.error ? <p>{error.message}</p> : ''}</div>
    </div>
  )
}

export default ParseData
