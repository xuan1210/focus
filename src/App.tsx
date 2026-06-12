import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Forum from './pages/Forum'
import Home from './pages/Home'
import Knowledge from './pages/Knowledge'
import Login from './pages/Login'
import Settings from './pages/Settings'
import StudyRoom from './pages/StudyRoom'
import Timer from './pages/Timer'
import { useAppStore } from './store/useAppStore'

function AppRoutes() {
  const isLoggedIn = useAppStore((s) => s.isLoggedIn)
  const settings = useAppStore((s) => s.settings)

  useEffect(() => {
    document.body.className = settings.theme === 'pink' ? '' : `theme-${settings.theme}`
  }, [settings.theme])

  if (!isLoggedIn) return <Login />

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/study-room" element={<StudyRoom />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
