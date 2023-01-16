import express from "express"
import { userController } from "../routes"

export const userRoutes = express.Router()
userRoutes.post("/login", userController.login)
userRoutes.post("/getUser", userController.get_user)
