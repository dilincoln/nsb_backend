import { Notification } from "@prisma/client"

import prisma from "../../db"

type Request = Omit<Notification, "id" | "created_at" | "updated_at"> & {
  user_id: string
}

class CreateNotificationService {
  public async execute({
    user_id,
    receiver,
    blood_type,
    blood_bank_id,
    start_date,
    end_date,
  }: Request): Promise<Notification> {
    const bloodBankExist = await prisma.bloodBank.findFirst({
      where: { id: blood_bank_id },
    })

    if (!bloodBankExist) {
      throw new Error("Banco de sangue não existe")
    }

    // Check if the start date is before the end date
    if (start_date > end_date) {
      throw new Error("Data de início deve ser antes da data de fim")
    }

    const notification = await prisma.notification.create({
      data: {
        user_id,
        receiver,
        blood_type,
        blood_bank_id,
        start_date,
        end_date,
      },
    })

    return notification
  }
}

export default CreateNotificationService
