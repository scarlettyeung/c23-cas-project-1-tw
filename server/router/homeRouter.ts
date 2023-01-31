import express from "express"
import { homeController } from "../routes"
import { isLoggedIn } from "../utils/guard"

export const homeRoutes = express.Router()
homeRoutes.get("/", isLoggedIn, homeController.getAllHomeData)
homeRoutes.get("/hashtags", isLoggedIn, homeController.getAllHashTags)
