import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import scoreRoutes from "./routes/scores.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/auth", authRoutes);
app.use("/scores", scoreRoutes);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
