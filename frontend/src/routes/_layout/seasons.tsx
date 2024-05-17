import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/seasons')({
  component: () => <div>Hello /_layout/seasons!</div>
})