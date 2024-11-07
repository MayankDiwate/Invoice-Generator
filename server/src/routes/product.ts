import express from "express";
import {
  addProductById,
  deleteProduct,
  getProducts,
} from "../controllers/product.controller";

const router = express.Router();

router.get("/:id", getProducts);
router.post("/addProduct/:id", addProductById);
router.delete("/", deleteProduct);

export default router;
