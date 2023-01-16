import type { Request, Response } from "express"
import { UserService } from "../service/userService"
import { logger } from "../utils/logger"

export class UserController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
    try {
      logger.info("login function call in UserController")
      const { username, password } = req.body
      if (!username || !password) {
        res.status(400).json({ message: "missing username or password" })
      }

      const user = await this.userService.checkLogin(username, password)
      if (user) {
        res.status(200).json({ message: "success" })
      } else {
        res.status(400).json({ message: "Invalid email or password" })
      }
    } catch (e) {
      logger.error(e)
    }
  }
}
