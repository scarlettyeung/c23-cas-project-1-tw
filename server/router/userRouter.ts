import express from "express"
import { userController } from "../routes"
import { isLoggedIn, checkTokenExp, tokenExpUpdate } from "../utils/guard"

export const userRoutes = express.Router()
userRoutes.post("/login", userController.login)
userRoutes.post("/createUser", userController.createUser)
userRoutes.post("/forTest", isLoggedIn, checkTokenExp, userController.forTest)
userRoutes.post(
  "/forTestExpUpdate",
  isLoggedIn,
  checkTokenExp,
  tokenExpUpdate,
  userController.forTest
)
userRoutes.get("/getInfo/:uuid", isLoggedIn, userController.getUserinfo)
userRoutes.get("/editInfo/:uuid", isLoggedIn, userController.getUserinfo)
//Apart from login  , place add checkTokenExp and isLoggedIn
