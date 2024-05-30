import cookieParser from "cookie-parser";
import "dotenv/config";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import path from "path";

mongoose.connect(`${process.env.MONGO_CONNECTION_URL as string}`).then(() => {
  console.log("Database connected successfully");
});

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use("/", (req: Request, res: Response) => {
  return res.json({ message: "Api working properly!" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
