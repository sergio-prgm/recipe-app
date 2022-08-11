import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useUser from '../hooks/useUser'

type UserValues = {
  name: string
  email: string
  password: string
}

export default function UserForm ({ submit } : { submit: SubmitHandler<UserValues>}) {
  const { handleSubmit, register, formState: {errors}} = useForm<UserValues>()
  const router = useRouter()
  const [ logged, setLogged ] = useState(false)
  const { isLoggedIn, logout } = useUser()

  useEffect(() => {
    setLogged(isLoggedIn())
  }, [router.pathname, isLoggedIn])

  return logged ? ( 
    <>
      <p>Parece que ya hay una sesión iniciada</p>
      <p>Para iniciar sesión o registrarse es necesario <button onClick={logout}>salir</button> de la sesión actual</p>
    </>)
    : 
    (<>
      <h1 className="text-4xl font-bold">Login</h1>
      <form onSubmit={handleSubmit(submit)}>
        <label className={STYLES.label} >Username
          <input {...register('name')} type="text" className={STYLES.input} placeholder="Paquito" />
        </label>
        <label className={STYLES.label} >Email
          <input {...register('email')} type="email" className={STYLES.input} placeholder="paquito@example.com" />
        </label>
        <label className={STYLES.label} >Password
          <input {...register('password')} type="password" className={STYLES.input} />
        </label>
        <button className={STYLES.button}>Login</button>
      </form>
    </>
  )
}

const STYLES = {
  label: 'block mt-4',
  input: 'inline-block ml-4 px-3 py-1.5 border-gray-200 border-2',
  button: 'block bg-lime-300 px-2 py-1.5 rounded'
}
