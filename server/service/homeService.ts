import { PrismaClient, TagType } from "@prisma/client"
// import { PrismaClient, TagType } from "@prisma/client"
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

  async getAllTags(type: TagType, tagName: string) {
    try {
      const tags = await prisma.hashtagDetail.findMany({
        where: {
          tag_type: type,
          name: tagName,
        },
        select: {
          performers_hashtags: {
            select: {
              performers_id: true,
              performers: {
                select: {
                  users: {
                    select: { id: true, icon: true, username: true },
                  },
                },
              },
            },
          },
          events_hashtags: {
            select: {
              events_id: true,
              events: {
                select: {
                  id: true,
                  title: true,
                  image: true,
                  venue_image_name: true,
                },
              },
            },
          },
        },
      })
      await prisma.$disconnect()
      return tags
    } catch (e) {
      logger.info(e)
      await prisma.$disconnect()
      return
    }
  }
}
