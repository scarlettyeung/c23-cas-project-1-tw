import { PrismaClient } from "@prisma/client"
import { logger } from "../utils/logger"

export class HistoryService {
  constructor(private prisma: PrismaClient) {}

  async applicationHistory(id: number) {
    try {
      const loadHistory = await this.prisma.eventsApplication.findMany({
        where: {
          id: id,
        },
        select: {
          events: {},
        },
      })
      await this.prisma.$disconnect()
      return loadHistory
    } catch (e) {
      logger.info(e)
      await this.prisma.$disconnect()
      return
    }
  }
}
