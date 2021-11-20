import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import SizeModal from './sizeModal';
import SelectSize from '../productDetail/SelectSize';
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CarouselModal from '../carousel/carousel';
import ButtonGroups from '../productDetail/ButtonGroups';
import { Link } from 'react-router-dom';
import './modal.css';

function MyVerticallyCenteredModal(props) {

  const sizeArray = [28, 29, 30, 31, 32, 33, 34, 36, 38, 40, 42]
  const lengthArray = [28, 30, 32, 34, 36]

  const dispatch = useDispatch();
  const params = useParams();

  const history = useHistory()

  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart({

      id: props.image[props.index]._id,
      name: props.image[props.index].name,
      price: props.image[props.index].price,
      image: props.image[props.index].images[0].url
    }));

    history.go(0)
  }

  const femaleBottom = ["00", 0, 2, 4, 6, 8, 10, 12, 14, 16]
  const femaleLength = ["Short", "Regular", "Long"]

  const [sizeModalShow, setSizeModalShow] = React.useState(false);

  const [clothSize1, setClothSize1] = React.useState(false)
  const [clothSize2, setClothSize2] = React.useState(false)



  const printButtonLabel1 = (event) => {
    setClothSize1(true);
    console.log(clothSize1, "size state");
    console.log(event.target.name)

  }

  const printButtonLabel2 = (event) => {
    setClothSize2(true);
    console.log(clothSize2, "size state");
    console.log(event.target.name)

  }


  // console.log(props.image[props.index])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ border: "1px solid #fff" }} />
      <Modal.Body>

        <Row>
          <Col lg={6}>
            <CarouselModal index={props.index} image={props.image} />
          </Col>
          <Col lg={6}>
            <p className="productNameText">{props.image[props.index].name}</p>
            <p className="priceText">${props.image[props.index].price}</p>

            {props.image[props.index].gender == "Male" ?
              <React.Fragment>
                <p className="selectLengthSize">Select Waist: <span className="marginRightSizeChart">
                  <span className="sizeChartText" onClick={() => setSizeModalShow(true)}>Size Chart</span>
                </span></p>
                <ButtonGroups
                  buttons={sizeArray}
                  afterClick={printButtonLabel1}
                />


                <p className="mt-1 selectLengthSize">Select Length:</p>
                <ButtonGroups
                  buttons={lengthArray}
                  afterClick={printButtonLabel2}

                /></React.Fragment> :

              //The female Select Size portion 
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
              </React.Fragment>
            }

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
            <Col className="viewFullDetail mt-1">
              <Link to={`${props.image[props.index].gender == "Male" ? "men" : "women"}/${props.index}`}>
                  <span className="viewFullDetail">View full product detail</span>
              </Link>
            </Col>
            <Col>
              <div className="d-grid gap-2 mt-2">
                <button
                  className="addButton"
                  onClick={addToCartHandler}
                  disabled={clothSize1 && clothSize2 ? false : true}
                  className="addButton">ADD TO BAG</button>
              </div>
            </Col>
          </Col>
        </Row>
      </Modal.Body>
      <span className="mb-3"></span>
      <SizeModal
        gender={props.image[props.index].gender}
        show={sizeModalShow}
        onHide={() => setSizeModalShow(false)}
      />
    </Modal>
  );
}

export default MyVerticallyCenteredModal;