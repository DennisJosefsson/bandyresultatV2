import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard/')({
  component: () => (
    <div className="flex flex-row justify-center">
      Här kommer det lite information senare.
    </div>
  ),
})
