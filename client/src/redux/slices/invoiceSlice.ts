import { Invoice } from "@/types/Invoice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  invoices: <Invoice[]>[],
  error: null,
  loading: false,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoices.push(action.payload);
      state.loading = false;
      state.error = null;
    },
  },
});

export const { addInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
