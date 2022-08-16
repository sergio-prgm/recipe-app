import Axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

function Home ({recipes}: {recipes: Recipe[]}) {
  console.log(recipes)

  return (
    <>
      <Head>
        <title>Nombre de la app</title>
        <meta name='description' content='Website containing a lot of cool recipes'/>
      </Head>
      <header>
        <h1 className='text-4xl text-indigo-500 my-4'>
          Recetas recientes
        </h1>
        <p>string</p>
      </header>
      <main>
        <section>
          <List recipes={recipes}/>
        </section>
      </main>
    </>
  )
}

const List = ({recipes}: {recipes: Recipe[]}) => {
  return (
    <ul className='flex justify-center items-center flex-col mx-4'>
      {recipes.map((recipe: any, index) => {
        return (
          <li className='flex flex-col w-full mb-4 sm:flex-row sm:max-w-xl rounded-lg bg-white' key={recipe.id}>
            <Card recipe={recipe} index={index} />
          </li>
        )
      })}
    </ul>
  )
}

const Card = ({recipe, index}: {recipe: Recipe, index: number}) => {
  // TODO limit img size 
  const src = recipe.imageUrl
  return (
    <>
      <Image 
        loader={() => src}
        src={src}
        width={348}
        height={348}
        alt={recipe.name}
        unoptimized={true}
        priority={index < 5 ? true : false}
        // Research the unoptimized thing 
        className='w-full h-96 object-cover sm:h-auto sm:w-48 rounded-t-lg sm:rounded-none sm:rounded-l-lg'
      />
      <div className='p-6 flex flex-col justify-start'>
        <Link href={`/recipe/${recipe.id}`} className='text-lime-400 underline'>
          Visit
        </Link>
        <h3 className='text-xl font-semibold'>{recipe.name}</h3>
        <small className='text-md text-gray-600 uppercase'>by {recipe.user.name}</small>
        <p className='text-gray-800'>{recipe.description}</p>
      </div>
    </>
  )
}
// a revalidate() method will be added to update this request
// every time data changes

export async function getStaticProps () {
  const data = await Axios.get(
    "http://localhost:5194/recipe"
  )

  return {
    props: {
      recipes: data.data
    },
    revalidate: 60
  }
}

export default Home
