import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SessionProvider } from './components/SessionContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
      <App />
    </SessionProvider>
  </StrictMode>,
)
