import { Notification } from "@prisma/client"

import prisma from "../../db"
import AppError from "../../errors/AppError"

type Request = {
  user_id: string
}

class GetAvailableNotificationsService {
  public async execute({ user_id }: Request): Promise<Notification[]> {
    const userExist = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    })

    if (!userExist) {
      throw new AppError("Usuário não existe")
    }

    const notifications = await prisma.notification.findMany({
      where: {
        user_id: {
          not: user_id,
        },
        end_date: {
          gte: new Date(),
        },
      },
      include: {
        blood_bank: {
          include: {
            address: true,
          },
        },
      },
    })

    return notifications
  }
}

export default GetAvailableNotificationsService
