import Head from "next/head"
import Navbar from "./Navbar"

interface Props {
  children: React.ReactNode
}

function Layout ({children}: Props) {
  return (
    <>
      <Navbar />
      <main >
        {children}
      </main>
    </>
  )
}

export default Layout