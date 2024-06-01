import { Product } from "@/types/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    products: <Product[]>[],
    error: null,
    loading: false,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<Product>) {
            state.products.push(action.payload);

            state.loading = false;
            state.error = null;
        },
    },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;