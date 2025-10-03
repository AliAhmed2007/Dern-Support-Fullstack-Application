import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ThemeProvider from './context/ThemeContext.jsx'
import AuthProvider from './context/AuthContext.jsx'
import UserProfileProvider from './context/UserProfileContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserProfileProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </UserProfileProvider>
    </AuthProvider>
  </StrictMode >,
)
