import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import LandingPage from './pages/LandingPage'
import LogoutHandler from './components/LogoutHandler'

export default function App(){
  return (
    <LanguageProvider>
      <AuthProvider>
        {/* Handle logout sync from XinKEdu */}
        <LogoutHandler />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </LanguageProvider>
  )
}
