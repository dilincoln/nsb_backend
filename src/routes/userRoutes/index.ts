import { Router } from "express"

import sessionsRoutes from "./sessions.routes"
import userRoutes from "./users.routes"

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionsRoutes)

export default routes
