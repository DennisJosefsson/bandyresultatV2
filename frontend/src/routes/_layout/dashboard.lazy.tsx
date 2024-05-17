import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_layout/dashboard')({
  component: () => <div>Hello /_layout/dashboard!</div>
})