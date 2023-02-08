import { PrismaClient } from "@prisma/client"
import { logger } from "../utils/logger"

export class EventService {
  constructor(private prisma: PrismaClient) {}

  async getEventDetail(Id: number) {
    try {
      const eventDetail = await this.prisma.event.findUnique({
        where: {
          id: Id,
        },
      })
      // await this.prisma.$disconnect()
      return eventDetail
    } catch (e) {
      logger.info(e)
      // await this.prisma.$disconnect()
      return
    }
  }

  async applyEvent(events_id: number, performers_id: number) {
    try {
      logger.info("Apply Event in EventService")
      await this.prisma.eventsApplication.create({
        data: {
          events_id: events_id,
          performers_id: performers_id,
          status: "pending",
        },
      })
      // await this.prisma.$disconnect()
      return
    } catch (e) {
      logger.info("in service")
      logger.debug(e)
      // await this.prisma.$disconnect()
      return
    }
  }

  async createEvent(
    clients_id: number,
    title: string,
    wage_offer: number,
    start_date: Date,
    end_date: Date,
    start_time: Date,
    end_time: Date,
    rehearsal_needed: any,
    cardImage: string | undefined,
    description: string,
    location: string
  ) {
    try {
      logger.info("createEvent in EventService")
      const now = new Date()
      await this.prisma.event.create({
        data: {
          clients_id: clients_id,
          title: title,
          wage_offer: wage_offer,
          start_date: start_date,
          end_date: end_date,
          start_time: start_time,
          end_time: end_time,
          rehearsal_needed: rehearsal_needed,
          image: cardImage,
          description: description,
          location: location,
          status: "valid",
          properties: "public",
          is_shown: true,
          date_published: now,
          events_hashtags: {
            create: [{ hashtag_details_id: 35 }],
          },
        },
      })

      // await this.prisma.$disconnect()
      return
    } catch (e) {
      logger.info("in service")
      logger.debug(e)
      // await this.prisma.$disconnect()
      return
    }
  }
  async getReviewsForEvent(eventsId: number) {
    try {
      const review = await this.prisma.event.findUnique({
        where: {
          id: eventsId,
        },
        select: {
          clients: {
            select: {
              users: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
          performers: {
            select: {
              users: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
          reviews: {
            select: {
              users_id: true,
              comments_content: true,
              score: true,
            },
          },
        },
      })
      // await this.prisma.$disconnect()
      return review
    } catch (e) {
      logger.info(e)
      // await this.prisma.$disconnect()
      return
    }
  }
  async getAllReviewsForAllUsers(userId: number) {
    try {
      const review = await this.prisma.review.findMany({
        where: {
          users_id: userId,
        },
        select: {
          comments_content: true,
          score: true,
          users: {
            select: {
              id: true,
              username: true,
            },
          },
          events: {
            select: {
              title: true,
              clients: {
                select: {
                  users: {
                    select: {
                      username: true,
                    },
                  },
                },
              },
            },
          },
        },
      })
      // await this.prisma.$disconnect()
      return review
    } catch (e) {
      logger.info(e)
      // await this.prisma.$disconnect()
      return
    }
  }
}
