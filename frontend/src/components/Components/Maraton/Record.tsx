import RecordHeader from './RecordSubComponents/RecordHeader'

import { Outlet } from '@tanstack/react-router'

const Record = () => {
  return (
    <div className="mx-auto mt-2 min-h-screen font-inter text-foreground">
      <div className="flex flex-col">
        <RecordHeader />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Record
