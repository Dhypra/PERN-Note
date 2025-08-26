import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import noteRoutes from "./routes/noteRoutes.js";

import { db } from "./routes/db.js";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/note", noteRoutes);
app.use(async (req, res, next) => {
  try {
    const decision = await aj.decide(req, {
      requested: 1,
    });

    if (decision.isDenayed) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Rate Limit Exceeded" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot Detected" });
      } else {
        res.status(400).json({ error: "Bad Request" });
      }
      return;
    }
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(403).json({ error: "Bot Detected" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
});

async function initDB() {
  try {
    await db`
        CREATE TABLE IF NOT EXISTS notes (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     )`;
  } catch (error) {
    console.log(error);
  }
}

initDB().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

// app.get("/", (req, res) => {
//     res.send("all note");
// });

// app.get("/details", (req, res) => {
//     res.send("specific note");
// });

// app.post("/create", (req, res) => {
//     res.send("create note");
// });

// app.get("/edit", (req, res) => {
//     res.send("edit note");
// });

// app.get("/delete", (req, res) => {
//     res.send("delete note");
// });
