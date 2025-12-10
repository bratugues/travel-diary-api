import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function Navbar() {
  const navigate = useNavigate()

  function handleLogout(){
    localStorage.removeItem('token')
    toast.success('See you soon!')
    navigate('/login')
  }

  return (
    <nav className='bg-white shadow-sm border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 h-16 flex items-center justify-between'>
        <Link to='/dashboard'>
          <div class='logo' className='flex items-center gap-2'>
            <span className='text-2xl'>✈️</span>
            <h1 className='text-xl font-bold text-blue-600'>My Travel Diary</h1>
          </div>
        </Link>
        <div className='flex gap-4'>
        <button onClick={() => navigate('/trips/favorites')} className='text-gray-500 hover:text-yellow-600 font-medium transition-colors'>Favorites</button>
        <button onClick={handleLogout} className='text-gray-500 hover:text-red-600 font-medium transition-colors'>Logout</button>
        </div>
      </div>
    </nav>
  )
}

// importar useNavigate de react-router-dom
// criar funcao handleLogout que remove item (token) do localStorage e navigate para login
// retorna: front end (nav, div, div com span e h1 dentro, botao de sair usando o handleLogout no onClick)
