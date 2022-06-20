import { Router } from "express"

import ensureAuthenticated from "../../middlewares/ensureAuthenticated"
import GetAllBloodBanksService from "../../services/user/GetAllBloodBanksService"

const bloodBanksRouter = Router()

bloodBanksRouter.use(ensureAuthenticated)

bloodBanksRouter.get("/", async (request, response) => {
  const getAllBloodBanksService = new GetAllBloodBanksService()

  const bloodBanks = await getAllBloodBanksService.execute()

  return response.json(bloodBanks)
})

export default bloodBanksRouter
