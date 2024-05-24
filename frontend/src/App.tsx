import { RouterProvider, createRouter } from '@tanstack/react-router'
import useUserContext from './lib/hooks/contextHooks/useUserContext'
import { routeTree } from './routeTree.gen'
import useGenderContext from './lib/hooks/contextHooks/useGenderContext'
import { queryClient } from './lib/config/queryClientConfig'
import DefaultNotFound from './components/Components/Common/DefaultNotFound'

const router = createRouter({
  routeTree,
  context: { user: false, queryClient, women: false },
  defaultPreload: 'intent',
  defaultNotFoundComponent: DefaultNotFound,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const { user } = useUserContext()
  const { women } = useGenderContext()

  return (
    <RouterProvider router={router} context={{ user, women, queryClient }} />
  )
}

function App() {
  return <InnerApp />
}

export default App
