import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/example-slice';
import CartIcon from './CartIcon';

const axios = require('axios');

const HeaderButton = (props) => {
    const dispatch = useDispatch();
    const cartQuantity = useSelector(state => state.cart.totalQuanity)
    const auth = useSelector(state => state.auth)

    const [cartOrder, setCartOrder] = useState('');

    const toogleHeaderButton = () => {
        dispatch(uiActions.toggle());
    }

    const getCartOrder = async() => {
        await axios.get('/api/v1/getcart')
        .then(function(response){
            const cartOrder = response.data.cart;
            setCartOrder(cartOrder)
            console.log(response.data.cart , "this is the cart@@@")
        }).catch(function(error){
            console.log(error)
        })
    }

    useEffect(() => {
        getCartOrder()
    },[])

    let arrayQtyBackEnd = [];
    let totalQtyBackEnd;

    if(cartOrder && cartOrder.cartItems.length > 0) {
        for (let i = 0; i < cartOrder.cartItems.length; i++) {
            arrayQtyBackEnd.push(cartOrder.cartItems[i].quantity)
            
        }
       
         totalQtyBackEnd = arrayQtyBackEnd.reduce(function(acc, cur) {
            return acc + cur
        })
    }

    
    
   

    // <Button variant="primary" onClick={toogleHeaderButton}>Cart button!</Button>{' '}

    return (
        <button onClick={props.onClick}>
            <span><CartIcon></CartIcon></span>
            <span>Your Cart</span>
            {auth.users == false && <span> {cartQuantity}</span>}
            {auth.status == "success" && <span> {cartOrder && totalQtyBackEnd}</span>}
        </button>   
    )        
}


export default HeaderButton;