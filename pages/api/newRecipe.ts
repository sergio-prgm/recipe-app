import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

const API = 'http://localhost:5194/new'
// TODO save info in Cookie
// TODO API: return user info alongside jwt
export default async function handler(
  req: NextApiRequest,
  res: any
) {
  const {data} = await axios.post(API, req.body)
  console.log(data)
  
  return res.status(200).json(data)
}
