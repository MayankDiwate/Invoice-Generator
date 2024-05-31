import { NextFunction, Request, Response } from "express";
import Product from "../models/product.model";
import { errorHandler } from "../utils/error";

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!id) {
    return next(errorHandler(500, "Id is required"));
  }

  try {
    const product = new Product({
      invoiceId: id,
      name: req.body.name,
      quantity: req.body.quantity,
      rate: req.body.rate,
    });

    await product.save();

    res.json({ message: "Product added successfully" });
  } catch (error: any) {
    next(error.message);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const { id } = req.params;

    if (!id) {  
      return next(errorHandler(500, "Id is required"));
    }

    try {
      const products = await Product.find({ invoiceId: id });
        res.status(200).json(products);
    } catch (error: any) {
        next(error.message);
    }
}
