import dotenv from "dotenv"
import express from "express"
import { logger } from "./utils/logger"
import cors from "cors"
dotenv.config()

const app = express()

app.use(cors())

app.use((req, res, next) => {
  logger.debug(`Path: ${req.path},,, Method: ${req.method}`)
  next()
})

app.get("/test", async (req, res) => {
    res.json({ message: "hi" });
  });

const PORT = process.env.PORT ?? 8080
app.listen(PORT, () => logger.info(`Listening at http://localhost:${PORT}`))
