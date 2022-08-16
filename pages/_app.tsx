import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, Dispatch, SetStateAction, useState } from 'react'
import Layout from '../components/Layout'

interface context {
  jwt: string | null
  setJwt: Dispatch<SetStateAction<string | null>>
  user: UserCtx | null
  setUser: Dispatch<SetStateAction<UserCtx | null>>
}

interface UserCtx {
  name: string
  id: number
}

export const AppContext = createContext<context>({
  jwt: null, setJwt: () => {},
  user: null, setUser: () => {}
  }
)

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  const [ jwt, setJwt] = useState<string | null>(null
    // () => {
    // if (typeof window !== 'undefined') {
    //   return window.sessionStorage.getItem('jwt')
    // }
    // return null
    // }
  )
  
  const [ user, setUser ] = useState<UserCtx | null>({} as UserCtx)

  return (
    <AppContext.Provider value={{ jwt, setJwt, user, setUser }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
    )
}

export default MyApp
