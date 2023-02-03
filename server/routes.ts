import express from "express"
import { prismaClient } from "./main"
import { UserService } from "./service/userService"
import { UserController } from "./controller/userController"
import { HomeService } from "./service/homeService"
import { HomeController } from "./controller/homeController"
import { EventService } from "./service/eventService"
import { EventController } from "./controller/eventController"
import { HistoryService } from "./service/historyService"
import { HistoryController } from "./controller/historyController"

export const userService = new UserService(prismaClient)
export const userController = new UserController(userService)
export const homeService = new HomeService(prismaClient)
export const homeController = new HomeController(homeService)
export const eventService = new EventService(prismaClient)
export const eventController = new EventController(eventService)
export const historyService = new HistoryService(prismaClient)
export const historyController = new HistoryController(historyService)

import { userRoutes } from "./router/userRouter"
import { homeRoutes } from "./router/homeRouter"
import { eventRoutes } from "./router/eventRouter"
import { historyRoutes } from "./router/historyRouter"

export const routes = express.Router()

routes.use("/users", userRoutes)
routes.use("/home", homeRoutes)
routes.use("/events", eventRoutes)
routes.use("/history", historyRoutes)
