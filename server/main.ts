import dotenv from "dotenv"
dotenv.config()

import express from "express"
import { logger } from "./utils/logger"
import cors from "cors"
import { PrismaClient } from "@prisma/client"
export const prismaClient: PrismaClient = new PrismaClient()
import { routes } from "./routes"
import formidable from "formidable"
import fs from "fs"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)
app.use(express.static("./uploads"))

// formidable
const uploadDir = "./uploads"
fs.mkdirSync(uploadDir, { recursive: true })

let counter = 0
export const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFields: 30,
  maxFieldsSize: 2000 * 1024 ** 2, // the default limit is 200 KB
  filter: (part) => part.mimetype?.startsWith("image/") || false,
  filename: (originalName, originalExt, part, form) => {
    counter++
    const fieldName = part.name
    const timestamp = Date.now()
    const ext = part.mimetype?.split("/").pop()
    return `${fieldName}-${timestamp}-${counter}.${ext}`
  },
})

app.use(express.static("./uploads"))

app.use((req, res, next) => {
  logger.debug(`Path: ${req.path},,, Method: ${req.method}`)
  next()
})

app.get("/test", async (req, res) => {
  res.json({ message: "hi" })
})

const PORT = process.env.PORT ?? 8080
app.listen(PORT, () => logger.info(`Listening at http://localhost:${PORT}`))
