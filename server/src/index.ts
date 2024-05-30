import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
config();

mongoose.connect(process.env.MONGO_CONNECTION_URL as string).then(() => {
  console.log("Database connected successfully");
});

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
// app.use("/", (res: Response) => {
//   res.json({ message: "Api working properly!" });
// });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
