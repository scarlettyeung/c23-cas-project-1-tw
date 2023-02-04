import { PrismaClient } from "@prisma/client"
import { logger } from "../utils/logger"

export class HistoryService {
  constructor(private prisma: PrismaClient) {}

  async performerApplicationHistory(PerformerId: number) {
    try {
      const data = await this.prisma.eventsApplication.findMany({
        where: {
          performers_id: PerformerId,
        },
        select: {
          events: {
            select: {
              id: true,
              title: true,
              status: true,
              image: true,
            },
          },
        },
      })
      const loadPerformerHistory = data.map((info) => {
        return {
          id: info.events.id,
          title: info.events.title,
          status: info.events.status,
          image: info.events.image,
        }
      })
      const events = {
        events: loadPerformerHistory,
      }
      return events
    } catch (e) {
      logger.info(e)
      return
    }
  }

  async clientApplicationHistory(ClientId: number) {
    try {
      const loadHistory = await this.prisma.client.findUnique({
        where: {
          id: ClientId,
        },
        select: {
          events: {
            select: {
              id: true,
              title: true,
              status: true,
              events_applications: {
                select: {
                  id: true,
                  status: true,
                  performers: {
                    select: {
                      users: {
                        select: {
                          id: true,
                          uuid: true,
                          username: true,
                          icon: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })

      // const userScore = await this.prisma.review.aggregate({
      //   _avg: {
      //     score: true,
      //   },
      //   where: {
      //     users_id: loadHistory[0].performers.users.id,
      //   },
      // })

      // const userAvgScore = { avg_score: 0 }
      // if (userScore._avg.score) {
      //   userAvgScore.avg_score = userScore._avg.score
      // }

      // const userData = {
      //   ...loadHistory,
      //   avg_score: userAvgScore.avg_score,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // } as any

      return loadHistory
    } catch (e) {
      logger.info(e)
      return
    }
  }
}
