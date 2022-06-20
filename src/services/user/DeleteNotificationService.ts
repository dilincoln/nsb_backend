import prisma from "../../db"
import AppError from "../../errors/AppError"

type Request = {
  notification_id: string
  owner_id: string
}

class DeleteNotificationService {
  public async execute({ notification_id, owner_id }: Request): Promise<void> {
    const notification = await prisma.notification.findFirst({
      where: {
        id: notification_id,
        user_id: owner_id,
      },
    })

    if (!notification) {
      throw new AppError("Notificação não encontrada")
    }

    await prisma.notification.delete({
      where: {
        id: notification_id,
      },
    })
  }
}

export default DeleteNotificationService
