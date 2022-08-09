// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const API = 'http://localhost:5194/login'
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
export default async function handler(
  req: NextApiRequest,
  res: any
) {
  const {name, email, password} = req.body

  const {data} = await axios.post(API, {name, email, password})
  console.log(data)
  
  return res.status(200).json(data)
}
