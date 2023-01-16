import dotenv from "dotenv"
dotenv.config()

import express from "express"
import { logger } from "./utils/logger"
import cors from "cors"
import { routes } from "./routes"

const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)

app.use((req, res, next) => {
  logger.debug(`Path: ${req.path},,, Method: ${req.method}`)
  next()
})

app.get("/test", async (req, res) => {
  res.json({ message: "hi" })
})

const PORT = process.env.PORT ?? 8080
app.listen(PORT, () => logger.info(`Listening at http://localhost:${PORT}`))
