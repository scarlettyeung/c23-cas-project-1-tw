import { PrismaClient } from "@prisma/client"
import { logger } from "../utils/logger"

const prisma = new PrismaClient()

export class EventService {
  constructor() {}

  async getEventDetail(id: number) {
    try {
      const eventDetail = await prisma.event.findUnique({
        where: {
          id: id,
        },
      })
      await prisma.$disconnect()
      return eventDetail
    } catch (e) {
      logger.info(e)
      await prisma.$disconnect()
      return
    }
  }
}
