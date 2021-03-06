import express, { NextFunction, Request, Response } from "express"
import "express-async-errors"

import AppError from "./errors/AppError"
import routes from "./routes"

const app = express()

app.use(express.json())

app.use(routes)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    })
  }

  console.error(err)

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
    error: err.message,
  })
})

app.listen(2333, () => {
  console.info("Server started on port 2333 🚀")
})
