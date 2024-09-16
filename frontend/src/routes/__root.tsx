import DefaultNotFound from '@/components/Components/Common/DefaultNotFound'
import Header from '@/components/Components/Header/Header'
import { UserType } from '@/lib/contexts/contexts'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Link,
  Outlet,
  ScrollRestoration,
} from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { lazy, Suspense } from 'react'

interface RouterContext {
  genderContext: ReturnType<typeof useGenderContext>
  queryClient: QueryClient
  user: UserType
}

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      )

export const Route = createRootRouteWithContext<RouterContext>()({
  notFoundComponent: DefaultNotFound,
  errorComponent: ErrorComponent,
  component: () => (
    <>
      <Outlet />
      <ScrollRestoration />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
})

function ErrorComponent({ error }: { error: unknown }) {
  if (error && error instanceof AxiosError) {
    if (error.response?.status === 400) {
      return (
        <>
          <Header />
          <div className="flex flex-row justify-center items-center mt-2 font-inter">
            <p className="text-center">
              {error.response?.data.errors ?? 'Något gick fel.'}
              <br />.
            </p>
          </div>
        </>
      )
    }

    return (
      <>
        <Header />
        <div className="flex flex-row justify-center items-center mt-10">
          <p>
            Något gick tyvärr fel,tillbaka till{' '}
            <Link to="/" search={{ women: false }} className="underline">
              förstasidan
            </Link>
            .
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="flex flex-row justify-center items-center mt-10">
        <p>
          Något gick tyvärr fel,tillbaka till{' '}
          <Link to="/" search={{ women: false }} className="underline">
            förstasidan
          </Link>
          .
        </p>
      </div>
    </>
  )
}
