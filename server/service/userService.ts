import { logger } from "../utils/logger"
import {
  PrismaClient,
  Prisma,
  Identity,
  ClientType,
  Gender,
} from "@prisma/client"

const prisma = new PrismaClient()

export class UserService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  //////--- part of check user info--- ////
  async getLoginInfo(email: string) {
    try {
      logger.info("getLoginInfo call in UserService")
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
          clients: {
            select: {
              client_type: true,
            },
          },
        },
      })
      logger.info("get login info in UserService ")
      logger.info(user)
      await prisma.$disconnect()
      // return
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
    await prisma.$disconnect()
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
    await prisma.$disconnect()
    return userUUID
  }

  async getUserIdentity(uuid: string) {
    logger.info("getUserIdentity call in UserService")
    logger.info("in UserService uuid is ")
    logger.info(uuid)
    try {
      const userIdentity = await prisma.user.findFirst({
        where: {
          uuid: uuid,
          // id: 2,
        },
        select: {
          identity: true,
        },
      })

      logger.info("in UserService userIdentity is ")
      // logger.info(userIdentity)
      console.dir(userIdentity)
      await prisma.$disconnect()
      return userIdentity
    } catch (e) {
      logger.debug(e)
      await prisma.$disconnect()
      return
    }
  }

  async getClientType(uuid: string) {
    logger.info("getUserIdentity call in UserService")

    const clientType = await prisma.user.findMany({
      where: {
        uuid: uuid,
      },
      select: {
        clients: {
          select: {
            client_type: true,
          },
        },
      },
    })
    await prisma.$disconnect()
    return clientType
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
    await prisma.$disconnect()
    return user?.email
  }
  //////--- end of check user info--- ////

  //////--- part of Register--- ////
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
    interface HashtagToInput {
      hashtag_details_id: number
    }
    const hashtagToInput: HashtagToInput[] = []

    for (const hashtag of hashtagArr) {
      const id: HashtagToInput = { hashtag_details_id: hashtag }
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
                data: hashtagToInput,
              },
            },
            e_profile: {
              create: {
                content: Prisma.JsonNull,
              },
            },
          },
        },
      },
    })

    await prisma.$disconnect()
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

    await prisma.$disconnect()
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

    await prisma.$disconnect()
  }
  //////--- end of Register --- ////

  //////--- part of showProfile Info --- ////

  async getPerformersProfilePageInfo(uuid: string) {
    logger.info("get Performers Info call in UserService")
    const info = await prisma.user.findUnique({
      where: {
        uuid: uuid,
      },
      select: {
        uuid: true,
        id: true,
        icon: true,
        username: true,
        performers: {
          select: {
            years_of_exp: true,
            contact_number: true,
            gender: true,
            description: true,
            facebook_url: true,
            twitter_url: true,
            youtube_url: true,
            ig_url: true,
            performers_hashtags: {
              select: {
                hashtag_details_id: true,
              },
            },
            events: {
              select: {
                title: true,
              },
            },
            teams_performers: {
              select: {
                teams: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    await prisma.$disconnect()
    return info
  }

  async getIndividualClientInfoPageInfo(uuid: string) {
    logger.info("get Individual Client Info call in UserService")

    const info = await prisma.user.findUnique({
      where: {
        uuid: uuid,
      },
      select: {
        uuid: true,
        id: true,
        icon: true,
        username: true,
        clients: {
          select: {
            gender: true,
            description: true,
            client_type: true,
            events: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    })

    logger.info(info)
    logger.info("get info in UserService")
    await prisma.$disconnect()
    return info
  }

  async getCorporateClientInfoPageInfo(uuid: string) {
    const info = await prisma.user.findUnique({
      where: {
        uuid: uuid,
      },
      select: {
        uuid: true,
        id: true,
        icon: true,
        username: true,
        clients: {
          select: {
            gender: true,
            description: true,
            client_type: true,
            business_address: true,
            business_BR_no: true,
            business_website_url: true,
            events: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    })

    await prisma.$disconnect()
    return info
  }
  //////--- end of showProfile Info --- ////

  //////--- part of setting page (Profile) Info --- ////
  async getPerformersSettingPageInfo(uuid: string) {
    logger.info("get Performers Setting Info, call in UserService")
    const userInfo = await prisma.user.findUnique({
      where: {
        uuid: uuid,
      },
      select: {
        uuid: true,
        id: true,
        icon: true,
        username: true,
        email: true,
        password: true,
        identity: true,
        performers: {
          select: {
            years_of_exp: true,
            birthday: true,
            contact_number: true,
            gender: true,
            name: true,
            description: true,
            facebook_url: true,
            twitter_url: true,
            youtube_url: true,
            ig_url: true,
            performers_hashtags: {
              select: {
                hashtag_details_id: true,
              },
            },
            teams_performers: {
              select: {
                teams: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    await prisma.$disconnect()
    return userInfo
  }

  async getIndividualClientSettingPageInfo(uuid: string) {
    logger.info("get Individual Client Setting Info, call in UserService")
    const userInfo = await prisma.user.findUnique({
      where: {
        uuid: uuid,
      },
      select: {
        uuid: true,
        id: true,
        icon: true,
        username: true,
        email: true,
        password: true,
        identity: true,
        clients: {
          select: {
            name: true,
            gender: true,
            contact_number: true,
            contact_email: true,
            description: true,
            client_type: true,
          },
        },
      },
    })

    await prisma.$disconnect()
    return userInfo
  }

  async getCorporateClientSettingPageInfo(uuid: string) {
    logger.info("get Corporate Client Setting Page call in UserService")
    const userInfo = await prisma.user.findUnique({
      where: {
        uuid: uuid,
      },
      select: {
        uuid: true,
        id: true,
        icon: true,
        username: true,
        email: true,
        password: true,
        identity: true,
        clients: {
          select: {
            name: true,
            gender: true,
            contact_number: true,
            contact_email: true,
            description: true,
            client_type: true,
            business_address: true,
            business_BR_no: true,
            business_website_url: true,
          },
        },
      },
    })
    await prisma.$disconnect()
    return userInfo
  }

  async editPerformersSettingInfo(
    uuid: string,
    icon: string, // should give the default icon to display
    password: string,
    username: string,
    yearsOfExp: number,
    birthday: Date | null,
    contactNumber: number,
    gender: Gender,
    description: string | null,
    name: string | null,
    facebookUrl: string | null,
    twitterUrl: string | null,
    youtubeUrl: string | null,
    igUrl: string | null,
    hashtagArr: number[]
  ) {
    interface HashtagToInput {
      hashtag_details_id: number
    }
    const hashtagToInput: HashtagToInput[] = []

    for (const hashtag of hashtagArr) {
      const id: HashtagToInput = { hashtag_details_id: hashtag }
      hashtagToInput.push(id)
    }

    const userPerformer = await prisma.user.findFirst({
      where: {
        uuid: uuid,
      },
      select: {
        id: true,
      },
    })

    const userPerformerId = userPerformer?.id

    // const userPerformerhashtags = await prisma.performersHashtag.findMany({
    //   where: {
    //     performers_id: userPerformerId,
    //   },
    //   select: {
    //     hashtag_details_id: true,
    //   },
    // })

    // const hashtagToDel: HashtagToInput[] = []

    for (const hashtag of hashtagArr) {
      const id: HashtagToInput = { hashtag_details_id: hashtag }
      hashtagToInput.push(id)
    }

    await prisma.user.update({
      where: {
        uuid: uuid,
      },
      data: {
        icon: icon,
        username: username,
        password: password,
        performers: {
          update: {
            where: {
              id: userPerformerId,
            },
            data: {
              years_of_exp: yearsOfExp,
              birthday: birthday,
              contact_number: contactNumber, //not null
              gender: gender, //not null
              description: description,
              name: name,
              facebook_url: facebookUrl,
              twitter_url: twitterUrl,
              youtube_url: youtubeUrl,
              ig_url: igUrl,
              performers_hashtags: {
                deleteMany: {
                  //del all ?
                },
                createMany: {
                  data: hashtagToInput,
                },
              },
            },
          },
        },
      },
    })

    await prisma.$disconnect()
    return
  }

  ////--- end of setting page (Profile) Info --- ////

  async getEProfile(isOwner: boolean, performerId: number) {
    const eProfile = await prisma.performer.findUnique({
      where: {
        id: performerId,
      },
      select: {
        e_profile: {
          select: {
            content: true,
          },
        },
      },
    })
    await prisma.$disconnect()
    return eProfile
  }

  async editEProfile(uuid: string, obj: Prisma.JsonObject) {
    // const objToAdd = JSON.stringify(obj) as Prisma.JsonObject
    const objToAdd = obj as Prisma.InputJsonValue
    // const objToAdd = JSON.stringify(obj)
    const performers = await prisma.user.findUnique({
      where: {
        uuid: uuid,
      },
      select: {
        performers: {
          select: {
            id: true,
          },
        },
      },
    })
    if (performers) {
      const performersID = performers!.performers[0].id
      await prisma.eprofile.update({
        data: {
          content: objToAdd,
          performers: {
            connect: {},
          },
        },
        where: {
          id: performersID,
        },
      })
      console.log(performersID)
    } else {
      logger.error("cannot find user's performers_id ")
      // console.log(performersID)
    }
    await prisma.$disconnect()
  }
}
