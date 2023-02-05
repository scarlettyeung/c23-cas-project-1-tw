import express from "express"
import { userController } from "../routes"
// import { isLoggedIn, checkTokenExp, tokenExpUpdate } from "../utils/guard"
import { isLoggedIn } from "../utils/guard"

export const userRoutes = express.Router()

userRoutes.post("/login", userController.login)
userRoutes.post("/createUser", userController.createUser)

//test rout
// userRoutes.post("/forTest", isLoggedIn, checkTokenExp, userController.forTest)
userRoutes.post("/forTest", userController.forTest)
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
userRoutes.get("/eProfile/uuid/:uuid/get", userController.getEProfile)
userRoutes.put(
  "/eProfile/uuid/:uuid/edit",
  isLoggedIn,
  userController.editEProfile
)

userRoutes.get(
  "/getAllTag",
  isLoggedIn,
  userController.getAllPerformerHashtagData
)
// userRoutes.get("/getAllEmail", userController.getAllEmailData)
//Apart from login  , place add checkTokenExp and isLoggedIn , tokenExpUpdate where should I give the new token or payload
// get user phone number
userRoutes.get(
  "/contact/:uuid",
  isLoggedIn,
  userController.getContactNumberData
)
