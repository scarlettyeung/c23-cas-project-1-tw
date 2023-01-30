import express from "express"

import { UserService } from "./service/UserService"
import { UserController } from "./controller/UserController"
import { HomeService } from "./service/homeService"
import { HomeController } from "./controller/homeController"
import { EventService } from "./service/eventService"
import { EventController } from "./controller/eventController"

export const userService = new UserService()
export const userController = new UserController(userService)
export const homeService = new HomeService()
export const homeController = new HomeController(homeService)
export const eventService = new EventService()
export const eventController = new EventController(eventService)

import { userRoutes } from "./router/userRouter"
import { homeRoutes } from "./router/homeRouter"
import { eventRoutes } from "./router/eventRouter"

export const routes = express.Router()

routes.use("/users", userRoutes)
routes.use("/home", homeRoutes)
routes.use("/event", eventRoutes)
