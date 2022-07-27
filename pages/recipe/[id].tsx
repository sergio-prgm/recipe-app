import Axios from "axios"
import { GetStaticProps } from "next"

function Recipe ({fullRecipe}: {fullRecipe: FullRecipe}) {
  console.log(fullRecipe)
  const splitInstr = fullRecipe?.instructions.split('#')

  const rating = () => {
    const tempRating = fullRecipe?.rating || 5
    let result = ''

    for (let i = 0; i < tempRating; i++) {
      result += '⭐'
    }

    return result
  }

  return (
  <>
    <h1 className='text-4xl'>{fullRecipe?.name}</h1>
    <h3 className='text-xl uppercase'>{fullRecipe?.user.name}</h3>
    <span className='text-sm'>{new Date(fullRecipe?.date!).toLocaleDateString('es-ES')}</span>
    <p><strong>{rating()}</strong></p>
    {/* <p><span>{fullRecipe?.servings} raciones</span>   |   <span>{fullRecipe?.time} minutos</span></p> */}
    <div className='mt-2'>{fullRecipe?.tags.map(tag => <span className='mx-2 uppercase bg-lime-900 text-white text-sm py-1 px-2' key={tag.name}>{tag.name}</span>)}</div>

    <p className='text-l mt-4 mb-6'>{fullRecipe?.description}</p>
    <h3 className='uppercase text-lg'>Utensilios</h3>
    {/* <ul className='text-start mx-8'>
      {fullRecipe?.utensils.map(utensil => <li className='capitalize' key={utensil}>{utensil}</li>)}
    </ul> */}

    <h3 className='uppercase text-lg'>Ingredientes</h3>
    <ul className='text-start mx-8'>
      {fullRecipe?.ingredients.map(ingredient => <li className='capitalize' key={ingredient.ingredient.name}>{ingredient.ingredient.name}</li>)}
    </ul>

    <h3 className='uppercase text-lg'>Instrucciones</h3>
    <div className='justify-center text-start px-4 max-w-prose mx-auto mt-4'>{splitInstr?.map(parr => <p key={parr.slice(0, 2)}>{parr}</p>)}</div>

  </>
)
}

const URL = `http://localhost:5194/recipe/`

export async function getStaticPaths() {
  // Doesn't prerender any static pages
  // faster build, slower page loads
  // Rec'd for preview

  // if (true){
  //   return {
  //     paths: [],
  //     fallback: 'blocking'
  //   }
  // }

  // for Prod
  // prerenders all available paths from api
  const { data: recipes } = await Axios.get(URL)
  const paths = recipes.map((recipe: any) => ({
    params: {
      id: recipe.id.toString()
    }
  }))
  return { paths, fallback: false}
}

// export async function getServerSideProps ({query}: any) { // for SSR
// export async function getStaticProps ({params}: any): GetStaticProps { // for SSG
export const getStaticProps: GetStaticProps = async ({params}) => {
  const id = params?.id
  console.log('id', id)

  const data = await Axios.get(
    URL + id
  )

  console.log(data.data)

  return {
    props: {
      fullRecipe: data.data as FullRecipe,
    }
  }
}

export default Recipe