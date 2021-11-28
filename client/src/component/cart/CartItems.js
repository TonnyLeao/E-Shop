import React, {useState, useEffect} from "react"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import './CartItems.css';

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { useHistory } from 'react-router'


const axios = require('axios');

const CartItems = (props) => {

    const [addButton, setAddButton] = useState(false);
    const [removeButton, setRemoveButton] = useState(false);

    const auth = useSelector(state => state.auth)

    const history = useHistory()

    const dispatch = useDispatch();

    useEffect(() => {
        
    }, [])
    

    const removeItemHandler = async() => {
        if(props.quantity !== 1){
            setRemoveButton(true);
        }
        
        const order = {
            cartItems: 
            {
                product: props.id,
                price: Number(props.price),
                quantity: 1,
                waistSize: props.waistSize,
                lengthSize: props.lengthSize,
                gender: props.gender,
                category: props.category
                
            }
        }

        console.log(order, "~~~~~~~~~~~~~~~~~~~~~~~~~~~ORDER FROM THE REMOVE HANDLER~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        if(auth.status == "success"){
            axios.post('/api/v1/removeitem', order
        )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            history.go(0)
        }
        

        
        setRemoveButton(false);
        
        if(auth.users == false) {
            dispatch(cartActions.removeItemFromCart({
                id: props.id,
                waistSize: props.waistSize,
                lengthSize: props.lengthSize,
            }))

        }
        
        
        // props.id
    
        
    }

    console.log(Number(props.price) + Number(props.price))

    const addItemHandler = async() => {

        setAddButton(true);

        console.log(props, "this is the prop stuff@#@#@#")

        const order = {
            cartItems: 
            {
                product: props.id,
                price: props.price,
                quantity: 1,
                name: props.name,
                image: props.image,
                waistSize: props.waistSize,
                lengthSize: props.lengthSize,
                totalPrice: Number(props.totalPrice),
                gender: props.gender,
                category: props.category
            }
        }

        if(auth.status == "success"){
             axios.post('/api/v1/addtocart', order
        )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            history.go(0)
        }
        
        setAddButton(false);
        
        if(auth.users == false) {
            dispatch(cartActions.addItemToCart({
                id: props.id,
                name: props.name,
                price: props.price,
                image: props.image,
                gender: props.gender,
    
                //new stuff under
                waistSize: props.waistSize,
                lengthSize: props.lengthSize,
    
            }))
        }
    
    }

    

    return(
        <React.Fragment key={props.index}>
            <Row className="mt-3">
            <Col sm={2}>
                <img className="cartImg" src={props.image}></img>
                
            </Col>
            <Col sm={5}>
                <p className="reviewCartText">{props.name}</p>
                <p className="reviewCartText">Size:{' '}
                    {!isNaN(props.lengthSize) && props.gender !== "Female" && ("W" + props.lengthSize)} 
                    {!isNaN(props.lengthSize) && props.gender === "Female" && props.category === "Jeans" && (props.lengthSize)} 
                    {isNaN(props.lengthSize) && props.lengthSize} {' '}
                    {!isNaN(props.waistSize) && props.waistSize.length > 0 && ("L" + props.waistSize)} 
                    <span>{isNaN(props.waistSize) && props.category === "Jeans" && props.waistSize}</span>
                    <span>{isNaN(props.waistSize) && props.gender === "Male" && props.waistSize}</span>
                    </p> 
                    
                <p className="reviewCartText">Price: {props.price}</p>
            </Col>
            <Col>
                <p className="reviewCartText"><button className="addLeftCartButton" disabled={removeButton} onClick={removeItemHandler}>-</button>  {props.quantity}  <button className="addRightCartButton" disabled={addButton} onClick={addItemHandler}>+</button></p>
            </Col>
            <Col>
                <p className="reviewCartTextBold">${props.totalPrice.toFixed(2)}</p>
            </Col>
            <hr className="payoutHr"></hr>
            </Row>
            
        </React.Fragment>
    )
}

export default CartItems;