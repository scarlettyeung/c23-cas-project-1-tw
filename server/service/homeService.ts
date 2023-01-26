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

  async getAllPerformers() {
    try {
      const performers = await prisma.user.findMany({
        where: {
          identity: "performer",
        },
        select: {
          id: true,
          uuid: true,
          username: true,
          icon: true,
        },
        take: 10,
      })
      await prisma.$disconnect()
      logger.info(performers)
      return performers
    } catch (e) {
      logger.info(e)
      await prisma.$disconnect()
      return
    }
  }
}
