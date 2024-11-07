import express from "express";
import {
  addInvoice,
  deleteInvoice,
  getUserInvoice,
  getUserInvoices,
} from "../controllers/invoice.controller";

const router = express.Router();

router.post("/getInvoice", getUserInvoice);
router.post("/", getUserInvoices);
router.post("/addInvoice", addInvoice);
router.delete("/", deleteInvoice);

export default router;
