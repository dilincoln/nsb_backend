import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const bloodBanksData: Prisma.BloodBankCreateInput[] = [
  {
    cnpj: "12345678901234",
    name: "Blood Bank 1",
    email: "bloodbank1@nsb.com.br",
    password_hash: "123456",
    address: {
      create: {
        street: "Rua 1",
        number: "1",
        complement: "A",
        city: "São Paulo",
        state: "SP",
        zip_code: "01001000",
        district: "Bairro 1",
      },
    },
  },
  {
    cnpj: "12345678901235",
    name: "Blood Bank 2",
    email: "bloodbank2@nsb.com.br",
    password_hash: "123456",
    address: {
      create: {
        street: "Rua 2",
        number: "2",
        complement: "B",
        city: "São Paulo",
        state: "SP",
        zip_code: "01001000",
        district: "Bairro 2",
      },
    },
  },
]

async function main() {
  console.log(`Start seeding blood banks...`)
  for (const b of bloodBanksData) {
    const bloodBank = await prisma.bloodBank.create({
      data: b,
    })

    console.log(`Created BloodBank with id: ${bloodBank.id}`)
  }

  console.log(`Seeding finished.`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
