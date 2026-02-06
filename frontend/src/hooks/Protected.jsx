import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {
  const {isAuth} = useAuth()

  if(!isAuth){
    return <Navigate to={'/'}/>
  }

  return children
}

export default Protected