import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../utils/hash"

const prisma = new PrismaClient()

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
