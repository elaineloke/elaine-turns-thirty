import express from "express";
import cors from "cors";
import { rsvpRouter } from "./routes/rsvp";
import db from "./db";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/rsvp", rsvpRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`RSVP server running on port ${PORT}`);
});

app.get("/api/rsvp", (req, res) => {
  db.all("SELECT * FROM rsvp ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});
