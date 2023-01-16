// import { checkPassword } from "../utils/hash"
import { logger } from "../utils/logger"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class UserService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async getLoginInfo(email: string) {
    try {
      const user = await prisma.users.findFirst({
        where: {
          email: email,
        },
        select: {
          id: true,
          uuid: true,
          username: true,
          email: true,
          password: true,
          identity: true,
        },
      })
      logger.info("getLoginInfo call in UserService")

      await prisma.$disconnect()
      // if (user && (await checkPassword(Password, user.password))) {
      return user
      // } else {
      //   return
      // }
    } catch (e) {
      logger.debug(e)
      await prisma.$disconnect()
      return
    }
  }

  async getUserByEmail(Email: string) {
    logger.info("getUserEmail call in UserService")

    const userEmail = await prisma.users.findMany({
      where: {
        email: Email,
      },
      select: {
        email: true,
      },
    })

    return userEmail
  }

  async getUserByUUID(uuid: string) {
    logger.info("getUserByUUID call in UserService")

    const userUUID = await prisma.users.findMany({
      where: {
        uuid: uuid,
      },
      select: {
        uuid: true,
      },
    })

    return userUUID
  }
}
