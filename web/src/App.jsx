import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Register } from './pages/Register'
import { Login } from './pages/Register/Login'
import { Dashboard } from './pages/Register/Dashboard'
import { PrivateRoute } from './components/PrivateRoute'
import { TripDetails } from './pages/Register/TripsDetails'
import { Favorites } from './pages/Favorites'
import { Toaster } from 'sonner'
import { NotFound } from './components/notFound'

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position='top-right' />
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }/>
        <Route path="/trips/favorites" element={
          <PrivateRoute>
            <Favorites/>
          </PrivateRoute>
        }/>
        <Route path="/trips/:tripId" element={
          <PrivateRoute>
            <TripDetails />
          </PrivateRoute>
        }/>
        <Route path="*" element={<NotFound/>} />

      </Routes>

    </BrowserRouter>
  )
}

export default App
