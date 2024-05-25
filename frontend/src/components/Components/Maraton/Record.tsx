import RecordHeader from './RecordSubComponents/RecordHeader'

import RecordComponentSwitch from './RecordSubComponents/RecordComponentSwitch'

const Record = () => {
  return (
    <div className="mx-auto mt-4 min-h-screen max-w-7xl font-inter text-foreground">
      <div className="flex flex-col">
        <RecordHeader />
        <div className="flex flex-col">
          <RecordComponentSwitch />
        </div>
      </div>
    </div>
  )
}

export default Record
