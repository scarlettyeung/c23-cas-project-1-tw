import express from "express"
import { eventController } from "../routes"
import { isLoggedIn } from "../utils/guard"

export const eventRoutes = express.Router()
eventRoutes.get("/:eventsId", isLoggedIn, eventController.getEventDetail)
eventRoutes.post("/createEvents", isLoggedIn, eventController.createEvent)
eventRoutes.get(
  "/:eventsId/detail/EventReview",
  isLoggedIn,
  eventController.getReviewsForEventData
)
eventRoutes.get(
  "/:eventsId/detail/UserReview/:userId",
  isLoggedIn,
  eventController.getReviewsForAllUsersData
)
