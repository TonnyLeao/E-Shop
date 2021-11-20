import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const axios = require('axios');

export const getOrder = createAsyncThunk(
    "user/getOrder",
    async(dispatch, getState) => {
        return await fetch('/api/v1/orders/me')
        .then(
            res => res.json()
        );
    }
)



const orderSlice = createSlice({
    name: 'order',
    initialState: {},
    extraReducers: {
        [getOrder.pending]: (state, action) => {
            state.status = "loading"
        },
        [getOrder.fulfilled]: (state, action) => {
            state.status = "success"
            state.users = action.payload 
        },
        [getOrder.rejected]: (state, action) => {
            state.status = "failed"
            state.users = false
        }
    }

})

// const {createOrder} = orderSlice.actions
// export const {createOrder} = actions

// export const authActions = authSlice.actions;

export default orderSlice;