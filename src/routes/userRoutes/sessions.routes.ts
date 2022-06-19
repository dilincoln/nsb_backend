import { Router } from "express"

import AuthenticateService from "../../services/user/AuthenticateService"

const sessionsRouter = Router()

sessionsRouter.post("/", async (request, response) => {
  const { email, password } = request.body

  const authenticateService = new AuthenticateService()

  const credentials = await authenticateService.execute({
    email,
    password,
  })

  return response.json(credentials)
})

export default sessionsRouter
