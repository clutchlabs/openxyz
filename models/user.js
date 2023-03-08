import { Schema, model, models } from 'mongoose'

// Define a schema for the progression event
const progressionSchema = new Schema({
  status: { type: String, required: true },
  progression01: { type: String, required: true },
  progression02: { type: String },
  progression03: { type: String },
  score: { type: Number },
  fields: { type: Object },
  timestamp: { type: Date, required: true, default: Date.now },
})

// Define a schema for the game
const gameSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  bannerInfo: { type: String, required: true },
  gameKey: { type: String, required: true },
  gameSecret: { type: String, required: true },
  progressions: [progressionSchema],
})

// Define a schema for the user
const userSchema = new Schema({
  issuer: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  publicAddress: { type: String, required: true },
  createdAt: { type: Number, required: true },
  maxAge: { type: Number, required: true },
  games: [gameSchema],
})

const User = models.User || model('User', userSchema)

export default User