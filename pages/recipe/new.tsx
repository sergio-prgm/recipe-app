import { useForm, useFieldArray } from 'react-hook-form'
import { useContext } from 'react'
import { AppContext } from '../_app'
import axios from 'axios'

// TODO form (import reactHookForm etc)

export default function NewRecipe () {
  
  return (
    <>
      <h1 className="text-4xl">Nueva receta</h1>
      <Form />
    </>
  )
}

interface Ingredient {
  name: string
  quantity: number
  unit: string
}

interface FormRecipe {
  name: string
  imageUrl: string
  instructions: string
  description: string
  servings: string
  rating: number // This should be deleted
  time: number
  userId: number
  tags: {name: string}[]
  ingredients: Ingredient[]
}

const Form = () => {
  const { register, control, handleSubmit, formState: {errors} } 
    = useForm<FormRecipe>({
      defaultValues: {
        ingredients: [{name: '', quantity: 0, unit: ''}],
        tags: [{ name: ''}]
      },
      mode: 'onBlur'
  })

  const { user } = useContext(AppContext)

  const { fields: iFields, append: iAppend, remove: iRemove } = useFieldArray({
    name: 'ingredients',
    control
  })

  const { fields: tFields, append: tAppend, remove: tRemove } = useFieldArray({
    name: 'tags',
    control
  })

  const onSubmit = (data: FormRecipe) => {
    console.log(user)
    if (!user) return console.log('Falta user!!!!') 
    data.userId = user?.id
    data.rating = 4
    data.imageUrl = 'https://seabreezemackay.com.au/shared/content/uploads/IMG_0206-2048x1365.jpg'
    // const splitInstr = data.instructions.replace(/\n/gi, '').trim().split('#')
    axios.post('/api/newRecipe', data)
      .then(res => console.log(res))
      .catch(err => console.error(err))

    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-prose mx-auto'>
      <label
        htmlFor='name'
        className='uppercase inline-block mb-2 text-gray-700'
      >
        Nombre de la receta
      </label>
      <input
        type='text'
        id='name'
        placeholder='Pollo frito'
        {...register('name')}
        className={TEXTAREA_STYLES}
      />

      <label
        htmlFor='description'
        className='uppercase inline-block mb-2 text-gray-700'
      >
        Descripci??n
      </label>
      <textarea
        id='description'
        placeholder='descripci??n'
        rows={2}
        {...register('description', { maxLength: 255 })}
        className={TEXTAREA_STYLES}
      />

      <label className='block'>Raciones
        <input type='number' id='servings' placeholder='4' {...register('servings')} ></input>
      </label>

      <label className='block'>Tiempo total de elaboraci??n (en minutos)
        <input type='number' id='time' placeholder='30' {...register('time')} ></input>
      </label>

      <label
        className='uppercase inline-block mb-2 text-gray-700'
      >
        Tags
      </label>
      {tFields.map((field, index) => {
        return (
          <div key={field.id}>
            <label >{index}
            <input
              placeholder={'tag'}
              className={INPUT_STYLES}
              {...register(`tags.${index}.name` as const, { required: true })}
              />
            </label>
            <button type='button' className={DEL_BUTTON_STYLES} onClick={() => tRemove(index)}>Eliminar</button>
          </div>
        )
      })}
      <button
        type='button'
        onClick={() => tAppend({})}
        className={ADD_BUTTON_STYLES}
      >
        A??adir tag
      </button>

      <label
        className='uppercase inline-block mb-2 text-gray-700'
      >
        Ingredientes
      </label>
      {iFields.map((field, index) => {
        return (
        <div key={field.id} >
          <label className='block'>Ingrediente
          <input
            placeholder='pollo'
            className={INPUT_STYLES}
            {...register(`ingredients.${index}.name` as const, { required: true })}
            defaultValue={field.name}
          /></label>

          <label className='block'>Cantidad
          <input
            placeholder='200'
            className={INPUT_STYLES}
            {...register(`ingredients.${index}.quantity` as const, { required: true })}
            type="number"
            defaultValue={field.quantity}
          /></label>

          <label className='block'>Unidad
          <input
            placeholder='gramos'
            className={INPUT_STYLES}
            {...register(`ingredients.${index}.unit` as const, { required: true })}
            defaultValue={field.unit}
          /></label>
          <button type='button' className={DEL_BUTTON_STYLES} onClick={() => iRemove(index)}>Eliminar</button>
        </div>
        )
      })
      }
      <button
        type='button'
        onClick={() => iAppend({})}
        className={ADD_BUTTON_STYLES}
      >
        A??adir ingrediente
      </button>

      <label
        className='uppercase block mb-2 text-gray-700'
      >
        Instrucciones
      <textarea
        id='instructions'
        placeholder='Instrucciones'
        rows={10}
        {...register('instructions')}
        className={TEXTAREA_STYLES}
      />
      </label>

      <button
        type='submit'
        className='bg-sky-400 mt-3 rounded px-3 py-1'
      >
        Guardar
      </button>
    </form>
  )
}

const INPUT_STYLES = 'inline-block ml-4 px-3 py-1.5 border-gray-200 border-2'

const ADD_BUTTON_STYLES = 'block bg-lime-300 px-2 py-1.5 rounded'

const DEL_BUTTON_STYLES = 'inline-block bg-orange-400 px-2 py-1.5 rounded'

const TEXTAREA_STYLES = `
  block
  w-full
  px-3
  py-1.5
  text-base
  font-normal
  text-gray-700
  bg-white bg-clip-padding
  border border-solid border-gray-300
  rounded
  transition
  ease-in-out
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
`