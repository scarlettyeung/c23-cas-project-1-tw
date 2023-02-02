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
          performers_id: true,
          status: true,
          events_id: true,
          events: {
            select: {
              id: true,
              performers_id: true,
              clients_id: true,
              title: true,
              wage_offer: true,
              start_date: true,
              end_date: true,
              start_time: true,
              end_time: true,
              image: true,
              status: true,
              location: true,
            },
          },
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
