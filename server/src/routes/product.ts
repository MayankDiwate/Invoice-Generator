import express from "express";
import {
  addProductById,
  deleteProduct,
  getProducts,
} from "../controllers/product.controller";
import verifyToken from "../utils/verifyToken";

const router = express.Router();

router.get("/:id", verifyToken, getProducts);
router.post("/addProduct/:id", verifyToken, addProductById);
router.delete("/", verifyToken, deleteProduct);

export default router;
