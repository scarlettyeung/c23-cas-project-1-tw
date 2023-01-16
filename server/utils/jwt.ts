import dotenv from "dotenv"
dotenv.config()

if (!process.env.SECRET) {
  throw new Error(".env SECRET not provided")
}

export default {
  jwtSecret: process.env.SECRET,
  jwtSession: {
    session: false,
  },
}
