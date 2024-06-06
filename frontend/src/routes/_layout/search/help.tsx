import { createFileRoute } from '@tanstack/react-router'
import SearchHelp from '@/components/Components/Search/SearchFormModal'

export const Route = createFileRoute('/_layout/search/help')({
  component: SearchHelp,
})
