import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { SearchParamsFields } from '@/lib/types/games/search'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { AxiosError } from 'axios'
type SearchErrorProps = {
  error: Error | null
  reset: () => void
}

const SearchError = ({ error, reset }: SearchErrorProps) => {
  const navigate = useNavigate({ from: '/search' })
  const searchFields = useSearch({ from: '/_layout/search' })

  const resetFn = () => {
    if (error instanceof AxiosError) {
      const fields = error.response?.data.paths as SearchParamsFields[]

      if (Array.isArray(fields)) {
        fields.forEach((field) => {
          if (searchFields[field] !== undefined) {
            navigate({ search: (prev) => ({ ...prev, [field]: undefined }) })
          }
        })
      }
    }
    reset()
  }

  if (error instanceof AxiosError) {
    return (
      <Dialog defaultOpen={true}>
        <DialogContent className="bg-red-600 text-white">
          <DialogHeader>
            <DialogTitle>Oops, något gick fel.</DialogTitle>
          </DialogHeader>
          {error.response?.data.errors ?? 'Okänt fel'}
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                className="bg-white text-black hover:bg-slate-300"
                onClick={resetFn}
              >
                Stäng
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  } else {
    return <div>Något gick fel</div>
  }
}

export default SearchError
