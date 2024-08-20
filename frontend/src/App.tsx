import { RouterProvider, createRouter } from '@tanstack/react-router'
import DefaultNotFound from './components/Components/Common/DefaultNotFound'
import { queryClient } from './lib/config/queryClientConfig'
import useGenderContext from './lib/hooks/contextHooks/useGenderContext'
import useUserContext from './lib/hooks/contextHooks/useUserContext'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  context: {
    user: import.meta.env.PROD ? false : true,
    queryClient,
    genderContext: undefined!,
  },
  defaultNotFoundComponent: DefaultNotFound,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const { user } = useUserContext()
  const genderContext = useGenderContext()

  return (
    <RouterProvider
      router={router}
      context={{ user, genderContext, queryClient }}
    />
  )
}

function App() {
  return <InnerApp />
}

export default App
