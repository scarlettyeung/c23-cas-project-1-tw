import { TagType } from "@prisma/client"
import type { Request, Response } from "express"
import { HomeService } from "../service/homeService"
import { logger } from "../utils/logger"
import { Event } from "../utils/model/home"

export class HomeController {
  constructor(private homeService: HomeService) {}

  getAllHomeData = async (req: Request, res: Response) => {
    try {
      const events = (await this.homeService.getAllEvents()) as Event[]
      const performers = await this.homeService.getAllPerformers()
      logger.info(events)
      res.status(200).json({
        message: "Load events and performers success!",
        events: events,
        performers: performers,
      })
      return
    } catch (e) {
      logger.info(e)
      res.status(400).json({ message: "Load events and performers fail" })
      return
    }
  }

  getAllHashTags = async (req: Request, res: Response) => {
    try {
      const searchHashTag = req.query.tag_type as string as TagType
      const searchTagName = req.query.tag_name as string
      const hashtags = await this.homeService.getAllTags(
        searchHashTag,
        searchTagName
      )
      res.status(200).json({
        message: "Load hashtags success!",
        hashtags,
      })
      console.log(hashtags)
      return
    } catch (e) {
      logger.info(e)
      res.status(400).json({ message: "Load events and performers fail" })
      return
    }
  }
}
