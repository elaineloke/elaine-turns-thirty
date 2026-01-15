import express from "express";
import cors from "cors";
import { rsvpRouter } from "./routes/rsvp";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/rsvp", rsvpRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`RSVP server running on port ${PORT}`);
});
