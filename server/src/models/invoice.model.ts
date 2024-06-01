import mongoose from "mongoose";

export type Invoice = {
  _id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  invoiceName: string;
};

const invoiceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  invoiceName: {
    type: String,
    required: [true, "Username is required"],
  },
}, {
  timestamps: true,
});

export default mongoose.model<Invoice>("Invoice", invoiceSchema);
