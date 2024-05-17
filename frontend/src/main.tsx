import './index.css'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/config/queryClientConfig'
import FavTeamsContextProvider from './lib/contexts/favteamsContext'
import GenderContextProvider from './lib/contexts/genderContext'
import { ThemeProvider } from './lib/contexts/themeContext'
import UserContextProvider from './lib/contexts/userContext'

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <GenderContextProvider>
            <FavTeamsContextProvider>
              <ThemeProvider defaultTheme="light" storageKey="theme">
                <App />
              </ThemeProvider>
            </FavTeamsContextProvider>
          </GenderContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}
