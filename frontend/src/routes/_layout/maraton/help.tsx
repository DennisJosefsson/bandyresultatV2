import MaratonHelp from '@/components/Components/Maraton/MaratonHelp'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/maraton/help')({
  component: MaratonHelp,
})
