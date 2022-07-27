import Link from "next/link";

function Navbar () {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/recipe/new">New Recipe</Link>
    </nav>
  )
}

export default Navbar