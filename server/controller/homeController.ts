import type { Request, Response } from "express"
import { HomeService } from "../service/homeService"
import { logger } from "../utils/logger"

export class HomeController {
  constructor(private homeService: HomeService) {}

  getAllEvents = async (req: Request, res: Response) => {
    try {
      const events = await this.homeService.getAllEvents()
      res.status(200).json({ message: "Load events success!", events: events })
      return
    } catch (e) {
      logger.info(e)
      res.status(400).json({ message: "Load events fail" })
      return
    }
  }
}
