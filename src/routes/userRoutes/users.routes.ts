import { Router } from "express"

import ensureAuthenticated from "../../middlewares/ensureAuthenticated"
import CreateUserService from "../../services/user/CreateUserService"
import UpdateUserService from "../../services/user/UpdateUserService"

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

// userRoutes.get("/", async (request, response) => {
//   const { includeRelations } = request.query

//   const getAllUserService = new GetAllUserService()

//   const users = await getAllUserService.execute({
//     includeRelations: includeRelations === "true",
//   })

//   return response.json(users)
// })

userRoutes.use(ensureAuthenticated)

userRoutes.put("/", async (request, response) => {
  const {
    name,
    email,
    birth_date,
    blood_type,
    city,
    complement,
    district,
    cpf,
    gender,
    number,
    state,
    street,
    zip_code,
  } = request.body

  const { id } = request.client

  const updateUserService = new UpdateUserService()

  const updatedUser = await updateUserService.execute({
    id,
    name,
    email,
    birth_date,
    blood_type,
    city,
    complement,
    district,
    cpf,
    gender,
    number,
    state,
    street,
    zip_code,
  })

  return response.json(updatedUser)
})

export default userRoutes
