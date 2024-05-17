import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/maraton')({
  component: () => <div>Hello /_layout/maraton!</div>
})