import { NextFunction, Request, Response } from "express";
import Invoice from "../models/invoice.model";
import Product from "../models/product.model";
import { errorHandler } from "../utils/error";

export const addInvoice = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;
  const userId = req.userId;

  if (!username) {
    return next(errorHandler(500, "Username is required"));
  }

  try {
    const newUser = new Invoice({
      userId,
      username,
      products: [],
    });

    newUser.save();

    res.status(200).json({
      message: "User added successfully",
      user: { username },
    });
  } catch (error: any) {
    next(error.message);
  }
};

export const getUserInvoices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;

  try {
    const invoices = await Invoice.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(invoices);
  } catch (error: any) {
    next(error.message);
  }
};

