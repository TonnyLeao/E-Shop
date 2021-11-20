import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProduct = createAsyncThunk(
    "user/getProduct",
    async(dispatch, getProduct) => {
        return await fetch('/api/v1/products')
        .then(
            res => res.json()
        );
    }
)

export const getMaleProduct = createAsyncThunk(
    "user/getMaleProduct",
    async(dispatch, getMaleProduct) => {
        return await fetch('/api/v1/products/male')
        .then(
            res => res.json()
        );
    }
)

export const getFemaleProduct = createAsyncThunk(
    "user/getFemaleProduct",
    async(dispatch, getFemaleProduct) => {
        return await fetch('/api/v1/products/female')
        .then(
            res => res.json()
        );
    }
)


const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: false,
        status: null
    },
    extraReducers: {
        [getProduct.pending]: (state, action) => {
            state.status = "loading"
        },
        [getProduct.fulfilled]: (state, action) => {
            state.status = "success"
            state.product = action.payload 
        },
        [getProduct.rejected]: (state, action) => {
            state.status = "failed"
            state.product = false
        },
        [getMaleProduct.pending]: (state, action) => {
            state.status = "loading"
        },
        [getMaleProduct.fulfilled]: (state, action) => {
            state.status = "success"
            state.product = action.payload 
        },
        [getMaleProduct.rejected]: (state, action) => {
            state.status = "failed"
            state.product = false
        },
        [getFemaleProduct.pending]: (state, action) => {
            state.status = "loading"
        },
        [getFemaleProduct.fulfilled]: (state, action) => {
            state.status = "success"
            state.product = action.payload 
        },
        [getFemaleProduct.rejected]: (state, action) => {
            state.status = "failed"
            state.product = false
        },
    }

})

// export const authActions = authSlice.actions;

export default productSlice;