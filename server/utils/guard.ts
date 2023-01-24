import jwt from "./jwt"
import jwtSimple from "jwt-simple"
import Express from "express"
import { userService } from "../routes"
import { Bearer } from "permit"
import { logger } from "./logger"

const permit = new Bearer({ query: "access_token" })

export async function isLoggedIn(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  try {
    const token = permit.check(req)
    logger.info("isLoggedIn called")
    if (!token) {
      return res
        .status(401)
        .json({ msg: "cannot find token , Permission Denied" })
    }
    const payload = jwtSimple.decode(token, jwt.jwtSecret)

    // is not compulsory
    const user = await userService.getUserByUUID(payload.uuid)
    if (user) {
      logger.info("isLoggedIn checked , do next function")
      return next()
    } else {
      return res.status(401).json({ msg: "Permission Denied" })
    }
  } catch (error) {
    return res.status(401).json({ msg: "Permission Denied" })
  }
}

export async function checkTokenExp(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  try {
    const token = permit.check(req)
    if (!token) {
      return res
        .status(401)
        .json({ msg: "cannot find token , Permission Denied" })
    }
    const payload = jwtSimple.decode(token, jwt.jwtSecret)

    const exp: Date = new Date(payload.exp)
    const now = new Date(new Date().setTime(new Date().getTime()))

    logger.info("exp :") //2023-01-17
    logger.info(exp)
    logger.info("now :") //2023-01-17
    logger.info(now)

    if (exp > now) {
      logger.info("JWT not yet expired")
      // keep doing something
      return next()
    } else {
      logger.info("JWT expired")

      return res
        .status(401)
        .json({ msg: "login session expired, place login again" })
    }
  } catch (error) {
    return res.status(401).json({ msg: "Permission Denied" })
  }
}

export async function tokenExpUpdate(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  try {
    logger.info("in token Exp Update function")
    const token = permit.check(req)
    if (!token) {
      return res.status(401).json({ msg: "Permission Denied" })
    }
    const payload = jwtSimple.decode(token, jwt.jwtSecret)
    // is not compulsory

    const newExp = new Date(
      new Date().setTime(new Date().getTime() + 5 * 60 * 1000)
    )
    payload.exp = newExp
    // should do something
    return next()
  } catch (error) {
    return res.status(400).json({ msg: "Token update fail" })
  }
}
