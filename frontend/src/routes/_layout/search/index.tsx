import Loading from '@/components/Components/Common/Loading'
import Search from '@/components/Components/Search/Search'
import { createFileRoute } from '@tanstack/react-router'
import { AxiosError } from 'axios'

export const Route = createFileRoute('/_layout/search/')({
  component: Search,
  pendingComponent: Loading,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
})

function ErrorComponent({ error }: { error: unknown }) {
  console.log('ERROR', error)

  if (error && error instanceof AxiosError) {
    if (error.response?.status === 400) {
      return (
        <div className="flex flex-row justify-center items-center mt-2 font-inter">
          <p className="text-center">
            {error.response?.data.errors ?? 'Något gick fel.'}
            <br />.
          </p>
        </div>
      )
    }

    return (
      <div className="flex flex-row justify-center items-center mt-2">
        Något gick tyvärr fel.
      </div>
    )
  }

  return (
    <div className="flex flex-row justify-center items-center mt-2">Fel</div>
  )
}
