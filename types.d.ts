interface Recipe {
  id?: number
  name: string
  description: string
  imageUrl: string
  rating: number
  date: Date
  user: { name: string, email: string }
}

interface FullRecipe extends Recipe {
  instructions: string
  servings: string
  rating: number
  time: number
  date: string
  tags: { name: string, id: number }[]
  ingredients: { 
    ingredient: { name: string},
    quantity: number,
    unit: string
  }[]
}