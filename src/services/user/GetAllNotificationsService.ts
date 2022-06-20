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
    })

    return notifications
  }
}

export default GetAllNotificationsService
