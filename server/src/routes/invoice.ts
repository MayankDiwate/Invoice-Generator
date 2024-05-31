import express from "express";
import { addProduct, getProducts } from "../controllers/invoice.controller";
import { getUserInvoices } from "../controllers/user.controller";
import verifyToken from "../utils/verifyToken";

const router = express.Router();

router.get("/", verifyToken, getUserInvoices);
router.get("/:id", verifyToken, getProducts);
router.post("/:id", verifyToken, addProduct);

export default router;
