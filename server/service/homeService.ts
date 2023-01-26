import { PrismaClient } from "@prisma/client"
import { logger } from "../utils/logger"

const prisma = new PrismaClient()

export class HomeService {
  constructor() {}

  async getAllEvents() {
    try {
      const events = await prisma.event.findMany({
        where: {
          is_shown: true,
          status: "valid",
        },
        take: 10,
      })
      await prisma.$disconnect()
      return events
    } catch (e) {
      logger.info(e)
      await prisma.$disconnect()
      return
    }
  }
}
