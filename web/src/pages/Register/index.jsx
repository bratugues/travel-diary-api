import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export function Register() {

  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [registering, setRegistering] = useState(false)
  const navigate = useNavigate()

  async function handleRegister(e){
    e.preventDefault()
    setRegistering(true)
    try {
      api.post('/auth/register', {
        name,
        email,
        password
      })
      toast.success(t('register_success_msg'))
      navigate('/login')
    // eslint-disable-next-line no-unused-vars
    } catch(error) {
      alert(t('register_error_msg'))
    } finally {
      setRegistering(false)
    }
  }
  return (
    <div className='h-screen flex items-center justify-center bg-blue-50'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-6 text-center text-blue-600'>{t('create_your_account')}</h2>
        <form className='space-y-4' onSubmit={handleRegister}>
          <input className='w-full border p-2 rounded' type="text" placeholder={t('name')} value={name} onChange={e => setName(e.target.value)}  />
          <input className='w-full p-2 border rounded' type="email" placeholder={t('email')} value={email} onChange={e => setEmail(e.target.value)} />
          <input className='w-full p-2 border rounded' type="password" placeholder={t('password')} value={password} onChange={e => setPassword(e.target.value)} />
          <button className='w-full bg-blue-600 text-white py-2 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed' type='submit'>{registering ? t('registering') : t('register_btn')}</button>
        </form>
        <p className='mt-4 text-center text-sm'>
          {t('alr_registered')} <Link className = 'text-blue-600 font-bold' to='/login'>{t('login')}</Link>
        </p>

      </div>
    </div>
  )
}
