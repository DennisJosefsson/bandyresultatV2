import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { SearchParamsFields } from '@/lib/types/games/search'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
type SearchErrorProps = {
  error: Error | null
}

const SearchError = ({ error }: SearchErrorProps) => {
  const [isError, setIsError] = useState(true)
  const navigate = useNavigate({ from: '/search' })
  const searchFields = useSearch({ from: '/_layout/search' })

  useEffect(() => {
    if (isError && error instanceof AxiosError) {
      const fields = error.response?.data.paths as SearchParamsFields[]
      if (Array.isArray(fields)) {
        fields.forEach((field) => {
          if (searchFields[field] !== undefined) {
            navigate({ search: (prev) => ({ ...prev, [field]: undefined }) })
          }
        })
      }
      setIsError(false)
    }
  }, [isError, error, navigate, searchFields])
  if (error instanceof AxiosError) {
    return (
      <Dialog defaultOpen={true}>
        <DialogContent className="bg-red-600 text-white">
          <DialogHeader>
            <DialogTitle>Oops, något gick fel.</DialogTitle>
          </DialogHeader>
          {error.response?.data.errors}
        </DialogContent>
      </Dialog>
    )
  } else {
    return <div>Något gick fel</div>
  }
}

export default SearchError
