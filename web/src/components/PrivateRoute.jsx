// importar Navigate de react-router-dom
// criar funcao PrivateRoute que recebe {children}
// pegar token de local storage
// condicional: se token, children, se nao, navigate para login
import { Navigate } from 'react-router-dom'

export function PrivateRoute({children}){
  const token = localStorage.getItem('token')

  if(token){
    return children
  } else{
    return <Navigate to='/login' />
  }
}
