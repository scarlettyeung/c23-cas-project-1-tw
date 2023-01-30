import express from "express"
import { eventController } from "../routes"
import { isLoggedIn } from "../utils/guard"

export const eventRoutes = express.Router()
eventRoutes.get("/:eventsId", isLoggedIn, eventController.getEventDetail)
