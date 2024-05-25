import { useGetRecordData } from '@/lib/hooks/dataHooks/maraton/useGetRecordData'
import GeneralStats from './GeneralStats'
import PointsGoals from './PointsGoals'
import Streaks from './Streaks'

const RecordComponentSwitch = () => {
  const { record } = useGetRecordData()
  let pageContent
  switch (record) {
    case 'points':
    case 'scored':
    case 'conceded':
      pageContent = <PointsGoals />
      break
    case 'generalStats':
      pageContent = <GeneralStats />
      break
    case 'streaks':
      pageContent = <Streaks />
      break
    default:
      pageContent = <GeneralStats />
  }
  return <>{pageContent}</>
}

export default RecordComponentSwitch
