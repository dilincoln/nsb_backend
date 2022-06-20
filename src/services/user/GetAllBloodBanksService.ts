import { BloodBank } from "@prisma/client"

import prisma from "../../db"

class GetAllBloodBanksService {
  public async execute(): Promise<BloodBank[]> {
    const bloodBanks = await prisma.bloodBank.findMany()

    // Delete password_hash from each blood bank
    bloodBanks.forEach(bloodBank => {
      // eslint-disable-next-line no-param-reassign
      delete bloodBank.password_hash
    })

    return bloodBanks
  }
}

export default GetAllBloodBanksService
