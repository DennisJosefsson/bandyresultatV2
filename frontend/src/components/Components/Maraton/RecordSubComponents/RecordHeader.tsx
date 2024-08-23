import { Button } from '@/components/ui/button'
import { useGetRecordData } from '@/lib/hooks/dataHooks/maraton/useGetRecordData'
import { useNavigate, useSearch } from '@tanstack/react-router'

const RecordHeader = () => {
  const { women } = useSearch({ from: '/_layout' })
  const navigate = useNavigate()
  const { title, setTitle, record } = useGetRecordData()
  return (
    <>
      <h1 className="mb-2 text-center text-sm font-bold leading-4 sm:text-base md:mb-4 lg:text-xl">
        {title} {women ? 'Damer' : 'Herrar'}
      </h1>
      <div className="mb-2 grid grid-cols-3 md:grid-cols-5 gap-1 md:gap-4">
        <Button
          size="sm"
          variant={record === 'generalStats' ? 'default' : 'outline'}
          onClick={() => {
            navigate({
              search: { record: 'generalStats', women: women },
            })
            setTitle('Statistik')
          }}
        >
          Statistik
        </Button>
        <Button
          size="sm"
          variant={record === 'points' ? 'default' : 'outline'}
          onClick={() => {
            navigate({
              search: { record: 'points', women: women },
            })
            setTitle('Poäng Elitserien')
          }}
        >
          Poäng
        </Button>
        <Button
          size="sm"
          variant={record === 'scored' ? 'default' : 'outline'}
          onClick={() => {
            navigate({
              search: { record: 'scored', women: women },
            })
            setTitle('Gjorda mål Elitserien')
          }}
        >
          Gjorda mål
        </Button>
        <Button
          size="sm"
          variant={record === 'conceded' ? 'default' : 'outline'}
          onClick={() => {
            navigate({
              search: { record: 'conceded', women: women },
            })
            setTitle('Insläppta mål Elitserien')
          }}
        >
          Insl. mål
        </Button>
        <Button
          size="sm"
          variant={record === 'streaks' ? 'default' : 'outline'}
          onClick={() => {
            navigate({
              search: { record: 'streaks', women: women },
            })
            setTitle('Rekordsviter')
          }}
        >
          Rekordsviter
        </Button>
      </div>
    </>
  )
}

export default RecordHeader
