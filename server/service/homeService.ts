import { PrismaClient, TagType } from "@prisma/client"
import { logger } from "../utils/logger"

export class HomeService {
  constructor(private prisma: PrismaClient) {}

  async getAllEvents() {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          is_shown: true,
          status: "valid",
        },
        select: {
          id: true,
          title: true,
          image: true,
          description: true,
          performers_id: true,
          clients_id: true,
          wage_offer: true,
          start_date: true,
          end_date: true,
          location: true,
          events_hashtags: {
            select: {
              hashtag_details: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          id: "desc",
        },
      })

      const mapEventHashTags = events.map((event) => {
        const mapName = event.events_hashtags.map((name) => {
          console.log(name.hashtag_details.name)
          return name.hashtag_details.name
        })
        const cloneObj = { ...event } as any
        delete cloneObj.events_hashtags
        return { ...cloneObj, hashtag_details: mapName[0] }
      })
      return mapEventHashTags
    } catch (e) {
      logger.info(e)
      return
    }
  }

  async getAllPerformers() {
    try {
      const performers = await this.prisma.user.findMany({
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
      // await this.prisma.$disconnect()
      logger.info(performers)
      return performers
    } catch (e) {
      logger.info(e)
      // await this.prisma.$disconnect()
      return
    }
  }

  async getAllTags(type: TagType, tagName: string) {
    try {
      const tags = await this.prisma.hashtagDetail.findMany({
        where: {
          tag_type: type,
          name: tagName,
        },
        select: {
          name: true,
          performers_hashtags: {
            select: {
              performers_id: true,
              performers: {
                select: {
                  users: {
                    select: {
                      id: true,
                      icon: true,
                      username: true,
                      uuid: true,
                    },
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
      console.dir(tags)
      // await this.prisma.$disconnect()
      return tags
    } catch (e) {
      logger.info(e)
      // await this.prisma.$disconnect()
      return
    }
  }
}
