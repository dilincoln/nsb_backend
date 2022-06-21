import { Notification } from "@prisma/client"

import prisma from "../../db"

type Request = Omit<Notification, "created_at" | "updated_at"> & {
  user_id: string
}

class EditNotificationService {
  public async execute({
    id,
    user_id,
    receiver,
    blood_type,
    blood_bank_id,
    start_date,
    end_date,
  }: Request): Promise<Notification> {
    const userExist = await prisma.user.findFirst({
      where: { id: user_id },
    })

    if (!userExist) {
      throw new Error("Usuário não existe")
    }

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

    const notificationExist = await prisma.notification.findFirst({
      where: { id, user_id },
    })

    if (!notificationExist) {
      throw new Error("Notificação não existe")
    }

    const notification = await prisma.notification.update({
      where: {
        id,
      },
      data: {
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

export default EditNotificationService
