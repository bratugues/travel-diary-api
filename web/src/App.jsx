import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Register } from './pages/Register'
import { Login } from './pages/Register/Login'
import { Dashboard } from './pages/Register/Dashboard'
import { PrivateRoute } from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }/>
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App
