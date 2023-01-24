import type { Request, Response } from "express"
import { UserService } from "../service/UserService"
import { logger } from "../utils/logger"
import jwtSimple from "jwt-simple"
import jwt from "../utils/jwt"
import { checkPassword, hashPassword } from "../utils/hash"
import { ClientType, Identity } from "@prisma/client"
import { Bearer } from "permit"

export class UserController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
    try {
      logger.info("login function call in UserController")
      const { email, password } = req.body
      logger.info(email)
      logger.info(password)

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
        logger.info(`the user is : ${user?.username}`)
        const exp = new Date(
          new Date().setTime(new Date().getTime() + 5 * 60 * 1000)
        )

        // after 5 min
        interface Payload {
          uuid: string
          username: string
          identity: Identity
          clientType: undefined | ClientType
          exp: Date
        }
        const payload: Payload = {
          uuid: user.uuid,
          username: user.username,
          identity: user.identity,
          clientType: undefined,
          exp: exp,
        }

        if (user.clients[0]) {
          payload.clientType = user.clients[0].client_type
        }

        logger.info("payload is :")
        console.dir(payload)
        const token = jwtSimple.encode(payload, jwt.jwtSecret)
        logger.info(`Token send ,will exp in : ${payload.exp}`)
        res.status(200).json({ message: "login success", data: token })
      }
    } catch (e) {
      logger.error(e)
      res.status(500).json({ message: "login fail" })
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

  forTest = async (req: Request, res: Response) => {
    try {
      logger.info("Testing")

      res.status(200).json({ message: "Hi user! you a login " })
    } catch (e) {
      logger.error(e)
      res.status(500).json({ message: "internal server error" })
    }
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const {
        identitySelect,
        icon,
        email,
        password,
        username,
        years_of_exp,
        birthday,
        client_type,
        contact_number,
        gender,
        description,
        name,
        facebook_url,
        twitter_url,
        youtube_url,
        ig_url,
        contact_email,
        business_address,
        business_BR_no,
        business_website_url,
        hashtagArr,
      } = await req.body

      //// --- to check the info --- ////
      const findEmail = await this.userService.checkEmail(email)
      if (findEmail != undefined) {
        logger.info("find email")
        logger.info(findEmail)
        res.status(400).json({ message: "email already use" })
        return
      }

      let setExpYear = 0
      if (years_of_exp) {
        setExpYear = years_of_exp
      }

      let setEmail: string
      if (contact_email === null) {
        setEmail = email
        logger.info("can not find contact_email , setEmail is ")
        logger.info(setEmail)
        logger.info(email)
      } else {
        setEmail = await contact_email
        logger.info("find contact_email , setEmail is ")
        logger.info(email)
        logger.info(setEmail)
      }

      const setBirthday: Date = new Date(birthday)

      const setPassword: string = await hashPassword(password)

      //// --- end of check info --- ////

      if (identitySelect === "performer") {
        // to check is not null?
        if (
          !identitySelect ||
          !email ||
          !password ||
          !username ||
          !contact_number ||
          !gender
        ) {
          res
            .status(400)
            .json({ message: "User create performer fail , missing info !" })
          return
        }

        await this.userService.createPerformer(
          identitySelect,
          icon,
          email,
          setPassword,
          username,
          setExpYear,
          setBirthday,
          contact_number,
          gender,
          description,
          name,
          facebook_url,
          twitter_url,
          youtube_url,
          ig_url,
          hashtagArr
        )

        res.status(200).json({ message: "User performer create!" })
        return
      } else if (identitySelect === "client") {
        if (client_type === "individual") {
          if (
            !identitySelect ||
            !email ||
            !password ||
            !username ||
            !contact_number ||
            !gender
          ) {
            res.status(400).json({
              message: "User create individual client fail , missing info !",
            })
            return
          }
          await this.userService.createIndividualClient(
            identitySelect,
            icon,
            email,
            setPassword,
            username,
            client_type,
            name,
            gender,
            contact_number,
            setEmail
          )
          res.status(200).json({ message: "User individual client  create!" })
          return
        } else if (client_type === "corporate") {
          if (
            !identitySelect ||
            !email ||
            !password ||
            !username ||
            !contact_number ||
            !gender ||
            !business_address ||
            !business_BR_no
          ) {
            res.status(400).json({
              message: "User create corporate client fail , missing info !",
            })
            return
          }

          await this.userService.createCorporateClient(
            identitySelect,
            icon,
            email,
            setPassword,
            username,
            client_type,
            name,
            gender,
            contact_number,
            setEmail,
            business_address,
            business_BR_no,
            business_website_url
          )
          res.status(200).json({ message: "User corporate client create!" })
          return
        } else {
          res.status(400).json({ message: "client type missing!" })
          return
        }
      } else {
        res.status(400).json({ message: "create user fail" })
        return
      }
    } catch (e) {
      logger.error(e)
      res.status(500).json({ message: "createUser fail" })
      return
    }
  }

  getUserinfo = async (req: Request, res: Response) => {
    try {
      logger.info("Testing")
      const uuidFromUrl = req.params.uuid
      logger.info("uuid from url")
      logger.info(uuidFromUrl)
      const permit = new Bearer({ query: "access_token" })
      const token = permit.check(req)
      const payload = jwtSimple.decode(token, jwt.jwtSecret)
      const uuidFromJWT = payload.uuid
      if (uuidFromUrl != uuidFromJWT) {
        res.status(400).json({ message: "unauthorized edit" })
      }

      // const uuid = await req.body.uuid
      // const Identity = await req.body.Identity
      // const info = await this.userService
      res.status(200).json({ message: "get user info " })
    } catch (e) {
      logger.error(e)
      res.status(400).json({ message: "err user id" })
      return
    }
  }

  editUserinfo = async (req: Request, res: Response) => {
    logger.info("edit User info")
    const uuidFromUrl = req.params.uuid
    logger.info("uuid from url")
    logger.info(uuidFromUrl)
    const permit = new Bearer({ query: "access_token" })
    const token = permit.check(req)
    const payload = jwtSimple.decode(token, jwt.jwtSecret)
    const uuidFromJWT = payload.uuid
    if (uuidFromUrl != uuidFromJWT) {
      res.status(400).json({ message: "unauthorized edit" })
    }
  }
}
