import express from "express";
import {
  addInvoice,
  deleteInvoice,
  getUserInvoice,
  getUserInvoices,
} from "../controllers/invoice.controller";
import verifyToken from "../utils/verifyToken";

const router = express.Router();

router.post("/getInvoice", verifyToken, getUserInvoice);
router.post("/", verifyToken, getUserInvoices);
router.post("/addInvoice", verifyToken, addInvoice);
router.delete("/", verifyToken, deleteInvoice);

export default router;
