import express from "express"
import { userController } from "../routes"
// import { isLoggedIn, checkTokenExp, tokenExpUpdate } from "../utils/guard"
import { isLoggedIn } from "../utils/guard"

export const userRoutes = express.Router()

userRoutes.post("/login", userController.login)
userRoutes.post("/createUser", userController.createUser)

//test rout
// userRoutes.post("/forTest", isLoggedIn, checkTokenExp, userController.forTest)
// userRoutes.post(
//   "/forTestExpUpdate",
//   isLoggedIn,
//   checkTokenExp,
//   tokenExpUpdate,
//   userController.forTest
// )

// get user info
userRoutes.get("/getInfo/:uuid", isLoggedIn, userController.getUserinfo)

// get user setting info
userRoutes.get("/getSettingInfo", isLoggedIn, userController.getUserSettingInfo)
userRoutes.put("/editInfo", isLoggedIn, userController.editUserSettingInfo)
userRoutes.get(
  "/getPerformerHashtag",
  userController.getAllPerformerHashtagData
)

// get user e-Profile
userRoutes.get("/eProfile/:uuid/get", isLoggedIn, userController.getEProfile)
userRoutes.put("/eProfile/:uuid/edit", isLoggedIn, userController.editEProfile)

userRoutes.get(
  "/getAllTag",
  isLoggedIn,
  userController.getAllPerformerHashtagData
)

//Apart from login  , place add checkTokenExp and isLoggedIn , tokenExpUpdate where should I give the new token or payload
