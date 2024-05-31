import mongoose from "mongoose";

export type Invoice = {
  _id: mongoose.Schema.Types.ObjectId;
  invoiceId: mongoose.Schema.Types.ObjectId;
  name: string;
  quantity: number;
  rate: number;
};

const productSchema = new mongoose.Schema({
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
}, {
  timestamps: true,
});

export default mongoose.model<Invoice>("Product", productSchema);
