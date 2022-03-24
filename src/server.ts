import express from "express"

const app = express()

app.get("/", (request, response) => {
  return response.send("Hello World")
})

app.listen(3333, () => {
  console.info("Server started on port 3333")
})
