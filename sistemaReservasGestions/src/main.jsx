import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import login from '../src/frontend/login';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <login />
  </StrictMode>,
)
