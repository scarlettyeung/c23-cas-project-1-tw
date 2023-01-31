import type { Request, Response } from "express"
import { EventService } from "../service/eventService"
import { logger } from "../utils/logger"
import { form } from "../main"
import jwtSimple from "jwt-simple"
import jwt from "../utils/jwt"
import { Bearer } from "permit"

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

  createEvent = async (req: Request, res: Response) => {
    try {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          res.status(400).json({ message: "[uploadImage] Fail" })
          return
        }
        if (!files["image"]) {
          res.status(400).json({ message: "[uploadImage] missing file" })
        } else {
          if (!fields.title || !fields.wage_offer || !fields.rehearsal_needed) {
            res.status(400).json({ message: "Missing Information!" })
            return
          }
          const permit = new Bearer({ query: "access_token" })
          const token = permit.check(req)
          const payload = jwtSimple.decode(token, jwt.jwtSecret)
          const clients_id = payload.clientId

          await this.eventService.createEvent(
            clients_id,
            fields.title as string,
            +fields.wage_offer as number,
            new Date(fields.start_date as string),
            new Date(fields.end_date as string),
            fields.start_time as string,
            fields.end_time as string,
            fields.rehearsal_needed as any,
            files.image[0]?.newFilename as string,
            fields.description as string,
            fields.location as string
          )
        }
        res.status(200).json({ message: "Create Event Success!" })
      })
      return
    } catch (e) {
      logger.info("in controller")
      logger.info(e)
      res.status(400).json({ message: "Create Event Fail" })
      return
    }
  }
}
