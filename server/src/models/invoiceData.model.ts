import mongoose from "mongoose";
import { Product } from "./product.model";

export type InvoiceData = {
  products: Product[];
  total: number;
  gst: number;
  grandTotal: number;
  validUntil: string;
};

const invoiceDataSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    total: {
      type: Number,
      required: [true, "Total is required"],
    },
    gst: {
      type: Number,
      required: [true, "GST is required"],
    },
    grandTotal: {
      type: Number,
      required: [true, "Grand Total is required"],
    },
    validUntil: {
      type: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<InvoiceData>("InvoiceData", invoiceDataSchema);
