import { NextFunction, Request, Response } from "express";
import Invoice from "../models/invoice.model";
import { errorHandler } from "../utils/error";

export const addInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { invoiceName, userId } = req.body;

  if (!invoiceName) {
    return next(errorHandler(500, "Invoice name is required"));
  }

  try {
    const invoice = await Invoice.findOne({ invoiceName, userId });
    if (invoice) {
      return res.status(500).json({ message: "Invoice already exists" });
    }
    const newInvoice = new Invoice({
      userId,
      invoiceName,
    });

    newInvoice.save();

    res.status(200).json({
      message: "Invoice added successfully",
      invoice: newInvoice,
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
