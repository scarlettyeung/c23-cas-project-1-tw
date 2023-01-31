import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../utils/hash"

const prisma = new PrismaClient()
enum TagType {
  Performer = "performer",
  Event = "event",
}
enum Status {
  completed = "completed",
  expired = "expired",
  valid = "valid",
}

enum Properties {
  public = "public",
  private = "private",
}
async function main() {
  await prisma.eventsHashtag.deleteMany()
  await prisma.performersHashtag.deleteMany()
  await prisma.hashtagDetail.deleteMany()
  await prisma.event.deleteMany()
  await prisma.hashtagDetail.deleteMany()
  await prisma.eprofile.deleteMany()
  await prisma.performer.deleteMany()
  await prisma.client.deleteMany()
  await prisma.user.deleteMany()
  console.log("deleteMany run")

  await prisma.user.createMany({
    data: [
      {
        username: "ken",
        password: await hashPassword("1234"),
        email: "ken@gmail.com",
        identity: "performer",
        icon: "icon1.jpeg",
      },
      {
        username: "maple",
        password: await hashPassword("1234"),
        email: "maple@gmail.com",
        identity: "performer",
        icon: "icon2.jpeg",
      },
      {
        username: "scarlett",
        password: await hashPassword("1234"),
        email: "scarlett@gmail.com",
        identity: "client",
      },
      {
        username: "may",
        password: await hashPassword("1234"),
        email: "may@gmail.com",
        identity: "client",
      },
      {
        username: "Peter",
        password: await hashPassword("1234"),
        email: "peter@gmail.com",
        identity: "performer",
        icon: "icon3.jpeg",
      },
    ],
  })

  await prisma.performer.createMany({
    data: [
      {
        users_id: 1,
        years_of_exp: 5,
        birthday: new Date("1997-07-16"),
        contact_number: 12341234,
        gender: "male",
      },
      {
        users_id: 2,
        years_of_exp: 5,
        birthday: new Date("1997-07-16"),
        contact_number: 43214321,
        gender: "female",
      },
      {
        users_id: 5,
        years_of_exp: 0,
        birthday: new Date("1997-07-16"),
        contact_number: 43214321,
        gender: "other",
      },
    ],
  })

  const defaultJson = `{"header":{"iconPosition":"mid","headerImage":"default","colorStyle":"black","displayTab":"about"},"page":[{"page":1,"title":"About me","style":"about","main_color":"black","contents":[{"headline":"","content":"","media":[{"media_id":1,"media_name":"","media_type":"","is_main":"true"}]}]}]}`
  await prisma.eprofile.createMany({
    data: [
      {
        performers_id: 1,
        content: defaultJson,
      },
      {
        performers_id: 2,
        content: defaultJson,
      },
    ],
  })

  await prisma.client.createMany({
    data: [
      {
        users_id: 3,
        name: "scarlett",
        contact_number: 12341234,
        client_type: "individual",
      },
      {
        users_id: 4,
        name: "May Co.",
        contact_number: 12341234,
        client_type: "corporate",
      },
    ],
  })

  await prisma.hashtagDetail.createMany({
    data: [
      {
        name: "Singer",
        tag_type: TagType.Performer,
      },
      {
        name: "DJ",
        tag_type: TagType.Performer,
      },
      {
        name: "Musician",
        tag_type: TagType.Performer,
      },
      {
        name: "Juggling",
        tag_type: TagType.Performer,
      },
      {
        name: "Dancer",
        tag_type: TagType.Performer,
      },
      {
        name: "Mime",
        tag_type: TagType.Performer,
      },
      {
        name: "Emcee(MC)",
        tag_type: TagType.Performer,
      },
      {
        name: "Comedian",
        tag_type: TagType.Performer,
      },
      {
        name: "Clowning",
        tag_type: TagType.Performer,
      },
      {
        name: "Fire Dancer",
        tag_type: TagType.Performer,
      },
      {
        name: "Fire Breather",
        tag_type: TagType.Performer,
      },
      {
        name: "Aerial and Acrobatic Performer",
        tag_type: TagType.Performer,
      },
      {
        name: "Burlesque",
        tag_type: TagType.Performer,
      },
      {
        name: "Drawer",
        tag_type: TagType.Performer,
      },
      {
        name: "Balloon Twister",
        tag_type: TagType.Performer,
      },
      {
        name: "Performance Artist",
        tag_type: TagType.Performer,
      },
      {
        name: "Sketchers",
        tag_type: TagType.Performer,
      },
      {
        name: "Graffiti Artist",
        tag_type: TagType.Performer,
      },
      {
        name: "Acapello",
        tag_type: TagType.Performer,
      },
      {
        name: "Beatboxer",
        tag_type: TagType.Performer,
      },
      {
        name: "Puppetry",
        tag_type: TagType.Performer,
      },
      {
        name: "Rapper",
        tag_type: TagType.Performer,
      },
      {
        name: "Lion Dance",
        tag_type: TagType.Performer,
      },
      {
        name: "Others",
        tag_type: TagType.Performer,
      },
      {
        name: "Charity Event",
        tag_type: TagType.Event,
      },
      {
        name: "Internal Corporate Event",
        tag_type: TagType.Event,
      },
      {
        name: "Annual Dinner",
        tag_type: TagType.Event,
      },
      {
        name: "Concert",
        tag_type: TagType.Event,
      },
      {
        name: "Party",
        tag_type: TagType.Event,
      },
      {
        name: "Carnival",
        tag_type: TagType.Event,
      },
      {
        name: "Wedding",
        tag_type: TagType.Event,
      },
      {
        name: "Celebration",
        tag_type: TagType.Event,
      },
      {
        name: "Luncheon",
        tag_type: TagType.Event,
      },
      {
        name: "Ceremony",
        tag_type: TagType.Event,
      },
      {
        name: "Others",
        tag_type: TagType.Event,
      },
    ],
  })

  await prisma.performersHashtag.createMany({
    data: [
      {
        performers_id: 1,
        hashtag_details_id: 1,
      },
      {
        performers_id: 1,
        hashtag_details_id: 2,
      },
      {
        performers_id: 1,
        hashtag_details_id: 3,
      },
      {
        performers_id: 1,
        hashtag_details_id: 4,
      },
      ////
      {
        performers_id: 2,
        hashtag_details_id: 5,
      },
      {
        performers_id: 2,
        hashtag_details_id: 1,
      },
      {
        performers_id: 2,
        hashtag_details_id: 2,
      },
      {
        performers_id: 2,
        hashtag_details_id: 6,
      },
      {
        performers_id: 2,
        hashtag_details_id: 4,
      },
    ],
  })
  const userId = await prisma.user.findMany({
    select: {
      id: true,
      performers: { select: { id: true } },
      clients: { select: { id: true } },
    },
  })

  await prisma.event.createMany({
    data: [
      {
        performers_id: userId[0].performers[0].id,
        clients_id: userId[2].clients[0].id,
        title: "Wedding",
        wage_offer: 8888,
        start_date: new Date("2023-10-10"),
        end_date: new Date("2023-10-10"),
        rehearsal_needed: false,
        start_time: new Date("15:30:00"),
        end_time: new Date("19:30:00"),
        image: "event1.jpeg",
        description: "MC need!!!!! 求婚宴司儀，婚禮司儀!!!",
        location: "CWB",
        status: Status.valid,
        properties: Properties.public,
        is_shown: true,
        date_published: new Date("2023-3-15"),
      },
      {
        performers_id: userId[1].performers[0].id,
        clients_id: userId[3].clients[0].id,
        title: "百日宴",
        wage_offer: 8888,
        start_date: new Date("2023-12-12"),
        end_date: new Date("2023-12-12"),
        rehearsal_needed: false,
        start_time: new Date("10:30:00"),
        end_time: new Date("13:30:00"),
        image: "event2.jpeg",
        description: "魔術表演 小朋友魔術!!!",
        location: "TST",
        status: Status.valid,
        properties: Properties.public,
        is_shown: true,
        date_published: new Date("2023-3-10"),
      },
      {
        performers_id: userId[1].performers[0].id,
        clients_id: userId[3].clients[0].id,
        title: "生日會",
        wage_offer: 4800,
        start_date: new Date("2023-09-01"),
        end_date: new Date("2023-09-01"),
        rehearsal_needed: false,
        start_time: new Date("12:30:00"),
        end_time: new Date("15:30:00"),
        image: "event3.jpeg",
        description: "音樂、舞蹈及劇場表演",
        location: "YuenLong",
        status: Status.valid,
        properties: Properties.public,
        is_shown: true,
        date_published: new Date("2023-3-10"),
      },
    ],
  })
  const hashtag_id = await prisma.hashtagDetail.findMany({
    select: {
      id: true,
    },
  })
  await prisma.performersHashtag.createMany({
    data: [
      {
        performers_id: userId[0].performers[0].id,
        hashtag_details_id: hashtag_id[0].id,
      },
      {
        performers_id: userId[0].performers[0].id,
        hashtag_details_id: hashtag_id[1].id,
      },
      {
        performers_id: userId[0].performers[0].id,
        hashtag_details_id: hashtag_id[2].id,
      },
      {
        performers_id: userId[1].performers[0].id,
        hashtag_details_id: hashtag_id[3].id,
      },
      {
        performers_id: userId[1].performers[0].id,
        hashtag_details_id: hashtag_id[4].id,
      },
      {
        performers_id: userId[1].performers[0].id,
        hashtag_details_id: hashtag_id[5].id,
      },
      {
        performers_id: userId[1].performers[0].id,
        hashtag_details_id: hashtag_id[6].id,
      },
    ],
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
