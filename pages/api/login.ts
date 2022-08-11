// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const API = 'http://localhost:5194/login'
// TODO save info in Cookie
// TODO API: return user info alongside jwt
export default async function handler(
  req: NextApiRequest,
  res: any
) {
  const {name, email, password} = req.body

  const {data} = await axios.post(API, {name, email, password})
  console.log(data)
  
  return res.status(200).json(data)
}
