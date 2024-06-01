import { NextFunction, Request, Response } from "express";
import Product from "../models/product.model";
import { errorHandler } from "../utils/error";

export const addProductById = async (
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
      total: req.body.quantity * req.body.rate,
    });

    await product.save();

    res.json({ message: "Product added successfully", product });
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
    const products = await Product.find({ invoiceId: id }).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error: any) {
    next(error.message);
  }
};
