import React, { useEffect, useState } from 'react';
import DisplayHomeImg from "./DisplayHomeImg";
import { useSelector, useDispatch } from "react-redux";


const axios = require('axios');

//https://www.youtube.com/watch?v=2mTvWlptD8k&ab_channel=RizwanKhan
//https://stackoverflow.com/questions/11942764/is-it-appropriate-to-merge-guest-user-cart-items-with-items-in-the-cart-when-a-u


const Home = () => {
    const cartItems = useSelector(state => state.cart);

    const [cartOrder, setCartOrder] = useState('');

    useEffect(() => {
        // getCartOrder();
        // getCartOrder();
        checkCartOrder();
    },[])

    


    // const getCartOrder = () => {
    //     axios.get('/api/v1/getcart')
    //     .then(function(response){
    //         const cartOrder = response.data.cart;
    //         setCartOrder(cartOrder)
    //         console.log(response.data.cart , "this is the cart@@@")
    //     }).catch(function(error){
    //         console.log(error)
    //     })
    // }

    
   
    // console.log(cartOrder, "this is the cart order@@@@@@@@@@!!!!!!!!!!!!");

    const orderInfo = JSON.parse(localStorage.getItem('cartItems'));

    // console.log(orderInfo, "this is from the localstroage!~!!!#@#");

    const newOrderInfo = {
        cartItems:[...orderInfo]
    }

    // console.log(newOrderInfo, "this is the newINFO WITH CARTITEMS@@#@#")

    const addCartOrder = () => {
        
    }

    const checkCartOrder = () => {
        if(!cartOrder && orderInfo) {

        }
    }



    // const order = {
    //     cartItems: 
    //     {
    //         product: props.id,
    //         price: props.price,
    //         quantity: 1,
    //         name: props.name,
    //         image: props.image,
    //         waistSize: props.waistSize,
    //         lengthSize: props.lengthSize,
    //         totalPrice: Number(props.totalPrice)
    //     }
    // }

    const getGuestCart = () => {
        axios.post('/api/v1/addguestcart', newOrderInfo)
        .then(function(response){
            console.log(response)
        }).catch(function(error){
            console.log(error)
        })
    }

    return (
        <div>
            {/* <button onClick={getGuestCart}>Add Guest Cart</button> */}
            <DisplayHomeImg></DisplayHomeImg>
        </div>
    )
}

export default Home