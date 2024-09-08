import Loading from '@/components/Components/Common/Loading'
import { createLazyFileRoute, useLocation } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { lazy, useEffect, useRef } from 'react'
const Map = lazy(
  async () =>
    await import('@/components/Components/Season/SeasonMapComponents/Map')
)

export const Route = createLazyFileRoute('/_layout/season/$seasonId/map')({
  component: SeasonMap,
  pendingComponent: () => <Loading page="seasonMap" />,
  errorComponent: ({ error, reset }) => (
    <ErrorComponent error={error} reset={reset} />
  ),
})

function SeasonMap() {
  return (
    <div>
      <Map />
    </div>
  )
}

function ErrorComponent({
  error,
  reset,
}: {
  error: unknown
  reset: () => void
}) {
  const pathname = useLocation({ select: (location) => location.pathname })
  const errorLocation = useRef(pathname)
  useEffect(() => {
    if (location.pathname !== errorLocation.current) {
      reset()
    }
  }, [pathname, reset])
  if (error && error instanceof AxiosError && error.response?.status === 404) {
    return <div>{error.response?.data.errors}</div>
  }

  return <div className="flex flex-row justify-center">Något gick fel.</div>
}
