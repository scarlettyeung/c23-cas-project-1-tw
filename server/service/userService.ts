import { logger } from "../utils/logger"
import { PrismaClient, Identity, ClientType, Gender } from "@prisma/client"

const prisma = new PrismaClient()

export class UserService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  async getLoginInfo(email: string) {
    try {
      const user = await prisma.user.findFirst({
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

      return user
    } catch (e) {
      logger.debug(e)
      await prisma.$disconnect()
      return
    }
  }

  async getUserByEmail(email: string) {
    logger.info("getUserEmail call in UserService")

    const userEmail = await prisma.user.findMany({
      where: {
        email: email,
      },
      select: {
        email: true,
      },
    })

    return userEmail
  }

  async getUserByUUID(uuid: string) {
    logger.info("getUserByUUID call in UserService")

    const userUUID = await prisma.user.findMany({
      where: {
        uuid: uuid,
      },
      select: {
        uuid: true,
      },
    })

    return userUUID
  }

  async checkEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        email: true,
      },
    })

    return user?.email
  }

  async createPerformer(
    identitySelect: Identity,
    icon: string | null, // should give the default icon to display
    email: string,
    password: string,
    username: string,
    years_of_exp: number,
    birthday: Date | null,
    contact_number: number,
    gender: Gender,
    description: string | null,
    name: string | null,
    facebook_url: string | null,
    twitter_url: string | null,
    youtube_url: string | null,
    ig_url: string | null,
    hashtagArr: number[]
  ) {
    logger.info("createPerformer call in UserService")
    interface hashtagToInput {
      hashtag_details_id: number;
    }
    const hashtagToInput: hashtagToInput[] = []

    for (const hashtag of hashtagArr) {
      const id: hashtagToInput = { hashtag_details_id: hashtag }
      hashtagToInput.push(id)
    }



    await prisma.user.create({
      data: {
        identity: identitySelect, //not null
        icon: icon,
        email: email, //not null
        password: password, //not null
        username: username, //not null
        performers: {
          create: {
            years_of_exp: years_of_exp, //not null >> 0
            birthday: birthday,
            contact_number: contact_number, //not null
            gender: gender, //not null
            description: description,
            name: name,
            facebook_url: facebook_url,
            twitter_url: twitter_url,
            youtube_url: youtube_url,
            ig_url: ig_url,
            performers_hashtags: {
              createMany: {
                data:
                  hashtagToInput
              }
            }
          },
        },

      },
    })
  }


  async createIndividualClient(
    identitySelect: Identity,
    icon: string | null,
    email: string,
    password: string,
    username: string,
    client_type: ClientType,
    name: string,
    gender: Gender,
    contact_number: number,
    contact_email: string | null
  ) {
    logger.info("createIndividualClient call in UserService")

    await prisma.user.create({
      data: {
        identity: identitySelect, //not null
        icon: icon,
        email: email, //not null
        password: password, //not null
        username: username, //not null
        clients: {
          create: {
            client_type: client_type, //not null
            name: name, //not null
            gender: gender, //not null
            contact_number: contact_number, //not null
            contact_email: contact_email, // default = email
          },
        },
      },
    })
  }
  async createCorporateClient(
    identitySelect: Identity,
    icon: string | null,
    email: string,
    password: string,
    username: string,
    client_type: ClientType,
    name: string,
    gender: Gender,
    contact_number: number,
    contact_email: string | null,
    business_address: string,
    business_BR_no: string,
    business_website_url: string | null
  ) {
    logger.info("createCorporateClient call in UserService")

    await prisma.user.create({
      data: {
        identity: identitySelect, //not null
        icon: icon,
        email: email, //not null
        password: password, //not null
        username: username, //not null
        clients: {
          create: {
            client_type: client_type, //not null
            name: name, //not null
            gender: gender, //not null
            contact_number: contact_number, //not null
            contact_email: contact_email,
            business_address: business_address, //not null
            business_BR_no: business_BR_no, //not null
            business_website_url: business_website_url,
          },
        },
      },
    })
  }

}
