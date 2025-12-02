import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Register } from './pages/Register'
import { Login } from './pages/Register/Login'

function App() {
  return (
    // BrowserRouter: Habilita a navegação sem recarregar a página (SPA)
    <BrowserRouter>
      {/* Routes: Garante que apenas UMA rota seja mostrada por vez */}
      <Routes>

        {/* Route: Diz "Quando a URL for X, mostre o componente Y" */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Rota Coringa (*): Se o usuário digitar qualquer outra coisa, manda pro Register */}
        <Route path="*" element={<Navigate to="/register" />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
