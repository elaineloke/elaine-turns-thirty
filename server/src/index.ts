import express from "express"
import cors from "cors"
import rsvpRouter from "./routes/rsvp"

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.use("/api/rsvp", rsvpRouter)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
