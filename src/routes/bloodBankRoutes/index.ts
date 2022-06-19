import { Router } from "express"

const userRoutes = Router()

userRoutes.get("/", (request, response) => {
  return response.send("Hello World Blood Bank")
})

export default userRoutes
