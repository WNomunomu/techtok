import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SWRConfig } from 'swr'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LikedArticlesProvider } from './contexts/LikedArticlesContext'
import { swrConfig } from './lib/swr'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <SWRConfig value={swrConfig}>
        <LikedArticlesProvider>
          <App />
        </LikedArticlesProvider>
      </SWRConfig>
    </ErrorBoundary>
  </StrictMode>,
)
