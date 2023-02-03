import express from "express"
import { historyController } from "../routes"
import { isLoggedIn } from "../utils/guard"

export const historyRoutes = express.Router()
historyRoutes.get(
  "/application",
  isLoggedIn,
  historyController.getApplicationHistory
)
