import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './frontend/login.jsx'
import Dashoard from './frontend/dashoard.jsx'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(sessionStorage.getItem('token')))

  function handleLogout() {
    sessionStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  return isAuthenticated
    ? <Dashoard onLogout={handleLogout} />
    : <Login onAuthenticated={() => setIsAuthenticated(true)} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
