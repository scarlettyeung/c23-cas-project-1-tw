import { checkPassword } from "../utils/hash"
import { logger } from "../utils/logger"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class UserService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async checkLogin(Email: string, Password: string) {
    try {
      const user = await prisma.users.findFirst({
        where: {
          email: Email,
        },
        select: {
          id: true,
          username: true,
          password: true,
        },
      })

      await prisma.$disconnect()
      logger.info("checkLogin call in UserService", user)
      if (user && (await checkPassword(Password, user.password))) {
        return user
      } else {
        return
      }
    } catch (e) {
      logger.debug(e)
      await prisma.$disconnect()
      return
    }
  }
}
