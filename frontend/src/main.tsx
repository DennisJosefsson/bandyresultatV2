import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { queryClient } from './lib/config/queryClientConfig'
import FavTeamsContextProvider from './lib/contexts/favteamsContext'
import GenderContextProvider from './lib/contexts/genderContext'
import { ThemeProvider } from './lib/contexts/themeContext'
import UserContextProvider from './lib/contexts/userContext'

console.log('BK Allez Allez')

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
