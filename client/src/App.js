import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from './component/cart/headerButton'
import ExampleCart from './component/exampleCart';
import NavBarComp from './component/navbar';
import Shop from './component/Shop/Shop';
import Home from './component/home/Home';
import Payment from './component/cart/Payment';
import OrderSuccess from './component/cart/OrderSuccess';
import MyOrders from './component/cart/MyOrders';
import ProductDetail from './component/productDetail/ProductDetail'
import CheckOut from './component/checkout/Checkout';
import Payout from './component/checkout/Payout';
import ReviewOrder from './component/checkout/ReviewOrder';
import { getUsers } from './store/auth-slice';
import { getProduct } from './store/product-slice';
import { getOrder } from './store/order-slice';

import './App.css';

// Payment
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


//lecture 255 useEffect to update cart to backend 
//lecture 262 summary current comment, how to use createAsyncThunk 

// {showCart && <ExampleCart></ExampleCart>}
// <div>Hello there!!!!</div>
// <HeaderButton></HeaderButton>

function App() {

  // const [stripeApiKey, setStripeApiKey] = useState('');
  // const [stripeApiKey, setStripeApiKey] = useState(() => loadStripe('pk_test_51JTW2nLp9coM5IXarRXE3FKA4Df95cADC07u5is7SQRmay7kA2kehNnU5MvYF7ZrunbCIMOuUZhbC1jTC3KjgYwQ00TJS9Ogio'))

  const stripePubKey = 'pk_test_51JTW2nLp9coM5IXarRXE3FKA4Df95cADC07u5is7SQRmay7kA2kehNnU5MvYF7ZrunbCIMOuUZhbC1jTC3KjgYwQ00TJS9Ogio';
  const stripePromise = loadStripe(stripePubKey);

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  const { product } = useSelector(state => state.product)
  const allProduct = useSelector(state => state.product.product.products)
  const orderItems = useSelector(state => state.order.users)

  const [openModal, setOpenModal] = useState(false);

  // console.log(openModal, "this is the app openModal")


  const findMaleProduct = () => {
    if (allProduct) {
      let maleItem = allProduct.filter(data => data.gender === "Male")
      return maleItem
    }
  }

  const findMaleJeansProduct = () => {
    if (allProduct) {
      let maleItem = allProduct.filter(data => data.gender === "Male" && data.category === "Jeans")
      // let maleJeans = maleItem.filter(data => data.category === "Jeans")
      return maleItem
    }
  }
  const findMaleSweatersProduct = () => {
    if (allProduct) {
      let maleItem = allProduct.filter(data => data.gender === "Male")
      let maleSweaters = maleItem.filter(data => data.category === "Sweaters")
      return maleSweaters
    }
  }
  const findMaleShirtsProduct = () => {
    if (allProduct) {
      let maleItem = allProduct.filter(data => data.gender === "Male")
      let maleShirts = maleItem.filter(data => data.category === "Shirts")
      return maleShirts
    }
  }
  const findMaleButtonDownProduct = () => {
    if (allProduct) {
      let maleItem = allProduct.filter(data => data.gender === "Male")
      let maleButtonDown = maleItem.filter(data => data.category === "Button Down Shirts")
      return maleButtonDown
    }
  }

  const findFemaleJeansProduct = () => {
    if (allProduct) {
      let femaleItem = allProduct.filter(data => data.gender === "Female" && data.category === "Jeans")
      return femaleItem
    }
  }

  const findFemaleSweatersProduct = () => {
    if (allProduct) {
      let femaleItem = allProduct.filter(data => data.gender === "Female" && data.category === "Sweaters")
      return femaleItem
    }
  }

  const findFemaleTopsProduct = () => {
    if (allProduct) {
      let femaleItem = allProduct.filter(data => data.gender === "Female" && data.category === "Tops")
      return femaleItem
    }
  }

  const findFemaleDressesProduct = () => {
    if (allProduct) {
      let femaleItem = allProduct.filter(data => data.gender === "Female" && data.category === "Dresses")
      return femaleItem
    }
  }

  const findFemaleProduct = () => {
    if (allProduct) {
      let femaleItem = allProduct.filter(data => data.gender === "Female")
      return femaleItem
    }
  }


  useEffect(() => {
    dispatch(getUsers())
    dispatch(getProduct())
    dispatch(getOrder())

    // async function getStripeApiKey() {
    //   const data = await fetch('/api/v1/stripeapi').then(
    //     res => res.json())
    //   setStripeApiKey(data.stripeApiKey)
    // }
    // getStripeApiKey();

  }, [dispatch])


  const showCart = useSelector(state => state.ui.cartIsVisible)

  return (
    <div>
      {/* {stripeApiKey &&
        <Elements stripe={loadStripe(stripeApiKey)}>
          <NavBarComp auth={auth}></NavBarComp>
        </Elements>} */}
        {/* <NavBarComp auth={auth}></NavBarComp> */}
      <Switch>
        <Route path='/' exact>
          
            
              <NavBarComp auth={auth}></NavBarComp>
            
          <Home></Home>
        </Route>

        <Route path='/men' exact>
          
            
              <NavBarComp auth={auth}></NavBarComp>
            
          {product && <Shop image={findMaleProduct()} gender="men" />}
        </Route>

        <Route path='/men/jeans' exact>
        
            
              <NavBarComp auth={auth}></NavBarComp>
            
          {product && <Shop image={findMaleJeansProduct()} gender="men" cloth="jeans" />}
        </Route>

        <Route path='/men/shirts' exact>
        
            
              <NavBarComp auth={auth}></NavBarComp>
            
          {product && <Shop image={findMaleShirtsProduct()} gender="men" cloth="shirts" />}
        </Route>

        <Route path='/men/sweaters' exact>
        
            
              <NavBarComp auth={auth}></NavBarComp>
            
          {product && <Shop image={findMaleSweatersProduct()} gender="men" cloth="sweaters" />}
        </Route>

        <Route path='/men/buttonDownShirts' exact>
        
            
              <NavBarComp auth={auth}></NavBarComp>
           
          {product && <Shop image={findMaleButtonDownProduct()} gender="men" cloth="buttonDownShirts" />}
        </Route>

        <Route path='/men/jeans/:productId'>
       
           
              <NavBarComp auth={auth}></NavBarComp>
            
          {product && <ProductDetail image={findMaleJeansProduct()}></ProductDetail>}
        </Route>

        <Route path='/men/shirts/:productId'>
       
            
              <NavBarComp auth={auth}></NavBarComp>
            
          {product && <ProductDetail image={findMaleShirtsProduct()}></ProductDetail>}
        </Route>

        <Route path='/men/sweaters/:productId'>
        
           
              <NavBarComp auth={auth}></NavBarComp>
            
          {product && <ProductDetail image={findMaleSweatersProduct()}></ProductDetail>}
        </Route>

        <Route path='/men/buttonDownShirts/:productId'>

              <NavBarComp auth={auth}></NavBarComp>
           
          {product && <ProductDetail image={findMaleButtonDownProduct()}></ProductDetail>}
        </Route>

        <Route path='/men/:detailId'>

              <NavBarComp auth={auth}></NavBarComp>
        
          {product && <ProductDetail image={findMaleProduct()}></ProductDetail>}
        </Route>

        <Route path='/women/jeans' exact>

              <NavBarComp auth={auth}></NavBarComp>
     
          {product && <Shop image={findFemaleJeansProduct()} gender="women" cloth="jeans" />}
        </Route>

        <Route path='/women/sweaters' exact>

              <NavBarComp auth={auth}></NavBarComp>

          {product && <Shop image={findFemaleSweatersProduct()} gender="women" cloth="sweaters" />}
        </Route>

        <Route path='/women/tops' exact>

              <NavBarComp auth={auth}></NavBarComp>

          {product && <Shop image={findFemaleTopsProduct()} gender="women" cloth="tops" />}
        </Route>

        <Route path='/women/dresses' exact>

              <NavBarComp auth={auth}></NavBarComp>

          {product && <Shop image={findFemaleDressesProduct()} gender="women" cloth="dresses" />}
        </Route>

        <Route path='/women/jeans/:productId'>

              <NavBarComp auth={auth}></NavBarComp>

          {product && <ProductDetail image={findFemaleJeansProduct()}></ProductDetail>}
        </Route>

        <Route path='/women/sweaters/:productId'>

              <NavBarComp auth={auth}></NavBarComp>

          {product && <ProductDetail image={findFemaleSweatersProduct()}></ProductDetail>}
        </Route>

        <Route path='/women/tops/:productId'>

              <NavBarComp auth={auth}></NavBarComp>

          {product && <ProductDetail image={findFemaleTopsProduct()}></ProductDetail>}
        </Route>

        <Route path='/women/dresses/:productId'>

              <NavBarComp auth={auth}></NavBarComp>

          {product && <ProductDetail image={findFemaleDressesProduct()}></ProductDetail>}
        </Route>

        <Route path='/women' exact>

              <NavBarComp auth={auth}></NavBarComp>

          {product && <Shop image={findFemaleProduct()} gender="women" />}
        </Route>

        <Route path='/women/:detailId'>

              <NavBarComp auth={auth}></NavBarComp>

          {product && <ProductDetail image={findFemaleProduct()}></ProductDetail>}
        </Route>

        <Route path='/success' exact>

              <NavBarComp auth={auth}></NavBarComp>

          <OrderSuccess></OrderSuccess>
        </Route>

        <Route path='/orders/me' exact>

              <NavBarComp auth={auth}></NavBarComp>

          {orderItems && auth && <MyOrders></MyOrders>}
        </Route>

        <Route path='/revieworder' exact>

              <NavBarComp auth={auth} openModal={openModal} setOpenModal={setOpenModal}></NavBarComp>

          <ReviewOrder></ReviewOrder>
        </Route>

        <Route path='/checkout' exact>

              <NavBarComp auth={auth} openModal={openModal} setOpenModal={setOpenModal}></NavBarComp>

          <CheckOut></CheckOut>
        </Route>

        <Route path='/payout' exact>
            {/* {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payout setOpenModal={setOpenModal}></Payout>
            </Elements>} */}

            {/* <Elements stripe={loadStripe(stripeApiKey)}>
              <Payout setOpenModal={setOpenModal}></Payout>
            </Elements> */}

            
            <Elements stripe={stripePromise}>
              <Payout setOpenModal={setOpenModal}></Payout>
            </Elements>
        </Route>

      </Switch>
    </div>

  );
}

export default App;
