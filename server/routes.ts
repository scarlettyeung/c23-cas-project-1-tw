import express from "express"

import { UserService } from "./service/UserService"
import { UserController } from "./controller/UserController"
import { HomeService } from "./service/homeService"
import { HomeController } from "./controller/homeController"

export const userService = new UserService()
export const userController = new UserController(userService)
export const homeService = new HomeService()
export const homeController = new HomeController(homeService)

import { userRoutes } from "./router/userRouter"
import { homeRoutes } from "./router/homeRouter"

export const routes = express.Router()

routes.use("/users", userRoutes)
routes.use("/home", homeRoutes)
