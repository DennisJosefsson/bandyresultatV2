import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/season')({
  notFoundComponent: () => <div>Test</div>,
})
