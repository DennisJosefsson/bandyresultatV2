import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/teams')({
  component: () => <div>Hello /_layout/teams!</div>
})