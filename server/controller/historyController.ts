import type { Request, Response } from "express"
import { HistoryService } from "../service/historyService"
import { logger } from "../utils/logger"
import jwtSimple from "jwt-simple"
import jwt from "../utils/jwt"
import { Bearer } from "permit"

export class HistoryController {
  constructor(private historyService: HistoryService) {}

  getApplicationHistory = async (req: Request, res: Response) => {
    try {
      const permit = new Bearer({ query: "access_token" })
      const token = permit.check(req)
      const payload = jwtSimple.decode(token, jwt.jwtSecret)
      const clientId = payload.clientId
      const performerId = payload.performerId
      let applicationHistory
      if (clientId) {
        applicationHistory = await this.historyService.clientApplicationHistory(
          clientId
        )
      }
      if (performerId) {
        applicationHistory =
          await this.historyService.performerApplicationHistory(performerId)
      }

      res.status(200).json({
        message: "Get Application History Success!",
        applicationHistory: applicationHistory,
      })
      return
    } catch (e) {
      logger.info(e)
      res.status(400).json({ message: "Load Application History Fail!!" })
      return
    }
  }
}
