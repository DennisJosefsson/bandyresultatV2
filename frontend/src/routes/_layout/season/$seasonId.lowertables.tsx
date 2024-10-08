import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/season/$seasonId/lowertables')({
  component: () => <div>Hello /_layout/season/$seasonId/lowertables!</div>
})