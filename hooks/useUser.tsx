import axios from "axios"
import { SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type UserValues = {
  name: string
  email: string
  password: string
}

export default function useUser () {
  const router = useRouter() 

  const login: SubmitHandler<UserValues> = async (values) => {
    try {
      const { data: token} = await axios.post('/api/login', values)
      console.log('¡¡ Logged in !!')
      router.push('/')

      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('jwt', token)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const logout = (e: React.MouseEvent<HTMLButtonElement>)  => {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('jwt')
      router.push('/')
    }
  }

  const register = () => {
    //
  }

  const isLoggedIn = () => {
    const jwt = window.sessionStorage.getItem('jwt')
    console.log(Boolean(jwt))
    return Boolean(jwt)
  }

  return {
    login,
    logout,
    register,
    isLoggedIn
  }
}