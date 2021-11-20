import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button';
import SizeModal from './sizeModal';
import SelectSize from '../productDetail/SelectSize';
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CarouselModal from '../carousel/carousel';
import ButtonGroups from '../productDetail/ButtonGroups';
import { Link } from 'react-router-dom';
import './offCanvas.css';

const axios = require('axios');

function OffCanvas({ name, ...props }) {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // console.log(props.image[props.index], "this is the offcan")

  const auth = useSelector(state => state.auth)
  const sizeArray = [28, 29, 30, 31, 32, 33, 34, 36, 38, 40, 42]
  const lengthArray = [28, 30, 32, 34, 36]

  const femaleTopSize = ["XXS", "XS", "S", "M", "L", "XL"]
  const maleTopSize = ["XS", "S", "M", "L", "XL", "XXL"]
  const maleLength = ["Tall", "Regular"]

  const dispatch = useDispatch();
  const params = useParams();

  const history = useHistory()

  const addToCartHandler = () => {

    if (auth.users == false) {
      dispatch(cartActions.addItemToCart({

        id: props.image[props.index]._id,
        name: props.image[props.index].name,
        price: props.image[props.index].price,
        image: props.image[props.index].images[0].url,

        //new stuff under
        waistSize: cloth2State,
        lengthSize: cloth1State,

      }));
    }

    const order = {
      cartItems:
      {
        product: props.image[props.index]._id,
        price: props.image[props.index].price,
        quantity: 1,
        name: props.image[props.index].name,
        image: props.image[props.index].images[0].url,
        waistSize: cloth2State,
        lengthSize: cloth1State,
        totalPrice: props.image[props.index].price,
        gender: props.image[props.index].gender,
        category: props.image[props.index].category
      }
    }



    if (auth.status == "success") {
      axios.post('/api/v1/addtocart', order
      )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    history.go(0)
  }

  const femaleBottom = ["00", 0, 2, 4, 6, 8, 10, 12, 14, 16]
  const femaleLength = ["Short", "Regular", "Long"]

  const [sizeModalShow, setSizeModalShow] = React.useState(false);

  const [clothSize1, setClothSize1] = React.useState(false)
  const [clothSize2, setClothSize2] = React.useState(false)

  const [cloth1State, setCloth1State] = React.useState("");
  const [cloth2State, setCloth2State] = React.useState("");



  const printButtonLabel1 = (event) => {
    setClothSize1(true);
    setCloth1State(event.target.getAttribute('name'));

  }

  const printButtonLabel2 = (event) => {
    setClothSize2(true);
    setCloth2State(event.target.getAttribute('name'));
  }

  return (
    <>
      {/* <Button variant="dark" onClick={handleShow} 
        className="me-2 overlayHover">
          {name}
        </Button> */}
      <Offcanvas show={props.show} onHide={props.handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="offCanvasTitle">
            <Col xs={12}>
              <p>{props.image[props.index].name}</p>
            </Col>
          </Offcanvas.Title>

        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row>
            <Col lg={12}>
              <CarouselModal index={props.index} image={props.image} />
            </Col>
            <Col lg={12} className="mt-3">
              <p className="priceText">${props.image[props.index].price}</p>
              {/* new stuff */}
              {props.image[props.index].gender === "Male" && props.image[props.index].category === "Jeans" &&
                <React.Fragment>
                  <p className="selectLengthSize">Select Waist: <span className="marginRightSizeChart">
                    <span className="sizeChartText" onClick={() => setSizeModalShow(true)}>Size Chart</span>
                  </span></p>
                  <ButtonGroups
                    buttons={sizeArray}
                    afterClick={printButtonLabel1}
                  />
                  <p className="mt-2 selectLengthSize">Select Length:</p>
                  <ButtonGroups
                    buttons={lengthArray}
                    afterClick={printButtonLabel2}

                  /></React.Fragment>}

              {props.image[props.index].gender === "Male" && props.image[props.index].category !== "Jeans" &&
                <React.Fragment>
                  <Row className="mb-2">
                    <Col xs={9}>
                      <span className="selectSizeFont">Select Size:</span>
                      <SelectSize
                        buttons={maleLength}
                        afterClick={printButtonLabel1}
                      />
                    </Col>

                    <Col className="sizeChartFloatRight">
                      <span className="sizeChartText" onClick={() => setSizeModalShow(true)}>Size Chart</span>
                    </Col>
                  </Row>
                  <ButtonGroups
                    buttons={maleTopSize}
                    afterClick={printButtonLabel2}
                  />
                </React.Fragment>}

              {/* new stuff women */}
              {props.image[props.index].gender === "Female" && props.image[props.index].category === "Jeans" &&
                <React.Fragment>
                  <Row className="mb-2">
                    <Col xs={9}>
                      <span className="selectSizeFont">Select Size:</span>
                      <SelectSize
                        buttons={femaleLength}
                        afterClick={printButtonLabel1}
                      />
                    </Col>

                    <Col className="sizeChartFloatRight">
                      <span className="sizeChartText" onClick={() => setSizeModalShow(true)}>Size Chart</span>
                    </Col>
                  </Row>
                  <ButtonGroups
                    buttons={femaleBottom}
                    afterClick={printButtonLabel2}
                  />
                </React.Fragment>}
              {props.image[props.index].gender === "Female" && props.image[props.index].category !== "Jeans" &&
                <React.Fragment>
                  <Row className="mb-2">
                    <Col className="sizeChartNoFloat">
                      <span className="selectSizeFont">Select Size:</span>
                      <span className="sizeChartText" onClick={() => setSizeModalShow(true)}>Size Chart</span>
                    </Col>
                  </Row>
                  <ButtonGroups
                    buttons={femaleTopSize}
                    afterClick={printButtonLabel1}
                  />
                </React.Fragment>}

              {/* <div className="buttonSpace">
              <ButtonGroups
                buttons={sizeArray}
                afterClick={printButtonLabel}
              />
            </div>

            <p className="mt-1">Select Length:</p>
            <div className="buttonSpace">
            <ButtonGroups
              buttons={lengthArray}
              afterClick={printButtonLabel}

            />
            </div> */}
              <Col className="viewFullDetail mt-3 mb-3">
                <Link to={`${props.image[props.index].category.replace(/ /g, '')}/${props.image[props.index]._id}`}>
                  <span className="viewFullDetail">View full product detail</span>
                </Link>
              </Col>
              <Col>
                <div className="d-grid gap-2 mt-4">
                  {props.image[props.index].gender === "Female" && props.image[props.index].category !== "Jeans" ?
                    <button
                      className="addButton"
                      onClick={addToCartHandler}
                      disabled={clothSize1 ? false : true}
                      className="addButton">ADD TO BAG</button>
                    :
                    <button
                      className="addButton"
                      onClick={addToCartHandler}
                      disabled={clothSize1 && clothSize2 ? false : true}
                      className="addButton">ADD TO BAG</button>
                  }
                </div>
              </Col>
            </Col>
          </Row>
        </Offcanvas.Body>
        <span className="mb-3"></span>
        <SizeModal
          gender={props.image[props.index].gender}
          show={sizeModalShow}
          onHide={() => setSizeModalShow(false)}
        />
      </Offcanvas>
    </>
  );
}

//   function Example() {
//     return (
//       <>

//           <OffCanvas placement="end" name="Quick Shop" />

//       </>
//     );
//   }

export default OffCanvas;
