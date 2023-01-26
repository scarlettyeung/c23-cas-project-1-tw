import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../utils/hash"

const prisma = new PrismaClient()
enum TagType {
  Performer = "performer",
  Event = "event",
}
async function main() {
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
      },
      {
        username: "maple",
        password: await hashPassword("1234"),
        email: "maple@gmail.com",
        identity: "performer",
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
