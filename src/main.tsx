import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TgThemeProvider } from './contexts/TgThemeProvider.tsx'
import App from './App.tsx'
import './index.css'

const el = document.getElementById('root') as HTMLDivElement
const root = createRoot(el)

setTimeout(() => {
  el.animate([
    {opacity: 1},
    {opacity: 0},
    {opacity: 0},
    {opacity: 1},
  ], 600)
  setTimeout(() => root.render(
    <StrictMode>
      <TgThemeProvider>
        <App />
      </TgThemeProvider>
    </StrictMode>,
  ), 200)
}, 1000);