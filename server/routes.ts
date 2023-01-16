import express from "express"

import { UserService } from "./service/UserService"
import { UserController } from "./controller/UserController"

const userService = new UserService()
export const userController = new UserController(userService)

import { userRoutes } from "./router/userRouter"

export const routes = express.Router()

routes.use("/users", userRoutes)
