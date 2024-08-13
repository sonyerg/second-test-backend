import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import treeRoutes from "./routes/treeRoutes"; // Import your routes

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use("/api", treeRoutes);

export default app;
