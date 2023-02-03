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
      const Id = payload.clientId
      const applicationHistory =
        await this.historyService.clientApplicationHistory(Id)
      res.status(200).json({
        applicationHistory,
        message: "Get Application History Success!",
      })
      return
    } catch (e) {
      logger.info(e)
      res.status(400).json({ message: "Load Application History Fail!!" })
      return
    }
  }
}
