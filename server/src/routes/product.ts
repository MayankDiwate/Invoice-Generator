import express from "express";
import {
  addProductById,
  generatePDF,
  getProducts,
} from "../controllers/invoice.controller";
import verifyToken from "../utils/verifyToken";

const router = express.Router();

router.get("/:id", verifyToken, getProducts);
router.post("/addProduct/:id", verifyToken, addProductById);
router.post("/generatePDF/:id", verifyToken, generatePDF);

export default router;
