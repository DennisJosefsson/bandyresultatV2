import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/team/$teamId/')({
  component: () => <div>Hello /_layout/team/$teamId/!</div>,
})
