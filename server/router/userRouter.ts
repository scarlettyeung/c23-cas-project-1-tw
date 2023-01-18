import express from "express"
import { userController } from "../routes"
import { isLoggedIn, checkTokenExp } from "../utils/guard"

export const userRoutes = express.Router()
userRoutes.post("/login", userController.login)
userRoutes.post("/forTest", isLoggedIn, checkTokenExp, userController.forTest)
//Apart from login  , place add checkTokenExp and isLoggedIn
