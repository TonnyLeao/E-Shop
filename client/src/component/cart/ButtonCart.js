import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BsBag } from "react-icons/bs";
import { useHistory } from 'react-router'
import './ButtonCart.css';

const axios = require('axios');

const ButtonCart = () => {

    const history = useHistory()

    const auth = useSelector(state => state.auth)
    const cartQuantity = useSelector(state => state.cart.totalQuanity)
    const [cartOrder, setCartOrder] = useState('');

    const buttonHandler = () => {
        history.push('/revieworder');
    }

    const getCartOrder = async() => {
        await axios.get('/api/v1/getcart')
        .then(function(response){
            const cartOrder = response.data.cart;
            setCartOrder(cartOrder)
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


    return (
        <React.Fragment>
            <button onClick={buttonHandler} 
                className="buttonSize">
                <BsBag></BsBag>
                <span className={cartQuantity > 0 ? "dot" : ""}>
                    {auth.users == false && <span className="dotText">{cartQuantity > 0 ? cartQuantity : ""}</span>}
                    {/* {auth.status == "success" && <span className="dotText">{cartOrder && totalQtyBackEnd}</span>} */}
                </span>
                {cartOrder && <span className={ totalQtyBackEnd > 0 ? "dot" : ""}>
                    {auth.status == "success" && <span className="dotText">{cartOrder && totalQtyBackEnd > 0 ? totalQtyBackEnd : ""}</span>}
                </span>}
            </button>
            
        </React.Fragment>
    )
}

export default ButtonCart;