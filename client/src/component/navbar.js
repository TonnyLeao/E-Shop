import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HeaderButton from './cart/headerButton';
import CartModal from './modal/cartModal';
import LoginModal from './modal/LoginModal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import './navbar.css';
import Button from 'react-bootstrap/esm/Button';
import ButtonCart from './cart/ButtonCart';
import { MdAccountCircle } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router'

const axios = require('axios');

const NavBarComp = (props) => {

    const auth = useSelector(state => state.auth)
    
    const history = useHistory()
    const [modalShow, setModalShow] = useState(false);
    const [modalLogin, setLoginModal] = useState(false);

    const [cartOrder, setCartOrder] = useState('');

    const runOnce = () => {
        setModalShow(true);
        props.setOpenModal(false);
    }

    useEffect(() => {
    {props.openModal && runOnce()}
    getCartOrder()
    }, [])

    
    const localOrder = JSON.parse(localStorage.getItem('cartItems'));

    let newOrderInfo

    if(localOrder) {
         newOrderInfo = {
            cartItems:[...localOrder]
        }
        console.log(localOrder, "IF localOrder exist!!!!")
    }

    // const newOrderInfo = {
    //     cartItems:[...localOrder]
    // }

    console.log(localOrder, "LocalStorage Info")

    const getCartOrder = async() => {

        let waitForCart;
        let cartTotalQty = 0
        let localTotalQty = 0;

        if(localOrder.length > 0) {
            console.log("@@@@@@@@@@@@@@@@@@LOCAL IS NOT ZEROOOO@@@@@@@@@@@@@@")

            await axios.get('/api/v1/getcart')
                .then(function(response){
                waitForCart = response.data.cart
                console.log(waitForCart.cartItems, "this is the WAIT FOR CART!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            

            for (let i = 0; i < waitForCart.cartItems.length; i++) {
                cartTotalQty = cartTotalQty + waitForCart.cartItems[i].quantity
                console.log(cartTotalQty, "this is the cart Total Qty!");
                
            }

            for (let i = 0; i < localOrder.length; i++) {
                localTotalQty = localTotalQty + localOrder[i].quantity
                console.log(localTotalQty, "this is the LOCAL Total Qty!");
            }

            console.log(cartTotalQty, "THIS IS THE MAP FUNCTION^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
            const cartOrder =  response.data.cart;
            setCartOrder(cartOrder)
            console.log(response.data.cart , "this is the cart@@@")
        }).catch(function(error){
            console.log(error)
        })
        
            if(auth) {

                axios.post('/api/v1/addguestcart', newOrderInfo)
                    .then(function(response){
                        console.log(response)
                    }).catch(function(error){
                        console.log(error)
                })
            }

            localStorage.setItem('cartItems',JSON.stringify([]))
            localStorage.setItem('totalQuanity', JSON.stringify(0))

            history.go(0)
        } 

        // await axios.get('/api/v1/getcart')
        // .then(function(response){
        //     waitForCart = response.data.cart
        //     console.log(waitForCart.cartItems, "this is the WAIT FOR CART!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            

        //     for (let i = 0; i < waitForCart.cartItems.length; i++) {
        //         cartTotalQty = cartTotalQty + waitForCart.cartItems[i].quantity
        //         console.log(cartTotalQty, "this is the cart Total Qty!");
                
        //     }

        //     for (let i = 0; i < localOrder.length; i++) {
        //         localTotalQty = localTotalQty + localOrder[i].quantity
        //         console.log(localTotalQty, "this is the LOCAL Total Qty!");
        //     }

        //     console.log(cartTotalQty, "THIS IS THE MAP FUNCTION^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
        //     const cartOrder =  response.data.cart;
        //     setCartOrder(cartOrder)
        //     console.log(response.data.cart , "this is the cart@@@")
        // }).catch(function(error){
        //     console.log(error)
        // })  

        // if(auth.users.googleId && !waitForCart) {
        
        //     console.log(cartOrder, "THIS IS THE CARTORDER STATE@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        //     console.log("U ARE LOGGED IN GOOGLE AND THERE IS NO CARTORDER IN THE BACKKKKKKKKK")

        //     axios.post('/api/v1/addguestcart', newOrderInfo)
        //     .then(function(response){
        //         console.log(response)
        //     }).catch(function(error){
        //         console.log(error)
        // })
        // } if(auth.users.googleId && localTotalQty !== cartTotalQty) {
        //     console.log("YOU ARE LOGGED IN AND THE LOCAL DOES NOT MATCH THE BACKEND")

        //     axios.post('/api/v1/addguestcart', newOrderInfo)
        //     .then(function(response){
        //         console.log(response)
        //     }).catch(function(error){
        //         console.log(error)
        //     })
        // }

        // localStorage.setItem('cartItems',JSON.stringify([]))
        // localStorage.setItem('totalQuanity', JSON.stringify(0))
    }
    
    const getGuestCart = async() => {

            const postCartOrder = await axios.post('/api/v1/addguestcart', newOrderInfo)
            .then(function(response){
                console.log(response)
            }).catch(function(error){
                console.log(error)
        })
        
        return postCartOrder
    }

    const logOutHandler = () => {
        localStorage.setItem('cartItems',JSON.stringify([]))
        localStorage.setItem('totalQuanity', JSON.stringify(0))
    }

    
    if(props.openLogin == true) {
        console.log(modalLogin, "what is the modal Login?")
    }

   
    
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">E-Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto navHeaderSpace mx-auto" variant="tabs">
                        {/* <Nav.Link className="mx-5" href="/men">Men</Nav.Link> */}

                        <NavDropdown className="mx-5" title="Men" id="basic-nav-dropdown-Men">
                            <Row className="row1">
                                <Col>
                                    <Dropdown.Header className="dropDownWidth">Shop by Category</Dropdown.Header>
                                </Col>
                                
                                <Col className="column1">
                                    <NavDropdown.Item href="/men/jeans">Jeans</NavDropdown.Item>
                                    <NavDropdown.Item href="/men/shirts">Shirts</NavDropdown.Item>
                                    <NavDropdown.Item href="/men/sweaters">Sweaters</NavDropdown.Item>
                                    <NavDropdown.Item href="/men/buttonDownShirts">Button Down Shirts</NavDropdown.Item>
                                </Col>
                                <Col className="column1 categoryPictureAlign">
                                    <img className="categoryPicture" src="/shopIMG/menIMG/menCloth1.png"></img>
                                </Col>
                            </Row>
                        </NavDropdown>

                        <NavDropdown className="mx-5" title="Women" id="basic-nav-dropdown-Women">
                            <Row className="row1">
                                <Col>
                                    <Dropdown.Header className="dropDownWidth">Shop by Category</Dropdown.Header>
                                </Col>
                                
                                <Col className="column1">
                                    <NavDropdown.Item href="/women/jeans">Jeans</NavDropdown.Item>
                                    <NavDropdown.Item href="/women/sweaters">Sweaters</NavDropdown.Item>
                                    <NavDropdown.Item href="/women/tops">Tops</NavDropdown.Item>
                                    <NavDropdown.Item href="/women/dresses">Dresses</NavDropdown.Item>
                                </Col>
                                <Col className="column1 categoryPictureAlign">
                                    <img className="categoryPicture" src="/shopIMG/womenIMG/womenshop2.png"></img>
                                </Col>
                            </Row>
                        </NavDropdown>

                        {/* <Nav.Link className="mx-5" href="/women" eventKey="women">Women</Nav.Link> */}

                        {/* <img className="userPhoto" src={props.auth.users.userPhoto || "https://lh3.googleusercontent.com/a/AATXAJzH7M6DjQ6Va5IkS1ks7adUy6L0XIqZwBW5rAXI=s96-c"}></img> */}
                        {props.auth.users && <NavDropdown className="mx-5" title={<MdAccountCircle className="accountPictureSize"></MdAccountCircle>} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/orders/me">Account</NavDropdown.Item>
                            <NavDropdown.Item href="/orders/me">My Order</NavDropdown.Item>
                            <NavDropdown.Item href="/api/logout"><button className="logoutButton" onClick={logOutHandler}>Sign Out</button></NavDropdown.Item>
                        </NavDropdown>}
                        {/* {props.auth.users && <Nav.Link className="mx-5" href=""><img className="userPhoto" src={props.auth.users.userPhoto}></img></Nav.Link>} */}
                        {/* {props.auth.users && <Nav.Link className="mx-5" href="/api/logout">Logout</Nav.Link>} */}
                        {!props.auth.users && <Nav.Link className="loginMarinLeft" onClick={() => setLoginModal(true)}>Log In</Nav.Link> }
                        
                    </Nav>

                </Navbar.Collapse>

                <ButtonCart></ButtonCart>

                {/* <HeaderButton onClick={() => setModalShow(true)}></HeaderButton> */}
                
            </Container>
            {/* <CartModal
                auth={props.auth}
                show={modalShow}
                onHide={() => setModalShow(false)}
                showLogin={() => setLoginModal(true)}
            ></CartModal> */}
            <LoginModal
                show={modalLogin}
                onHide={() => setLoginModal(false)}
            ></LoginModal>
        </Navbar>)
}

export default NavBarComp;
