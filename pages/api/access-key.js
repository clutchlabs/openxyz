import { v4 as uuidv4 } from 'uuid'
import { getLoginSession } from '../../lib/auth'
import connectMongo from '../../lib/connectMongo'
import User from '../../models/user'

export default async function user(req, res) {
  const session = await getLoginSession(req)
  await connectMongo()
  const user = await User.findOneAndUpdate(
    { email: session?.email },
    { apiKKey: uuidv4() },
    { new: true }
  )
  res.status(200).json({ user: user || null })
}
