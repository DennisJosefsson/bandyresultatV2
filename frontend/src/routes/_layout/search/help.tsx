import SearchHelp from '@/components/Components/Search/SearchHelp'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/search/help')({
  component: SearchHelp,
})
