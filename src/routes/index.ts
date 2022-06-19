import { Router } from "express"

import bloodBankRoutes from "./bloodBankRoutes"
import userRoutes from "./userRoutes"

const routes = Router()

routes.use("/user", userRoutes)

routes.use("/blood-bank", bloodBankRoutes)

export default routes
