import express from "express";
import { addInvoice } from "../controllers/user.controller";
import verifyToken from "../utils/verifyToken";

const router = express.Router();

router.post("/addInvoice", verifyToken, addInvoice);

export default router;
