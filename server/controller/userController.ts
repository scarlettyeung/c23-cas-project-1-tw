// import type { Request, Response } from "express"
// import { UserService } from "../service/userService"

// export class UserController {
//   constructor(private userService: UserService) {}

//   login = async (req: Request, res: Response) => {
//     const { username, password } = req.body
//     if (!username || !password) {
//       res.json({ message: "warn username or password" })
//     }

//     const user = await this.userService.checkLogin(username, password)

//     res.json({ message: "success" })
//   }
// }
