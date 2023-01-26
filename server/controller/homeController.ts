import type { Request, Response } from "express"
import { HomeService } from "../service/homeService"
import { logger } from "../utils/logger"

export class HomeController {
  constructor(private homeService: HomeService) {}

  getAllHomeData = async (req: Request, res: Response) => {
    try {
      const events = await this.homeService.getAllEvents()
      const performers = await this.homeService.getAllPerformers()
      res
        .status(200)
        .json({
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
}
