import { Router } from "express"

import ensureAuthenticated from "../../middlewares/ensureAuthenticated"
import CreateNotificationService from "../../services/user/CreateNotificationService"
import GetAllNotificationsService from "../../services/user/GetAllNotificationsService"

const notificationsRouter = Router()

notificationsRouter.use(ensureAuthenticated)

notificationsRouter.post("/", async (request, response) => {
  const { receiver, blood_type, start_date, end_date } = request.body

  const { id } = request.client
  const createNotificationService = new CreateNotificationService()

  const notification = await createNotificationService.execute({
    user_id: id,
    receiver,
    blood_type,
    start_date,
    end_date,
  })

  return response.json(notification)
})

notificationsRouter.get("/", async (request, response) => {
  const { id } = request.client

  const getAllNotificationsService = new GetAllNotificationsService()

  const notifications = await getAllNotificationsService.execute({
    user_id: id,
  })

  return response.json(notifications)
})

export default notificationsRouter
