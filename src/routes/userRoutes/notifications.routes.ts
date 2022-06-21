import { Router } from "express"

import ensureAuthenticated from "../../middlewares/ensureAuthenticated"
import CreateNotificationService from "../../services/user/CreateNotificationService"
import DeleteNotificationService from "../../services/user/DeleteNotificationService"
import EditNotificationService from "../../services/user/EditNotificationService"
import GetAllNotificationsService from "../../services/user/GetAllNotificationsService"
import GetAvailableNotificationsService from "../../services/user/GetAvailableNotificationsService"

const notificationsRouter = Router()

notificationsRouter.use(ensureAuthenticated)

notificationsRouter.post("/", async (request, response) => {
  const { receiver, blood_type, blood_bank_id, start_date, end_date } =
    request.body

  const { id } = request.client
  const createNotificationService = new CreateNotificationService()

  const notification = await createNotificationService.execute({
    user_id: id,
    receiver,
    blood_type,
    blood_bank_id,
    start_date,
    end_date,
  })

  return response.json(notification)
})

notificationsRouter.get("/available", async (request, response) => {
  const { id } = request.client

  const getAvailableNotificationsService =
    new GetAvailableNotificationsService()

  const notifications = await getAvailableNotificationsService.execute({
    user_id: id,
  })

  return response.json(notifications)
})

notificationsRouter.get("/", async (request, response) => {
  const { id } = request.client

  const getAllNotificationsService = new GetAllNotificationsService()

  const notifications = await getAllNotificationsService.execute({
    user_id: id,
  })

  return response.json(notifications)
})

notificationsRouter.delete("/:notificationId", async (request, response) => {
  const { notificationId } = request.params

  const { id } = request.client

  const deleteNotificationService = new DeleteNotificationService()

  await deleteNotificationService.execute({
    notification_id: notificationId,
    owner_id: id,
  })

  return response.json()
})

notificationsRouter.put("/:notificationId", async (request, response) => {
  const { notificationId } = request.params

  const { id } = request.client

  const { receiver, blood_type, blood_bank_id, start_date, end_date } =
    request.body

  const editNotificationService = new EditNotificationService()

  const notification = await editNotificationService.execute({
    id: notificationId,
    user_id: id,
    receiver,
    blood_type,
    blood_bank_id,
    start_date,
    end_date,
  })

  return response.json(notification)
})

export default notificationsRouter
