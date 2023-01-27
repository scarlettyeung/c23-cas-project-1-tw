import type { Request, Response } from "express"
import { UserService } from "../service/UserService"
import { logger } from "../utils/logger"
import jwtSimple from "jwt-simple"
import jwt from "../utils/jwt"
import { checkPassword, hashPassword } from "../utils/hash"
import { Payload } from "../utils/guard"
import { Bearer } from "permit"
import { ClientType } from "@prisma/client"

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
        logger.info(`the user is : ${user?.username}`)
        const exp = new Date(
          new Date().setTime(new Date().getTime() + 5 * 60 * 1000)
        )
        logger.info("performersID,clientId")
        let performersId: number | undefined = undefined
        let clientId: number | undefined = undefined
        let clientType: ClientType | undefined = undefined
        if (user.performers[0]) {
          performersId = user.performers[0].id
        }

        if (user.clients[0]) {
          clientId = user.clients[0].id
          clientType = user.clients[0].client_type
        }

        // after 5 min
        logger.info("line44")
        console.dir(performersId)
        console.dir(clientId)
        console.dir(clientType)

        // const clientType = user.clients[0].client_type

        const payload: Payload = {
          uuid: user.uuid,
          username: user.username,
          identity: user.identity,
          performerId: performersId,
          clientId: clientId,
          clientType: clientType,
          exp: exp,
        }
        logger.info("line54")
        if (user.clients[0]) {
          payload.clientType = user.clients[0].client_type
        }

        logger.info("payload is :")
        console.dir(payload)
        const token = jwtSimple.encode(payload, jwt.jwtSecret)
        logger.info(`Token send ,will exp in : ${payload.exp}`)
        res.status(200).json({ message: "login success", data: token })
        return
      }
    } catch (e) {
      logger.error(e)
      res.status(500).json({ message: "login fail" })
      return
    }
  }

  get_user = async (req: Request, res: Response) => {
    try {
      const { email } = req.body
      const userResult = await this.userService.getUserByEmail(email)
      if (userResult && userResult.length > 0) {
        res.json({ message: "found user", data: userResult })
        return
      } else {
        res.status(400).json({ message: "no such user" })
        return
      }
    } catch (e) {
      logger.error(e)
      res.status(500).json({ message: "internal server error" })
      return
    }
  }

  forTest = async (req: Request, res: Response) => {
    try {
      logger.info("===========================")
      logger.info("==========Testing==========")
      logger.info("===========================")

      const payloadFromRes = res.locals.payload
      if (payloadFromRes) {
        logger.info("the payload is ")
        console.dir(payloadFromRes)
      }

      const newToken = res.locals.token
      logger.info("get the newToken !!")
      console.dir(newToken)

      return res
        .status(200)
        .json({ message: "Hi user! you a login ", token: newToken })
    } catch (e) {
      logger.error(e)
      res.status(500).json({ message: "internal server error" })
      return
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
        yearsOfExp,
        birthday,
        clientType,
        contactNumber,
        gender,
        description,
        name,
        facebookUrl,
        twitterUrl,
        youtubeUrl,
        igUrl,
        contactEmail,
        businessAddress,
        businessBRNo,
        businessWebsiteUrl,
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
      if (yearsOfExp) {
        setExpYear = yearsOfExp
      }

      let setIcon = "icon"
      if (icon) {
        setIcon = icon
      }

      let setEmail: string
      if (contactEmail === null) {
        setEmail = email
        logger.info("can not find contactEmail , setEmail is ")
        logger.info(setEmail)
        logger.info(email)
      } else {
        setEmail = await contactEmail
        logger.info("find contactEmail , setEmail is ")
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
          // !contactEmail ||
          !gender
        ) {
          res
            .status(400)
            .json({ message: "User create performer fail , missing info !" })
          return
        }
        if (hashtagArr.length < 1) {
          res.status(400).json({
            message: "User create performer fail , missing hashtag !",
          })
          return
        }

        await this.userService.createPerformer(
          identitySelect,
          setIcon,
          email,
          setPassword,
          username,
          setExpYear,
          setBirthday,
          contactNumber,
          gender,
          description,
          name,
          facebookUrl,
          twitterUrl,
          youtubeUrl,
          igUrl,
          hashtagArr
        )

        res.status(200).json({ message: "User performer create!" })
        return
      } else if (identitySelect === "client") {
        if (clientType === "individual") {
          if (
            !identitySelect ||
            !email ||
            !password ||
            !username ||
            !contactNumber ||
            !gender
          ) {
            res.status(400).json({
              message: "User create individual client fail , missing info !",
            })
            return
          }
          await this.userService.createIndividualClient(
            identitySelect,
            setIcon,
            email,
            setPassword,
            username,
            clientType,
            name,
            gender,
            contactNumber,
            setEmail
          )
          res.status(200).json({ message: "User individual client  create!" })
          return
        } else if (clientType === "corporate") {
          if (
            !identitySelect ||
            !email ||
            !password ||
            !username ||
            !contactNumber ||
            !gender ||
            !businessAddress ||
            !businessBRNo
          ) {
            res.status(400).json({
              message: "User create corporate client fail , missing info !",
            })
            return
          }

          await this.userService.createCorporateClient(
            identitySelect,
            setIcon,
            email,
            setPassword,
            username,
            clientType,
            name,
            gender,
            contactNumber,
            setEmail,
            businessAddress,
            businessBRNo,
            businessWebsiteUrl
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
      logger.info("getUserinfo")
      const uuidFromUrl = req.params.uuid
      logger.info("uuid from url")
      logger.info(uuidFromUrl)
      let data
      // need check the Individual ro type first
      const identity = (await this.userService.getUserIdentity(uuidFromUrl))
        ?.identity

      logger.info("Your identity is ")
      if (identity === "performer") {
        data = await this.userService.getPerformersProfilePageInfo(uuidFromUrl)
      } else if (identity === "client") {
        const clientType = (await this.userService.getClientType(
          uuidFromUrl
        ))![0].clients[0].client_type
        logger.info("Your clientType is ", clientType)
        if (clientType === "individual") {
          data = await this.userService.getIndividualClientInfoPageInfo(
            uuidFromUrl
          )
          logger.info(data)
          logger.info("get Individual info ")
        } else if (clientType === "corporate") {
          data = await this.userService.getCorporateClientInfoPageInfo(
            uuidFromUrl
          )
          logger.info(data)
          logger.info("get Corporate info ")
        } else {
          logger.info("can't find clientType")
          res.status(400).json({ message: "can't find user" })
          return
        }
      } else {
        logger.info("can't find identity")
        res.status(400).json({ message: "can't find user" })
        return
      }

      logger.info("get data at Controller")
      // const uuid = await req.body.uuid
      // const Identity = await req.body.Identity
      // const info = await this.userService
      res.status(200).json({ message: "get user info ", data })
      return
    } catch (e) {
      logger.error(e)
      res.status(400).json({ message: "err user id" })
      return
    }
  }

  getUserSettingInfo = async (req: Request, res: Response) => {
    try {
      logger.info("getUserSettingInfo call")
      const permit = new Bearer({ query: "access_token" })
      const token = permit.check(req)
      const payload = jwtSimple.decode(token, jwt.jwtSecret)
      logger.info(`Access token, the payload is `)
      console.dir(payload)
      const identity = payload.identity
      const clientType = payload.clientType
      const uuid = payload.uuid
      let data
      if (identity === "performer") {
        logger.info("You are performer")
        data = await this.userService.getPerformersSettingPageInfo(uuid)
      } else if (identity === "client") {
        if (clientType === "individual") {
          logger.info("You are individual client")
          data = await this.userService.getIndividualClientInfoPageInfo(uuid)
        } else if (clientType === "corporate") {
          logger.info("You are corporate client")
          data = await this.userService.getCorporateClientInfoPageInfo(uuid)
        } else {
          logger.info("who are u Unauthorized")
          res.status(401).json({ message: "Unauthorized " })
          return
        }
      } else {
        logger.info("who are u Unauthorized")
        res.status(401).json({ message: "Unauthorized " })
        return
      }
      console.dir(data)
      if (data) {
        res.status(200).json({ message: "getUserSettingInfo", data })
        return
      } else {
        res.status(200).json({ message: "err to get user info" })
        return
      }
    } catch (e) {
      logger.error(e)
      res.status(401).json({ message: "Unauthorized " })
      return
    }
  }

  editUserSettingInfo = async (req: Request, res: Response) => {
    try {
      logger.info("edit User setting info")
      const permit = new Bearer({ query: "access_token" })
      const token = permit.check(req)
      const payload = jwtSimple.decode(token, jwt.jwtSecret)
      console.dir(payload)
      const uuid = payload.uuid
      const identity = payload.identity
      const clientType = payload.clientType

      const {
        icon,
        oldPassword,
        newPassword,
        username,
        yearsOfExp,
        birthday,
        contactNumber,
        gender,
        description,
        name,
        facebookUrl,
        twitterUrl,
        youtubeUrl,
        igUrl,
        hashtagArr,
        contactEmail,
        businessAddress,
        businessBRNo,
        businessWebsiteUrl,
      } = req.body

      //// --- to check the info --- ////

      let setExpYear = 0
      if (yearsOfExp) {
        setExpYear = yearsOfExp
      }

      let setEmail: string
      if (!contactEmail) {
        const userEmail = await this.userService.getUserEmail(uuid)
        logger.info("userEmail?.email is ")
        logger.info(userEmail?.email)
        if (userEmail?.email) {
          setEmail = await userEmail?.email
          logger.info("can not find contact_email , setEmail is ")
          logger.info(setEmail)
        }
      } else {
        setEmail = contactEmail
      }

      let setIcon = "icon"
      if (icon) {
        setIcon = icon
      }
      logger.info("businessAddress, businessBRNo, businessWebsiteUrl")
      logger.info(businessAddress, businessBRNo, businessWebsiteUrl)
      const setBirthday: Date = new Date(birthday)
      const userPassword = await this.userService.getPassword(uuid)

      if (userPassword) {
        const result = await checkPassword(oldPassword, userPassword)
        logger.info("checkPassword result the result is")
        logger.info(result)
        if (!result) {
          res.status(400).json({ message: "wrong password" })
          return
        }
      } else {
        res.status(400).json({ message: "wrong password" })
        return
      }
      const setPassword: string = await hashPassword(newPassword)

      //// --- end of check info --- ////

      if (identity === "performer") {
        if (hashtagArr.length < 1) {
          res.status(400).json({
            message: "User edit performer fail , missing hashtag !",
          })
          return
        }
        await this.userService.editPerformersSettingInfo(
          uuid,
          setIcon,
          setPassword,
          username,
          setExpYear,
          setBirthday,
          contactNumber,
          gender,
          description,
          name,
          facebookUrl,
          twitterUrl,
          youtubeUrl,
          igUrl,
          hashtagArr
        )
        res.status(200).json({ message: "edit performer setting info done" })
        return
      } else if (identity === "client") {
        if (clientType === "individual") {
          res
            .status(200)
            .json({ message: "edit individual client setting info done" })
          return
        } else if (clientType === "corporate") {
          res
            .status(200)
            .json({ message: "edit corporate client setting info done" })
          return
        } else {
          res.status(400).json({ message: "client's unauthorized edit" })
          return
        }
      } else {
        res.status(400).json({ message: "performer's unauthorized edit" })
        return
      }
      res.status(400).json({ message: "unauthorized edit in line 522" })
      return
    } catch (e) {
      logger.error(e)
      res.status(400).json({ message: "unauthorized edit" })
      return
    }
  }

  getEProfile = async (req: Request, res: Response) => {
    try {
      logger.info("get User EProfile")
      const uuidFromUrl = req.params.uuid
      logger.info(uuidFromUrl)

      const identity = (await this.userService.getUserIdentity(uuidFromUrl))
        ?.identity

      if (identity != "performer") {
        res.status(400).json({ message: "can find User EProfile" })
        return
      }

      const eProfileInfo = (await this.userService.getEProfile(uuidFromUrl))
        ?.performers[0].e_profile[0].content

      console.dir(eProfileInfo)

      res
        .status(200)
        .json({ message: "get User EProfile", eProfileInfo: eProfileInfo })
      return
    } catch (e) {
      logger.error(e)
      res.status(400).json({ message: "unauthorized edit" })
      return
    }
  }

  editEProfile = async (req: Request, res: Response) => {
    try {
      logger.info("edit User EProfile")
      const uuidFromUrl = req.params.uuid
      const permit = new Bearer({ query: "access_token" })
      const token = permit.check(req)
      const payload = jwtSimple.decode(token, jwt.jwtSecret)
      const uuidFromJWT = payload.uuid
      logger.info("uuid from url and JWT")
      logger.info(uuidFromUrl)
      logger.info(uuidFromJWT)
      if (uuidFromUrl != uuidFromJWT) {
        res.status(400).json({ message: "unauthorized edit" })
        return
      }
      const editGetFromRes = req.body.toEdit

      // const editJsonFile = JSON.stringify(editGetFromRes)
      // logger.info("editGetFromRes")
      // console.dir(editGetFromRes, { depth: null })
      // logger.info("editJsonFile")
      // logger.info(editJsonFile)

      const eProfileInfo = await this.userService.editEProfile(
        uuidFromJWT,
        editGetFromRes
      )
      res
        .status(200)
        .json({ message: "edit User EProfile", eProfileInfo: eProfileInfo })
      return
    } catch (e) {
      logger.error(e)
      res.status(400).json({ message: "unauthorized edit" })
      return
    }
  }
}
