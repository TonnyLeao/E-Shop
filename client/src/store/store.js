import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './example-slice';
import cartSlice from './cart-slice';
import authSlice from './auth-slice';
import productSlice from './product-slice';
import orderSlice from './order-slice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    product: productSlice.reducer,
    order: orderSlice.reducer
  },
})

export default store;