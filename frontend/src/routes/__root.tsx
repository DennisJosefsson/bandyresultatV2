import { UserType } from '@/lib/contexts/contexts'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
//import { lazy, Suspense } from 'react'

interface RouterContext {
  genderContext: ReturnType<typeof useGenderContext>
  queryClient: QueryClient
  user: UserType
}

// const TanStackRouterDevtools =
//   process.env.NODE_ENV === 'production'
//     ? () => null
//     : lazy(() =>
//         import('@tanstack/router-devtools').then((res) => ({
//           default: res.TanStackRouterDevtools,
//         }))
//       )

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      {/* <Suspense>
        <TanStackRouterDevtools />
      </Suspense> */}
    </>
  ),
})
