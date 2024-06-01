import { NextFunction, Request, Response } from "express";
import Invoice from "../models/invoice.model";
import { errorHandler } from "../utils/error";

export const addInvoice = (req: Request, res: Response, next: NextFunction) => {
  const { invoiceName, userId } = req.body;

  if (!invoiceName) {
    return next(errorHandler(500, "Username is required"));
  }

  try {
    const newUser = new Invoice({
      userId,
      invoiceName,
    });

    newUser.save();

    res.status(200).json({
      message: "User added successfully",
      user: { invoiceName },
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
  const { userId } = req.body;

  try {
    const invoices = await Invoice.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(invoices);
  } catch (error: any) {
    next(error.message);
  }
};
