import { getLoginSession } from '../../lib/auth'
import connectMongo from '../../lib/connectMongo'
import User from '../../models/user'

export default async function user(req, res) {
  const session = await getLoginSession(req)
  await connectMongo()
  const user = await User.findOne({ email: session?.email })
  if (!user) {
    await User.create({ ...session })
  }
  // After getting the session you may want to fetch for the user instead
  // of sending the session's payload directly, this example doesn't have a DB
  // so it won't matter in this case

  res.status(200).json({ user: user || session || null })
}
