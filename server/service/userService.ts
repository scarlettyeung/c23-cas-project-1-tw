import { logger } from "../utils/logger"
import {
  PrismaClient,
  Prisma,
  Identity,
  ClientType,
  Gender,
  TagType,
} from "@prisma/client"

export class UserService {
  constructor(private prisma: PrismaClient) {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // constructor() {}

  async forTest(id: number) {
    try {
      const test = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          username: true,
        },
      })
      logger.info(test)
      return test
    } catch (e) {
      logger.error(e)
      return
    }
  }

  //////--- part of check user info--- ////
  async getLoginInfo(email: string) {
    try {
      logger.info("getLoginInfo call in UserService")

      const user = await this.prisma.user.findFirst({
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
          performers: {
            select: {
              id: true,
            },
          },
          clients: {
            select: {
              id: true,
              client_type: true,
            },
          },
        },
      })

      logger.info("get login info in UserService ")
      logger.info(user)
      //await this.prisma.$disconnect()
      return user
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }

  async getPassword(uuid: string) {
    try {
      logger.info("getPassword call in UserService")
      const password = await this.prisma.user.findFirst({
        where: {
          uuid: uuid,
        },
        select: {
          password: true,
        },
      })
      logger.info("getPassword in UserService ")

      //await this.prisma.$disconnect()
      // return
      return password?.password
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }

  async getUserByEmail(email: string) {
    try {
      logger.info("getUserEmail call in UserService")

      const userEmail = await this.prisma.user.findMany({
        where: {
          email: email,
        },
        select: {
          email: true,
        },
      })
      //await this.prisma.$disconnect()
      return userEmail
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }

  async getUserByUUID(uuid: string) {
    try {
      logger.info("getUserByUUID call in UserService")

      const userUUID = await this.prisma.user.findMany({
        where: {
          uuid: uuid,
        },
        select: {
          uuid: true,
        },
      })
      //await this.prisma.$disconnect()
      return userUUID
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }

  async getUserIdentity(uuid: string) {
    try {
      logger.info("getUserIdentity call in UserService")
      logger.info("in UserService uuid is ")
      logger.info(uuid)
      const userIdentity = await this.prisma.user.findFirst({
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
      //await this.prisma.$disconnect()
      return userIdentity
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }

  async getClientType(uuid: string) {
    try {
      logger.info("getUserIdentity call in UserService")

      const clientType = await this.prisma.user.findMany({
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
      //await this.prisma.$disconnect()
      return clientType
    } catch (e) {
      logger.error(e)
      //await this.prisma.$disconnect()
      return
    }
  }

  async getUserEmail(uuid: string) {
    try {
      logger.info("getUserEmail call in UserService")
      const email = await this.prisma.user.findUnique({
        where: {
          uuid: uuid,
        },
        select: {
          email: true,
        },
      })
      //await this.prisma.$disconnect()
      return email
    } catch (e) {
      logger.error(e)
      //await this.prisma.$disconnect()
      return
    }
  }

  async checkEmail(email: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: email,
        },
        select: {
          email: true,
        },
      })
      //await this.prisma.$disconnect()
      return user?.email
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }
  // get all performer hashtags
  async getAllPerformerHashtag() {
    const tags = await this.prisma.hashtagDetail.findMany({
      where: {
        tag_type: TagType.performer,
      },
      select: {
        name: true,
        id: true,
      },
    })
    //await this.prisma.$disconnect()
    return tags
  }
  //////--- end of check user info--- ////

  //////--- part of Register--- ////
  async createPerformer(
    identitySelect: Identity,
    // icon: string | null, // should give the default icon to display
    email: string,
    password: any,
    username: string,
    yearsOfExp: number,
    birthday: Date | null,
    contactEmail: string,
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
    try {
      logger.info("createPerformer call in UserService")
      interface HashtagToInput {
        hashtag_details_id: number
      }
      const hashtagToInput: HashtagToInput[] = []

      for (const hashtag of hashtagArr) {
        const id: HashtagToInput = { hashtag_details_id: hashtag }
        hashtagToInput.push(id)
      }

      // const defaultObj = {
      //   header: {
      //     iconPosition: "mid",
      //     headerImage: "default",
      //     colorStyle: "black",
      //     displayTab: "about",
      //   },
      //   page: [
      //     {
      //       page: 1,
      //       title: "About me",
      //       style: "about",
      //       main_color: "black",
      //       contents: [
      //         {
      //           headline: "",
      //           content: "",
      //           media: [
      //             {
      //               media_id: 1,
      //               media_name: "",
      //               media_type: "",
      //               is_main: "true",
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // }

      // const defaultJson = JSON.stringify(defaultObj)

      await this.prisma.user.create({
        data: {
          identity: identitySelect, //not null
          // icon: icon,
          email: email, //not null
          password: password, //not null
          username: username, //not null
          performers: {
            create: {
              years_of_exp: yearsOfExp, //not null >> 0
              birthday: birthday,
              contact_email: contactEmail, //not null
              contact_number: contactNumber, //not null
              gender: gender, //not null
              description: description,
              name: name,
              facebook_url: facebookUrl,
              twitter_url: twitterUrl,
              youtube_url: youtubeUrl,
              ig_url: igUrl,
              performers_hashtags: {
                createMany: {
                  data: hashtagToInput,
                },
              },
              // e_profile: {
              //   create: {
              //     content: defaultJson,
              //   },
              // },
            },
          },
        },
      })

      //await this.prisma.$disconnect()
      return
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }

  async createIndividualClient(
    identitySelect: Identity,
    // icon: string | null,
    email: string,
    password: any,
    username: string,
    clientType: ClientType,
    name: string,
    gender: Gender,
    contactNumber: number,
    contactEmail: string | null,
    description: string
  ) {
    try {
      logger.info("createIndividualClient call in UserService")

      await this.prisma.user.create({
        data: {
          identity: identitySelect, //not null
          // icon: icon,
          email: email, //not null
          password: password, //not null
          username: username, //not null
          clients: {
            create: {
              client_type: clientType, //not null
              name: name, //not null
              gender: gender, //not null
              contact_number: contactNumber, //not null
              contact_email: contactEmail, // default = email
              description: description,
            },
          },
        },
      })

      //await this.prisma.$disconnect()
      return
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }

  async createCorporateClient(
    identitySelect: Identity,
    email: string,
    password: any,
    username: string,
    clientType: ClientType,
    name: string,
    gender: Gender,
    contactNumber: number,
    contactEmail: string | null,
    businessAddress: string,
    businessBRNo: string,
    businessWebsiteUrl: string | null,
    description: string
  ) {
    try {
      logger.info("createCorporateClient call in UserService")

      await this.prisma.user.create({
        data: {
          identity: identitySelect, //not null
          // icon: icon,
          email: email, //not null
          password: password, //not null
          username: username, //not null
          clients: {
            create: {
              client_type: clientType, //not null
              name: name, //not null
              gender: gender, //not null
              contact_number: contactNumber, //not null
              contact_email: contactEmail,
              business_address: businessAddress, //not null
              business_BR_no: businessBRNo, //not null
              business_website_url: businessWebsiteUrl,
              description: description,
            },
          },
        },
      })

      //await this.prisma.$disconnect()
      return
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }
  //////--- end of Register --- ////

  //////--- part of showProfile Info --- ////

  async getPerformersProfilePageInfo(uuid: string) {
    try {
      logger.info("get Performers Info call in UserService")
      const performersInfo = await this.prisma.user.findUnique({
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
      if (!performersInfo) {
        return
      }

      // const performerId = performersInfo?.performers[0].id
      const userInfo = await this.prisma.user.findUnique({
        where: {
          uuid: uuid,
        },
        select: {
          uuid: true,
          id: true,
          icon: true,
          username: true,
          identity: true,
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
                  hashtag_details: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
              events: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
      })

      const userScore = await this.prisma.review.aggregate({
        _avg: {
          score: true,
        },
        where: {
          users_id: userInfo?.id,
        },
      })

      const sum_of_events = await this.prisma.review.count({
        where: {
          users_id: userInfo?.id,
        },
      })

      const userAvgScore = { avg_score: 0 }
      if (userScore._avg.score) {
        userAvgScore.avg_score = userScore._avg.score
      }

      if (!userInfo) return
      // userInfo.performers[0]["avg_score"] = userAvgScore.avg_score
      // userInfo.performers[0]["sum_of_even"] = sum_of_events

      const mapHashTags = userInfo.performers[0].performers_hashtags.map(
        (tag) => {
          return {
            id: tag.hashtag_details.id,
            name: tag.hashtag_details.name,
          }
        }
      )
      console.dir("mapHashTags")
      console.dir(mapHashTags)

      const data = {
        ...userInfo,
        ...userInfo.performers[0],
        avg_score: userAvgScore.avg_score,
        sum_of_even: sum_of_events,
        performers_hashtags: mapHashTags,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any

      delete data.performers

      console.log("the data is ")
      console.dir(data)

      //await this.prisma.$disconnect()
      return data
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }

  async getIndividualClientInfoPageInfo(uuid: string) {
    try {
      logger.info("get Individual Client Info call in UserService")
      const userInfo = await this.prisma.user.findUnique({
        where: {
          uuid: uuid,
        },
        select: {
          uuid: true,
          id: true,
          icon: true,
          username: true,
          email: true,
          identity: true,
          clients: {
            select: {
              gender: true,
              description: true,
              client_type: true,
              events: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
      })

      const userScore = await this.prisma.review.aggregate({
        _avg: {
          score: true,
        },
        where: {
          users_id: userInfo?.id,
        },
      })

      const sum_of_events = await this.prisma.review.count({
        where: {
          users_id: userInfo?.id,
        },
      })

      const userAvgScore = { avg_score: 0 }
      if (userScore._avg.score) {
        userAvgScore.avg_score = userScore._avg.score
      }

      if (!userInfo) return

      const data = {
        ...userInfo,
        ...userInfo.clients[0],
        avg_score: userAvgScore.avg_score,
        sum_of_even: sum_of_events,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any
      delete data.clients

      logger.info("get info in UserService")
      //await this.prisma.$disconnect()
      return data
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }

  async getCorporateClientInfoPageInfo(uuid: string) {
    try {
      logger.info("call get Corporate Client InfoPage Info in userService")
      const userInfo = await this.prisma.user.findUnique({
        where: {
          uuid: uuid,
        },
        select: {
          uuid: true,
          id: true,
          icon: true,
          username: true,
          email: true,
          identity: true,
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
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
      })

      const userScore = await this.prisma.review.aggregate({
        _avg: {
          score: true,
        },
        where: {
          users_id: userInfo?.id,
        },
      })

      const sum_of_events = await this.prisma.review.count({
        where: {
          users_id: userInfo?.id,
        },
      })

      const userAvgScore = { avg_score: 0 }
      if (userScore._avg.score) {
        userAvgScore.avg_score = userScore._avg.score
      }

      if (!userInfo) return

      const data = {
        ...userInfo,
        ...userInfo.clients[0],
        avg_score: userAvgScore.avg_score,
        sum_of_even: sum_of_events,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any
      delete data.clients
      //await this.prisma.$disconnect()
      return data
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }
  //////--- end of showProfile Info --- ////

  //////--- part of setting page (Profile) Info --- ////
  async getPerformersSettingPageInfo(uuid: string, userId: number) {
    try {
      logger.info("get Performers Setting Info, call in UserService")

      const userInfo = await this.prisma.user.findUnique({
        where: {
          uuid: uuid,
        },
        select: {
          uuid: true,
          id: true,
          icon: true,
          username: true,
          email: true,
          identity: true,
          performers: {
            select: {
              years_of_exp: true,
              birthday: true,
              contact_number: true,
              gender: true,
              name: true,
              contact_email: true,
              description: true,
              facebook_url: true,
              twitter_url: true,
              youtube_url: true,
              ig_url: true,
              performers_hashtags: {
                select: {
                  hashtag_details: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
              events: {
                select: { id: true, title: true },
              },
            },
          },
        },
      })

      const userAvgScore = { avg_score: 0 }

      const sum_of_events = await this.prisma.review.count({
        where: {
          users_id: userInfo?.id,
        },
      })

      if (sum_of_events != 0) {
        const userScore = await this.prisma.review.aggregate({
          _avg: {
            score: true,
          },
          where: {
            users_id: userId,
          },
        })
        if (userScore._avg.score) {
          userAvgScore.avg_score = userScore._avg.score
        }
      }

      //await this.prisma.$disconnect()
      if (!userInfo) return
      const mapHashTags = userInfo.performers[0].performers_hashtags.map(
        (tag) => {
          return {
            id: tag.hashtag_details.id,
            name: tag.hashtag_details.name,
          }
        }
      )
      const data = {
        ...userInfo,
        ...userInfo.performers[0],
        avg_score: userAvgScore.avg_score,
        sum_of_even: sum_of_events,
        performers_hashtags: mapHashTags,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any
      delete data.performers

      return data
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }

  async getIndividualClientSettingPageInfo(uuid: string, userId: number) {
    try {
      logger.info("get Individual Client Setting Info, call in UserService")
      const userInfo = await this.prisma.user.findUnique({
        where: { uuid },
        select: {
          uuid: true,
          id: true,
          icon: true,
          username: true,
          email: true,
          identity: true,
          clients: {
            select: {
              name: true,
              gender: true,
              contact_number: true,
              contact_email: true,
              description: true,
              client_type: true,
              events: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
      })

      const sum_of_events = await this.prisma.review.count({
        where: {
          users_id: userInfo?.id,
        },
      })

      const userAvgScore = { avg_score: 0 }

      if (sum_of_events != 0) {
        const userScore = await this.prisma.review.aggregate({
          _avg: {
            score: true,
          },
          where: {
            users_id: userId,
          },
        })
        if (userScore._avg.score) {
          userAvgScore.avg_score = userScore._avg.score
        }
      }

      //await this.prisma.$disconnect()
      if (!userInfo) return

      const data = {
        ...userInfo,
        ...userInfo.clients[0],
        avg_score: userAvgScore.avg_score,
        sum_of_even: sum_of_events,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any
      delete data.clients
      return data
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }

  async getCorporateClientSettingPageInfo(uuid: string, userId: number) {
    try {
      logger.info("get Corporate Client Setting Page call in UserService")
      const userInfo = await this.prisma.user.findUnique({
        where: {
          uuid: uuid,
        },
        select: {
          uuid: true,
          id: true,
          icon: true,
          username: true,
          email: true,
          // password: true,
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
              events: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
      })
      const userScore = await this.prisma.review.aggregate({
        _avg: {
          score: true,
        },
        where: {
          users_id: userId,
        },
      })

      const userAvgScore = { avg_score: 0 }
      if (userScore._avg.score) {
        userAvgScore.avg_score = userScore._avg.score
      }

      const sum_of_events = await this.prisma.review.count({
        where: {
          users_id: userInfo?.id,
        },
      })

      //await this.prisma.$disconnect()
      if (!userInfo) return
      const data = {
        ...userInfo,
        ...userInfo.clients[0],
        avg_score: userAvgScore.avg_score,
        sum_of_even: sum_of_events,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any
      delete data.clients
      return data
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }

  async editPerformersSettingInfo(
    uuid: string,
    icon: string, // should give the default icon to display
    password: any,
    username: string,
    yearsOfExp: number,
    birthday: Date | null,
    contactNumber: number,
    contactEmail: string,
    gender: Gender,
    description: string | null,
    name: string | null,
    facebook_url: string | null,
    twitter_url: string | null,
    youtube_url: string | null,
    ig_url: string | null
    // hashtagArr: number[]
  ) {
    try {
      logger.info("edit Performers Setting Info call in userService")
      logger.info(yearsOfExp)
      logger.info(contactNumber)
      logger.info(contactEmail)

      const userPerformer = await this.prisma.user.findFirst({
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

      const userPerformerId = userPerformer?.performers[0].id
      logger.info("check user", userPerformerId)

      // const userPerformerHashtagsToDel =
      //   await this.prisma.performersHashtag.findMany({
      //     where: {
      //       performers_id: userPerformerId,
      //     },
      //     select: {
      //       hashtag_details_id: true,
      //     },
      //   })

      // if (password) {
      //   const performerDataWithPsw = await this.prisma.user.update({
      //     where: {
      //       uuid: uuid,
      //     },
      //     data: {
      //       icon: icon,
      //       username: username,
      //       password: password,
      //       performers: {
      //         update: {
      //           where: {
      //             id: userPerformerId,
      //           },
      //           data: {
      //             years_of_exp: yearsOfExp,
      //             birthday: birthday,
      //             contact_number: contactNumber, //not null
      //             contact_email: contactEmail, //KENKEN
      //             gender: gender, //not null
      //             description: description,
      //             name: name,
      //             facebook_url: facebookUrl,
      //             twitter_url: twitterUrl,
      //             youtube_url: youtubeUrl,
      //             ig_url: igUrl,
      //             // performers_hashtags: {
      //             //   deleteMany: userPerformerHashtagsToDel,
      //             //   // createMany: {
      //             //   //   data: hashtagToInput,
      //             //   // },
      //             // },
      //           },
      //         },
      //       },
      //     },
      //   })
      //   console.dir(performerDataWithPsw)
      //   return performerDataWithPsw
      // } else {
      const performerData = await this.prisma.user.update({
        where: {
          uuid: uuid,
        },
        data: {
          icon: icon,
          username: username,
          performers: {
            update: {
              where: {
                id: userPerformerId,
              },
              data: {
                years_of_exp: yearsOfExp,
                birthday: birthday,
                contact_number: contactNumber, //not null
                contact_email: contactEmail,
                gender: gender, //not null
                description: description,
                name: name,
                facebook_url: facebook_url,
                twitter_url: twitter_url,
                youtube_url: youtube_url,
                ig_url: ig_url,
                // performers_hashtags: {
                //   deleteMany: userPerformerHashtagsToDel,
                //   // createMany: {
                //   //   data: hashtagToInput,
                //   // },
                // },
              },
            },
          },
        },
        select: {
          email: true,
          username: true,
          performers: {
            select: {
              contact_email: true,
              facebook_url: true,
            },
          },
        },
      })
      return performerData
      // await this.prisma.$disconnect()
      return performerData
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }

  async editIndividualClientSettingInfo(
    uuid: string,
    icon: string,
    password: any,
    username: string,
    gender: Gender,
    description: string | null,
    name: string | null,
    contactNumber: number,
    contactEmail: string
  ) {
    try {
      logger.info("edit Individual Client Setting Info call in userService")
      const userClient = await this.prisma.user.findFirst({
        where: {
          uuid: uuid,
        },
        select: {
          clients: {
            select: {
              id: true,
              client_type: true,
            },
          },
        },
      })

      if (!userClient) {
        return
      }
      const userClientId = userClient?.clients[0].id
      await this.prisma.user.update({
        where: {
          uuid: uuid,
        },
        data: {
          icon: icon,
          username: username,
          // password: password,
          clients: {
            update: {
              where: {
                id: userClientId,
              },
              data: {
                gender: gender,
                description: description,
                name: name,
                contact_number: contactNumber,
                contact_email: contactEmail,
              },
            },
          },
        },
      })

      logger.info("edited Individual Client Setting Info")
      //await this.prisma.$disconnect()
      return
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }

  async editCorporateClientSettingInfo(
    uuid: string,
    icon: string,
    password: any,
    username: string,
    gender: Gender,
    description: string | null,
    name: string | null,
    contactNumber: number,
    contactEmail: string,
    businessAddress: string,
    businessBRNo: string,
    businessWebsiteUrl: string | null
  ) {
    try {
      logger.info("edit Corporate Client Setting Info call in userService")
      const userClient = await this.prisma.user.findFirst({
        where: {
          uuid: uuid,
        },
        select: {
          clients: {
            select: {
              id: true,
            },
          },
        },
      })

      if (!userClient) {
        return
      }
      const userClientId = userClient.clients[0].id

      await this.prisma.user.update({
        where: {
          uuid: uuid,
        },
        data: {
          icon: icon,
          username: username,

          clients: {
            update: {
              where: {
                id: userClientId,
              },
              data: {
                gender: gender,
                description: description,
                name: name,
                contact_number: contactNumber,
                contact_email: contactEmail,
                business_address: businessAddress,
                business_BR_no: businessBRNo,
                business_website_url: businessWebsiteUrl,
              },
            },
          },
        },
      })

      logger.info("edited Individual Client Setting Info")
      //await this.prisma.$disconnect()
      return
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }
  ////--- end of setting page (Profile) Info --- ////

  async getEProfile(uuid: string) {
    try {
      logger.info("get EProfile in userService")
      // const eProfile =await this.prisma.performer.findUnique({
      //   where: {
      //     id: performerId,
      //   },
      //   select: {
      //     e_profile: {
      //       select: {
      //         content: true,
      //       },
      //     },
      //   },
      // })

      const eProfile = await this.prisma.user.findUnique({
        where: {
          uuid: uuid,
        },
        select: {
          performers: {
            select: {
              e_profile: {
                select: {
                  content: true,
                },
              },
            },
          },
        },
      })
      //await this.prisma.$disconnect()
      return eProfile
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }

  async editEProfile(uuid: string, obj: Prisma.JsonObject) {
    try {
      logger.info("edit EProfile in userService")

      // logger.info("uuid", uuid)
      // logger.info("obj")
      // console.dir(obj, { depth: null })

      // const objToAdd = JSON.stringify(obj) as Prisma.JsonObject
      // const objToAdd = obj as Prisma.InputJsonValue
      const objToAdd = JSON.stringify(obj)
      logger.info(objToAdd)
      const performers = await this.prisma.user.findUnique({
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
        logger.info("performersID")
        logger.info(performersID)

        const eProfileId = (
          await this.prisma.eprofile.findFirst({
            where: {
              performers_id: performersID,
            },
            select: {
              id: true,
            },
          })
        )?.id
        if (eProfileId) {
          const eprofile = await this.prisma.eprofile.update({
            where: {
              id: eProfileId,
            },
            data: {
              content: objToAdd,
            },
            select: {
              content: true,
            },
          })
          //await this.prisma.$disconnect()
          return eprofile.content
        } else {
          logger.error("cannot find user's performers's eProfile' ")
          return
          // console.log(performersID)
        }
      }
      //await this.prisma.$disconnect()
      return
    } catch (e) {
      logger.debug(e)
      //await this.prisma.$disconnect()
      return
    }
  }
  async getContactNumber(uuid: string) {
    try {
      // console.log("inside", uuid)
      const contact = await this.prisma.user.findUnique({
        where: {
          uuid: uuid,
        },
        select: {
          performers: {
            select: {
              contact_number: true,
            },
          },
        },
      })
      //await this.prisma.$disconnect()
      return contact
    } catch (e) {
      logger.info(e)
      //await this.prisma.$disconnect()
      return
    }
  }
  // async getAllEmail() {
  //   const email = await this.prisma.user.findMany({
  //     select: {
  //       email: true,
  //     },
  //   })
  //   return email
  // }
}
