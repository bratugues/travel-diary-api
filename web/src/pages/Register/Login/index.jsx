import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../../services/api'
import { useTranslation } from 'react-i18next'

export function Login(){

  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggingIn ,setLoggingIn] = useState(false)
  const navigate = useNavigate()

  async function handleLogin(e){
    e.preventDefault()
    setLoggingIn(true)
    try {
    const response = await api.post('/auth/login', {email, password})
    const token = response.data.accessToken
    localStorage.setItem('token', token)
    navigate('/dashboard')
  } catch (error) {
    console.error(error)
    alert(t('login_error_msg'))
  } finally{
    setLoggingIn(false)
  }
  }
  return(
    <div className='h-screen flex items-center justify-center bg-blue-50'>
      <div className='bg-white shadow-md rounded-lg w-96 p-8'>
        <h2 className='text-center font-bold text-blue-600 text-2xl mb-6'>{t('login_btn')}</h2>
        <form className='space-y-4' onSubmit={handleLogin}>
          <input className='w-full border p-2 rounded' type="email" placeholder={t('email')} value={email} onChange={e => setEmail(e.target.value)} />
          <input className='w-full border p-2 rounded' type="password" placeholder={t('password')} value={password} onChange={e => setPassword(e.target.value)} />
          <button className='w-full bg-blue-600 text-white py-2 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed' type='submit' disabled={loggingIn}>{loggingIn ? t('entering') : t('login_btn')}</button>
          <p className='text-sm text-center'>
            {t('not_yet_registered')} <Link to='/register' className='text-blue-600 font-bold'>{t('register')}</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
