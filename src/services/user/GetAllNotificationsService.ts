import { Notification } from "@prisma/client"

import prisma from "../../db"

type Request = {
  user_id: string
}

class GetAllNotificationsService {
  public async execute({ user_id }: Request): Promise<Notification[]> {
    const notifications = await prisma.notification.findMany({
      where: {
        user_id,
      },
      include: {
        blood_bank: true,
      },
      orderBy: {
        created_at: "desc",
      },
    })

    const notificationsWithoutPasswordHash = notifications.map(notification => {
      const { blood_bank } = notification
      const { password_hash, ...blood_bank_without_password_hash } = blood_bank
      return {
        ...notification,
        blood_bank: blood_bank_without_password_hash,
      }
    })

    return notificationsWithoutPasswordHash
  }
}

export default GetAllNotificationsService
