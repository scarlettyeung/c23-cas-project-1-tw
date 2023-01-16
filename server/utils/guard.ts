import jwt from "./jwt"
import jwtSimple from "jwt-simple"
import Express from "express"
import { userService } from "../routes"
import { Bearer } from "permit"

const permit = new Bearer({ query: "access_token" })

export async function isLoggedIn(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  try {
    const token = permit.check(req)
    if (!token) {
      return res.status(401).json({ msg: "Permission Denied" })
    }
    const payload = jwtSimple.decode(token, jwt.jwtSecret)
    // is not compulsory
    const user = await userService.getUserByUUID(payload.uuid)
    if (user) {
      // const { password, ...others } = user
      // req.user = { ...others }
      return next()
    } else {
      return res.status(401).json({ msg: "Permission Denied" })
    }
  } catch (error) {
    return res.status(401).json({ msg: "Permission Denied" })
  }
}
