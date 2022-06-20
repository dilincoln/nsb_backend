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
    start_date,
    end_date,
  }: Request): Promise<Notification> {
    const notification = await prisma.notification.create({
      data: {
        user_id,
        receiver,
        blood_type,
        start_date,
        end_date,
      },
    })

    return notification
  }
}

export default CreateNotificationService
