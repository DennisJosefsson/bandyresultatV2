import SimpleErrorComponent from '../Common/SimpleErrorComponent'
import RecordHeader from './RecordSubComponents/RecordHeader'

import { CatchBoundary, Outlet } from '@tanstack/react-router'

const Record = () => {
  return (
    <div className="mx-auto mt-2 min-h-screen font-inter text-foreground">
      <div className="flex flex-col">
        <RecordHeader />
        <div>
          <CatchBoundary
            getResetKey={() => 'reset'}
            onCatch={(error) => {
              console.error(error)
            }}
            errorComponent={({ error, reset }) => (
              <SimpleErrorComponent id="record" error={error} reset={reset} />
            )}
          >
            <Outlet />
          </CatchBoundary>
        </div>
      </div>
    </div>
  )
}

export default Record
