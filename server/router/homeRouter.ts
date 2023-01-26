import express from "express"
import { homeController } from "../routes"

export const homeRoutes = express.Router()
homeRoutes.get("/", homeController.getAllEvents)
