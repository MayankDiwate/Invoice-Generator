import { Product } from "@/types/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    products: <Product[]>[],
    total: 0,
    error: null,
    loading: false,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<Product & { total : number }>) {
            state.products.push({
                _id: action.payload._id,
                name: action.payload.name,
                quantity: action.payload.quantity,
                rate: action.payload.rate,
                total: action.payload.total,
                invoiceId: action.payload.invoiceId,
            });

            state.total += action.payload.total;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;