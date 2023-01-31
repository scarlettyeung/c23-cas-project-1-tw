import type { Request, Response } from "express"
import { EventService } from "../service/eventService"
import { logger } from "../utils/logger"

export class EventController {
  constructor(private eventService: EventService) {}

  getEventDetail = async (req: Request, res: Response) => {
    try {
      const eventIdUrl = parseInt(req.params.eventsId)
      const eventDetail = await this.eventService.getEventDetail(eventIdUrl)
      res.status(200).json(eventDetail)
      return
    } catch (e) {
      logger.info(e)
      res.status(400).json({ message: "Load event detail fail" })
      return
    }
  }
}
