import { Router } from "express"

import CreateUserService from "../../services/user/CreateUserService"
import GetAllUserService from "../../services/user/GetAllUserService"

const userRoutes = Router()

userRoutes.post("/", async (request, response) => {
  const createUserService = new CreateUserService()

  const {
    name,
    email,
    gender,
    cpf,
    birth_date,
    blood_type,
    password,
    confirm_password,
    street,
    number,
    complement,
    district,
    zip_code,
    city,
    state,
  } = request.body

  const user = await createUserService.execute({
    name,
    email,
    gender,
    cpf,
    birth_date,
    blood_type,
    password,
    confirm_password,
    street,
    number,
    complement,
    district,
    zip_code,
    city,
    state,
  })

  return response.json(user)
})

userRoutes.get("/", async (request, response) => {
  const { includeRelations } = request.query

  const getAllUserService = new GetAllUserService()

  const users = await getAllUserService.execute({
    includeRelations: includeRelations === "true",
  })

  return response.json(users)
})

export default userRoutes
