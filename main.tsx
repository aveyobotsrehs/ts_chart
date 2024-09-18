import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './MyChart.tsx'
import MyComponent from './MyChart.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <MyComponent />
  </StrictMode>,
)
//<StrictMode>
//<App />
//</StrictMode>,