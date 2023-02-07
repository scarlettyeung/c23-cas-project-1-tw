import type { Request, Response } from "express"
import { EventService } from "../service/eventService"
import { logger } from "../utils/logger"
import { form } from "../main"
import jwtSimple from "jwt-simple"
import jwt from "../utils/jwt"
import { Bearer } from "permit"
import formidable from "formidable"

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
        console.dir(files)
        if (!files["cardImage"]) {
          return res.status(400).json({ message: "[uploadImage] missing file" })
        } else {
          if (!fields.title || !fields.wage_offer || !fields.rehearsal_needed) {
            res.status(400).json({ message: "Missing Information!" })
            return
          }
          logger.info("createEvent in line 40")
          const permit = new Bearer({ query: "access_token" })
          const token = permit.check(req)
          const payload = jwtSimple.decode(token, jwt.jwtSecret)
          const clients_id = payload.clientId
          const start_time = new Date(fields.start_time as string)
          const end_time = new Date(fields.end_time as string)
          const image = files.cardImage as formidable.File | undefined

          console.log(clients_id)
          console.log(fields.title)
          console.log(fields.wage_offer)
          console.log(fields.start_date)
          console.log(fields.end_date)
          console.log(start_time)
          console.log(end_time)
          console.log(fields.rehearsal_needed)
          console.log(fields.description)
          console.log(fields.location)

          await this.eventService.createEvent(
            clients_id,
            fields.title as string,
            Number(fields.wage_offer) as number,
            new Date(fields.start_date as string),
            new Date(fields.end_date as string),
            start_time,
            end_time,
            Boolean(fields.rehearsal_needed as any),
            image?.newFilename,
            fields.description as string,
            fields.location as string
          )

          logger.info("createEvent in line 63")
          return res.status(200).json({ message: "Create Event Success!" })
        }
      })
    } catch (e) {
      logger.info(e)
      res.status(400).json({ message: "Create Event Fail" })
      return
    }
  }

  applyEvent = async (req: Request, res: Response) => {
    try {
      const eventIdUrl = parseInt(req.params.eventsId)
      const permit = new Bearer({ query: "access_token" })
      const token = permit.check(req)
      const payload = jwtSimple.decode(token, jwt.jwtSecret)
      const performers_id = payload.performerId

      await this.eventService.applyEvent(eventIdUrl, performers_id)
      res.status(200).json({
        message: "Apply event success!",
      })
      return
    } catch (e) {
      logger.info(e)
      res.status(400).json({ message: "Fail to apply events!" })
      return
    }
  }

  getApplicationHistory = async (req: Request, res: Response) => {
    try {
      return
    } catch (e) {
      logger.info(e)
      res.status(400).json({ message: "Load Event Application fail!" })
      return
    }
  }

  getReviewsForEventData = async (req: Request, res: Response) => {
    try {
      const eventsIdReq = Number(req.params.eventsId)
      const reviewData = await this.eventService.getReviewsForEvent(eventsIdReq)

      res.status(200).json({
        message: "Load reviews for event success!",
        reviewData,
      })
      return
    } catch (e) {
      logger.info(e)
      res.status(400).json({ message: "Load reviews for event fail!" })
      return
    }
  }

  getReviewsForAllUsersData = async (req: Request, res: Response) => {
    try {
      const userIdReq = Number(req.params.userId)

      const reviewData = await this.eventService.getAllReviewsForAllUsers(
        userIdReq
      )
      res.status(200).json({
        message: "Load reviews for event success!",
        reviewData,
      })
      return
    } catch (e) {
      logger.info(e)
      res.status(400).json({ message: "Load reviews for event fail!" })
      return
    }
  }
}
