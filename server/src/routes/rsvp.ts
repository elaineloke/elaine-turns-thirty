import { Router } from "express"
import db from "../db"

const router = Router()

router.post("/", (req, res) => {
  const { name, attending, notes } = req.body
  if (!name || !attending) return res.status(400).json({ error: "Missing required fields" })

  db.run(
    `INSERT INTO rsvp (name, attending, notes) VALUES (?, ?, ?)`,
    [name, attending, notes || ""],
    function (err) {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: "Database error" })
      }
      res.json({ id: this.lastID })
    }
  )
})

export default router
