import type { Request, Response } from "express"
import { UserService } from "../service/UserService"
import { logger } from "../utils/logger"
import jwtSimple from "jwt-simple"
import jwt from "../utils/jwt"
import { checkPassword } from "../utils/hash"

export class UserController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
    try {
      logger.info("login function call in UserController")
      const { email, password } = req.body

      if (!email || !password) {
        res.status(400).json({ message: "missing email or password" })
        return
      }

      const user = await this.userService.getLoginInfo(email)

      if (!user) {
        res.status(400).json({ message: "Invalid email or password" })
        return
      } else {
        const result = await checkPassword(password, user.password)
        if (!result) {
          res.status(400).json({ message: "wrong password" })
          return
        }

        const payload = {
          uuid: user.uuid,
          username: user.username,
          identity: user.identity,
        }

        const token = jwtSimple.encode(payload, jwt.jwtSecret)

        res.status(200).json({ message: "login success", data: token })
      }
    } catch (e) {
      logger.error(e)
    }
  }

  get_user = async (req: Request, res: Response) => {
    try {
      const { email } = req.body
      const userResult = await this.userService.getUserByEmail(email)

      if (userResult.length > 0) {
        res.json({ message: "found user", data: userResult })
        return
      } else {
        res.status(400).json({ message: "no such user" })
      }
    } catch (e) {
      logger.error(e)
      res.status(500).json({ message: "internal server error" })
    }
  }
}
