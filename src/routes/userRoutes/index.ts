import { Router } from "express"

import notificationsRoutes from "./notifications.routes"
import sessionsRoutes from "./sessions.routes"
import userRoutes from "./users.routes"

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/notifications", notificationsRoutes)
routes.use("/sessions", sessionsRoutes)

export default routes
