import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/season/$seasonId/playoff')({
  component: () => <div>Hello /_layout/season/$seasonId/playoff!</div>
})