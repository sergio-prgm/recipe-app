import axios from "axios"
import { SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../pages/_app'

type UserValues = {
  name: string
  email: string
  password: string
}

export default function useUser () {
  const { jwt, setJwt, user, setUser } = useContext(AppContext)
  const [ log, setLog ] = useState(false)
  const router = useRouter() 

  const login: SubmitHandler<UserValues> = async (values) => {
    try {
      const { data } = await axios.post('/api/login', values)
      console.log('¡¡ Logged in !!', data)
      setUser({ name: data['name'], id: data['id']})

      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('jwt', data['token'])
      }
      setLog(log => !log)
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  const logout = (e: React.MouseEvent<HTMLButtonElement>)  => {
    e.preventDefault()
    setUser(null)
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('jwt')
      setLog(log => !log)
      // setJwt(null)
      router.push('/')
    }
  }

  const register = () => {
    //
  }

  const isLoggedIn = Boolean(jwt)

  useEffect(() => {
    console.log({log})
    if (typeof window !== 'undefined') setJwt(window.sessionStorage.getItem('jwt'))
  }, [log, setJwt])

  return {
    login,
    logout,
    register,
    isLoggedIn,
    jwt,
    setJwt
  }
}