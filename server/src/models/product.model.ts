import mongoose from "mongoose";

export type Product = {
  _id: mongoose.Schema.Types.ObjectId;
  invoiceId: mongoose.Schema.Types.ObjectId;
  name: string;
  quantity: number;
  rate: number;
  total: number;
};

const productSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },
    name: {
      type: String,
      required: [true, "Username is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      default: 1,
    },
    rate: {
      type: Number,
      required: [true, "Rate is required"],
    },
    total: {
      type: Number,
      required: [true, "Total is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Product>("Product", productSchema);
