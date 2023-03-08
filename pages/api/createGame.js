import { v4 as uuidv4 } from 'uuid'
import { getLoginSession } from '../../lib/auth'
import connectMongo from '../../lib/connectMongo'
import User from '../../models/user'

export default async function user(req, res) {
  console.log('the body is', req.body)

  const session = await getLoginSession(req)
  await connectMongo()

  // const user = await User.findOne({ email: session.email });

  const user = await User.findOneAndUpdate(
    {
      email: session.email,
    },
    {
      $push: {
        games: {
          ...req.body,
          gameKey: uuidv4(),
          gameSecret: uuidv4(),
          progressions: [],
        },
      },
    },
    { new: true }
  )
    .lean()
    .exec()

  // console.log("user ", user);

  res.status(200).json({ user: user || null })

  // res.status(200).json({ user: user || null })
}
