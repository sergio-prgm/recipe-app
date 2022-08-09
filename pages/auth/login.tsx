import axios from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import { SubmitHandler, useForm } from 'react-hook-form'

type UserValues = {
  name: string
  email: string
  password: string
}

export default function LoginPage () {
  const { handleSubmit, register, formState: {errors}} = useForm<UserValues>()
  isLoggedIn()

  return ( 
    <>
      <h1 className="text-4xl font-bold">Login</h1>
      <form onSubmit={handleSubmit(login)}>
        <label className={LABEL_STYLES} >Username
          <input {...register('name')} type="text" className={INPUT_STYLES} placeholder="Paquito" />
        </label>
        <label className={LABEL_STYLES} >Email
          <input {...register('email')} type="email" className={INPUT_STYLES} placeholder="paquito@example.com" />
        </label>
        <label className={LABEL_STYLES} >Password
          <input {...register('password')} type="password" className={INPUT_STYLES} />
        </label>
        <button className={BUTTON_STYLES}>Login</button>
      </form>
    </>
  )
}


function isLoggedIn() {
  // Check if there's already a seesion storage thing 
  if (typeof window !== 'undefined'){
    const jwt = window.sessionStorage.getItem('jwt')
    return Boolean(jwt)
  }
}

const login: SubmitHandler<UserValues> = async (values) => {
  const { name, email, password} = values

  const user = await axios.post('/api/login', values)

  console.log(user.data)

  // const user = axios.post(API, {
  //   name, email, password
  // })
  // .then((res) => console.log(res))
  // .catch(err => console.error(err))

  // const user = await fetch(API, {
  //   method: 'POST',
  //   headers: {
  //     // 'Access-Control-Allow-Headers': '*',
  //     // 'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
  //     // 'Access-Control-Allow-Origin': '*',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ name, email, password})
  // })
  // .then(res => {
  //   if (!res.ok) throw new Error('response is not ok')
  //   return res.json()
  // })

}

const LABEL_STYLES = 'block mt-4'

const INPUT_STYLES = 'inline-block ml-4 px-3 py-1.5 border-gray-200 border-2'

const BUTTON_STYLES = 'block bg-lime-300 px-2 py-1.5 rounded'