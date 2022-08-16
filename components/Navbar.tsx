import Link from "next/link";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { useRouter } from "next/router";

function Navbar () {
  const { logout, isLoggedIn } = useUser()
  const router = useRouter()
  const [ logged, setLogged ] = useState(false)

  useEffect(() => {
    setLogged(isLoggedIn)
  }, [router.pathname, isLoggedIn])

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/recipe/new">New Recipe</Link>
      <Link href='/auth/login'>Login</Link>
      {
        logged ? 
        <button onClick={logout} >Logout</button>
        : <></>
      }
    </nav>
  )
}

export default Navbar