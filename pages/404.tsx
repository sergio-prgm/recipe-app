import Link from "next/link"
import { useRouter } from "next/router"

export default function PageNotFound () {
  const router = useRouter()

  const { pathname, basePath, locale, asPath } = router

  console.log(router)

  return (
    <div>
      Sorry {asPath} is not a correct route.
      Please, go <Link href="/">back</Link> and try again
    </div>
  )
}