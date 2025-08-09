import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/ratelimiter.js";
import notesRoutes from "./routes/notesRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
});
