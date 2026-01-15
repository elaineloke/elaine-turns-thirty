import { Router } from "express";
import db from "../db";

export const rsvpRouter = Router();

rsvpRouter.post("/", (req, res) => {
  const { name, email, attending, message } = req.body;

  if (!name || !email || !attending) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  db.run(
    `INSERT INTO rsvp (name, email, attending, message)
     VALUES (?, ?, ?, ?)`,
    [name, email, attending, message || ""],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to save RSVP" });
      }

      res.json({ id: this.lastID });
    }
  );
});
