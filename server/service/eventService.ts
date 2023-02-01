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

  async applyEvent(events_id: number, performers_id: number) {
    try {
      logger.info("Apply Event in EventService")
      await prisma.eventsApplication.create({
        data: {
          events_id: events_id,
          performers_id: performers_id,
          status: "pending",
        },
      })
      await prisma.$disconnect()
      return
    } catch (e) {
      logger.info("in service")
      logger.debug(e)
      await prisma.$disconnect()
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
    image: string | undefined,
    description: string,
    location: string
  ) {
    try {
      logger.info("createEvent in EventService")
      const now = new Date()
      await prisma.event.create({
        data: {
          clients_id: clients_id,
          title: title,
          wage_offer: wage_offer,
          start_date: start_date,
          end_date: end_date,
          start_time: start_time,
          end_time: end_time,
          rehearsal_needed: rehearsal_needed,
          image: image,
          description: description,
          location: location,
          status: "valid",
          properties: "public",
          is_shown: true,
          date_published: now,
        },
      })
      await prisma.$disconnect()
      return
    } catch (e) {
      logger.info("in service")
      logger.debug(e)
      await prisma.$disconnect()
      return
    }
  }
  async getReviewsForEvent(eventsId: number) {
    try {
      const review = await prisma.event.findUnique({
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
      await prisma.$disconnect()
      return review
    } catch (e) {
      logger.info(e)
      await prisma.$disconnect()
      return
    }
  }
  async getAllReviewsForAllUsers(userId: number) {
    try {
      const review = await prisma.review.findMany({
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
      await prisma.$disconnect()
      return review
    } catch (e) {
      logger.info(e)
      await prisma.$disconnect()
      return
    }
  }
}
