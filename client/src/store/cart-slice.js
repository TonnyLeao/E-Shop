import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        totalQuanity: localStorage.getItem('totalQuanity') ? JSON.parse(localStorage.getItem('totalQuanity')) : 0,
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},

    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => (item.id === newItem.id && item.waistSize === newItem.waistSize && item.lengthSize === newItem.lengthSize));
            state.totalQuanity++;

            if(!existingItem) {
                state.items.push({
                    id: newItem.id, 
                    price: newItem.price.toFixed(2),
                    quantity: 1, 
                    totalPrice: newItem.price,
                    name: newItem.name,
                    image: newItem.image,

                    //under is new
                    waistSize: newItem.waistSize,
                    lengthSize: newItem.lengthSize,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += Number(newItem.price)
                // existingItem.totalPrice += newItem.price;
            }

            localStorage.setItem('cartItems', JSON.stringify(state.items))
            localStorage.setItem('totalQuanity', JSON.stringify(state.totalQuanity))
        },
        removeItemFromCart(state, action) {
            const newItem = action.payload
            
            console.log(newItem.id, "this is newItem length");

            // const id = action.payload.id;
            // const waist = action.payload.waistSize;
            // const length = action.payload.lengthSize;

            const existingItem = state.items.find(item => (item.id === newItem.id && item.waistSize === newItem.waistSize && item.lengthSize ===newItem.lengthSize));
            state.totalQuanity--;

            if(existingItem.quantity === 1) {
                
                console.log(state.items.indexOf(existingItem));
                console.log(state.items.length, "this is the length")

                state.items.splice(state.items.indexOf(existingItem), 1)

                // if(state.items.length === 1) {
                //     console.log("The length was one!")
                //     state.items = state.items.filter(item => (( item.waistSize !== newItem.waistSize && item.lengthSize !== newItem.lengthSize)));
                // } else {
                //     console.log("The length is not one")
                //     state.items = state.items.splice(state.items.indexOf(existingItem), 1)
                // }

                

                // state.items = state.items.filter(item => (( item.id !== newItem.id && item.waistSize !== newItem.waistSize && item.lengthSize !== newItem.lengthSize)));


            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }

            localStorage.setItem('cartItems', JSON.stringify(state.items))
            localStorage.setItem('totalQuanity', JSON.stringify(state.totalQuanity))
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice;