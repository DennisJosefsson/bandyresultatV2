import { useLoaderData } from '@tanstack/react-router'
import DashboardDataItem from './DashboardDataItem'

const DashboardData = () => {
  const data = useLoaderData({ from: '/_layout/dashboard/' })
  return (
    <div className="grid grid-cols-4 gap-4 p-2">
      <DashboardDataItem data={data['seasonCount']} title="Antal säsonger" />
      <DashboardDataItem data={data['gameCount']} title="Antal matcher" />
      <DashboardDataItem data={data['teamCount']} title="Antal lag" />
      <DashboardDataItem data={data['goalCount']} title="Antal mål" />
    </div>
  )
}

export default DashboardData
