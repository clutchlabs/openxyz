import connectMongo from '../../../../../lib/connectMongo'
import User from '../../../../../models/user'



export default async function openxyz(req, res) {
  if (req.method === 'POST') {
    // const session = await getLoginSession(req)
    await connectMongo()

    const email = 'muzzamilmushtaq1@gmail.com'
    // Get the game_key and game_secret from the request URL
    const { game_key, game_secret } = req.query

    // Find the user in the database
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    // Find the game with the specified game_key and game_secret
    const game = user.games.find(
      (g) => g.gameKey === game_key && g.gameSecret === game_secret
    )
    if (!game) {
      return res.status(401).json({ error: 'Game not found' })
    }

    // Add the progression event to the game's progressions array
    const {
      progressionStatus,
      progression01,
      progression02,
      progression03,
      score,
    } = req.body
    const progressionEvent = {
      progressionStatus,
      progression01,
      progression02,
      progression03,
      score,
      timestamp: Date.now()
    }
    game.progressions.push(progressionEvent)

    // Update the user's games array in the database
    await User.updateOne({ email }, { $set: { games: user.games } })

    // Return the updated game object
    res.status(200).json({ game })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
