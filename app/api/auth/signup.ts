import { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import { hash } from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Missing fields' })
  }

  const exists = await kv.get(`user:${email}`)
  if (exists) {
    return res.status(400).json({ message: 'User already exists' })
  }

  try {
    const hashedPassword = await hash(password, 12)
    const user = {
      id: Date.now().toString(),
      email,
      name,
      hashedPassword
    }

    await kv.set(`user:${email}`, user)

    res.status(200).json({ message: 'User created successfully' })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ message: 'Error creating user' })
  }
}