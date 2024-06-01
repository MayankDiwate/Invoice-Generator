import express from "express";
import { addInvoice, getUserInvoices } from "../controllers/invoice.controller";
import verifyToken from "../utils/verifyToken";

const router = express.Router();

router.post("/", verifyToken, getUserInvoices);
router.post("/addInvoice", verifyToken, addInvoice);

export default router;
