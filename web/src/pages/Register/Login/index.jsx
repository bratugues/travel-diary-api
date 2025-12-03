import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../../services/api'

export function Login(){

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleLogin(e){
    e.preventDefault()
    try {
    const response = await api.post('/auth/login', {email, password})
    const token = response.data.accessToken
    localStorage.setItem('token', token)
    navigate('/dashboard')
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    alert('Error while logging in... Try again or register below')
  }
  }
  return(
    <div className='h-screen flex items-center justify-center bg-blue-50'>
      <div className='bg-white shadow-md rounded-lg w-96 p-8'>
        <h2 className='text-center font-bold text-blue-600 text-2xl mb-6'>Login</h2>
        <form className='space-y-4' onSubmit={handleLogin}>
          <input className='w-full border p-2 rounded' type="email" placeholder='e-mail' value={email} onChange={e => setEmail(e.target.value)} />
          <input className='w-full border p-2 rounded' type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
          <button className='w-full bg-blue-600 text-white py-2 rounded font-bold' type='submit'>Login</button>
          <p className='text-sm text-center'>
            Don't have an account yet? <Link to='/register' className='text-blue-600 font-bold'>Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
