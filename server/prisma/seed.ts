import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  await prisma.performers.deleteMany()
  await prisma.clients.deleteMany()
  await prisma.users.deleteMany()
  console.log("deleteMany run")
  await prisma.users.createMany({
    data: [
      {
        username: "ken",
        password: "1234",
        email: "ken@gmail.com",
        identity: "performer",
        name: "ken",
      },
      {
        username: "maple",
        password: "1234",
        email: "maple@gmail.com",
        identity: "performer",
        name: "maple",
      },
      {
        username: "scarlett",
        password: "1234",
        email: "scarlett@gmail.com",
        identity: "client",
        name: "scarlett",
      },
      {
        username: "may",
        password: "1234",
        email: "may@gmail.com",
        identity: "client",
        name: "may",
      },
    ],
  })
  await prisma.performers.createMany({
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
  await prisma.clients.createMany({
    data: [
      {
        userId: 3,
        name: "scarlett",
        contact_number: 12341234,
        client_type: "individual",
      },
      {
        userId: 4,
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
