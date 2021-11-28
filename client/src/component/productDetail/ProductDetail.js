import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import CarouselModal from '../carousel/carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReviewModal from '../modal/reviewModal'
import ReviewProduct from '../review/ReviewProduct';
import SizeModal from '../modal/sizeModal';
import ButtonGroups from './ButtonGroups';
import SelectSize from './SelectSize';
import AccordionShipping from './AccordionShipping';
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import { BsArrowLeftRight } from "react-icons/bs";
import { FaTemperatureLow } from "react-icons/fa"
import { MdLocalLaundryService } from "react-icons/md"
import { FaGlobeAmericas } from "react-icons/fa"
import Rating from 'react-rating';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa"
import './ProductDetail.css';

const axios = require('axios');


//https://dev.to/ramonak/react-how-to-create-a-custom-button-group-component-in-5-minutes-3lfd

const ProductDetail = (props) => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const params = useParams();

    const sizeArray = [28, 29, 30, 31, 32, 33, 34, 36, 38, 40, 42]
    const lengthArray = [28, 30, 32, 34, 36]

    const femaleBottom = ["00", 0, 2, 4, 6, 8, 10, 12, 14, 16]
    const femaleLength = ["Short", "Regular", "Long"]

    const femaleTopSize = ["XXS", "XS", "S", "M", "L", "XL"]
    const maleTopSize = ["XS", "S", "M", "L", "XL", "XXL"]
    const maleLength = ["Tall", "Regular"]


    const [modalShow, setModalShow] = React.useState(false);

    const [sizeModalShow, setSizeModalShow] = React.useState(false);

    const [clothSize1, setClothSize1] = React.useState(false)
    const [clothSize2, setClothSize2] = React.useState(false)

    const [cloth1State, setCloth1State] = React.useState("");
    const [cloth2State, setCloth2State] = React.useState("Regular");

    // console.log(clothSize1, "starting")
    // console.log(clothSize2, "starting")

    const history = useHistory()

    const printButtonLabel1 = (event) => {
        setClothSize1(true);
        setCloth1State(event.target.getAttribute('name'));
    }

    const printButtonLabel2 = (event) => {
        setClothSize2(true);
        setCloth2State(event.target.getAttribute('name'));
    }

    // console.log(props.image[params.detailId].gender)
    let idArr = [];
    for (let i = 0; i < props.image.length; i++) {
        idArr.push(props.image[i]._id);
    }

    console.log(props.image[idArr.indexOf(params.productId)]._id, "this is the ID ON PRODUCT DETAIL@@@@@@@@!")

    const addToCartHandler = () => {

        if(auth.users == false) {
            dispatch(cartActions.addItemToCart({
                id: props.image[idArr.indexOf(params.productId)]._id,
                name: props.image[idArr.indexOf(params.productId)].name,
                price: props.image[idArr.indexOf(params.productId)].price,
                image: props.image[idArr.indexOf(params.productId)].images[0].url,
    
                //new stuff under
                waistSize: cloth2State,
                lengthSize: cloth1State,
    
            }));
        }
        

        const order = {
            cartItems: 
            {
                product: props.image[idArr.indexOf(params.productId)]._id,
                price: props.image[idArr.indexOf(params.productId)].price,
                quantity: 1,
                name: props.image[idArr.indexOf(params.productId)].name,
                image: props.image[idArr.indexOf(params.productId)].images[0].url,
                waistSize: cloth2State,
                lengthSize: cloth1State,
                totalPrice: props.image[idArr.indexOf(params.productId)].price,
                gender: props.image[idArr.indexOf(params.productId)].gender,
                category: props.image[idArr.indexOf(params.productId)].category
            }
        }

        
        
        if(auth.status == "success") {
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



    // console.log(idArr.indexOf(params.productId), "does this work!?");

    return (
        <React.Fragment>
            <Container className="mt-5">
                <Row>
                    <Col lg={7}>
                        <CarouselModal index={idArr.indexOf(params.productId)} image={props.image}></CarouselModal>
                    </Col>
                    <Col lg={4}>
                        <h3>{props.image[idArr.indexOf(params.productId)].name}</h3>
                        <h4>${props.image[idArr.indexOf(params.productId)].price}</h4>
                        <span>
                            <Rating
                                className="starSize"
                                initialRating={props.image[idArr.indexOf(params.productId)].ratings.toFixed(1)}
                                emptySymbol={<FaRegStar></FaRegStar>}
                                fullSymbol={<FaStar></FaStar>}
                                readonly
                            />
                        </span>
                        <div>
                            <a className="anchorColor" href="#reviews">{props.image[idArr.indexOf(params.productId)].numOfReviews} Reviews</a>
                        </div>
                        {/* <h4>{props.image[params.detailId].description}</h4> */}
                        {/* <Row>
                            <Col className="mx-auto" sm={6}>
                                <Form.Select aria-label="Default select example">
                                    <option>Qty</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mx-auto" sm={6}>
                                <div className="d-grid gap-2">
                                    <Button onClick={addToCartHandler} size="lg">Add to Bag</Button>
                                </div>
                            </Col>
                        </Row> */}
                        <hr className="hrProductDetail"></hr>
                        {props.image[idArr.indexOf(params.productId)].gender == "Male" && props.image[idArr.indexOf(params.productId)].category == "Jeans" &&
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

                        {props.image[idArr.indexOf(params.productId)].gender == "Male" && props.image[idArr.indexOf(params.productId)].category !== "Jeans" &&
                            <React.Fragment>
                                <Row className="mb-2">
                                    <Col xs={9}>
                                        <span className="selectSizeFont">Select Size:</span>
                                        <SelectSize
                                            buttons={maleLength}
                                            afterClick={printButtonLabel2}
                                        />
                                    </Col>

                                    <Col className="sizeChartFloatRight">
                                        <span className="sizeChartText" onClick={() => setSizeModalShow(true)}>Size Chart</span>
                                    </Col>
                                </Row>
                                <ButtonGroups
                                    buttons={maleTopSize}
                                    afterClick={printButtonLabel1}
                                />
                            </React.Fragment>}

                        {props.image[idArr.indexOf(params.productId)].gender == "Female" && props.image[idArr.indexOf(params.productId)].category == "Jeans" &&
                            <React.Fragment>
                                <Row className="mb-2">
                                    <Col xs={9}>
                                        <span className="selectSizeFont">Select Size:</span>
                                        <SelectSize
                                            buttons={femaleLength}
                                            afterClick={printButtonLabel2}
                                        />
                                    </Col>

                                    <Col className="sizeChartFloatRight">
                                        <span className="sizeChartText" onClick={() => setSizeModalShow(true)}>Size Chart</span>
                                    </Col>
                                </Row>
                                <ButtonGroups
                                    buttons={femaleBottom}
                                    afterClick={printButtonLabel1}
                                />
                            </React.Fragment>}
                        {props.image[idArr.indexOf(params.productId)].gender == "Female" && props.image[idArr.indexOf(params.productId)].category !== "Jeans" &&
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

                        {/* {props.image[idArr.indexOf(params.productId)].gender == "Male" ?
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
                        } */}

                        {/* <Row>
                            <Col className="mx-auto" sm={6}>
                                <Form.Select aria-label="Default select example">
                                    <option>Qty</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                        </Row> */}
                        <Row>
                            <Col className="mt-3">
                                <div className="d-grid gap-2">
                                    {props.image[idArr.indexOf(params.productId)].gender == "Female" || 
                                     props.image[idArr.indexOf(params.productId)].category !== "Jeans" ?
                                    <button
                                        className="addButton"
                                        disabled={clothSize1 ? false : true}
                                        onClick={addToCartHandler}
                                        size="lg">ADD TO BAG</button> :

                                    <button
                                        className="addButton"
                                        disabled={clothSize1 && clothSize2 ? false : true}
                                        onClick={addToCartHandler}
                                        size="lg">ADD TO BAG</button>}
                                </div>
                            </Col>
                        </Row>

                        <Col className="mt-4">
                            <AccordionShipping />
                        </Col>

                    </Col>
                </Row>
                <Row className="backgroundColorContainer mt-5">
                    <Row>
                        <Col>
                            <p className="productDetailText mt-5">Product Details</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr className="hrProductDetail"></hr>
                        </Col>
                        <Col className="d-none d-lg-block">
                            <hr className="hrProductDetail"></hr>
                        </Col>
                        <Col className="d-none d-lg-block">
                            <hr className="hrProductDetail"></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} lg={4}>
                            <p className="productDetailDescription">DESCRIPTION</p>
                            {props.image[idArr.indexOf(params.productId)].gender === "Male" && props.image[idArr.indexOf(params.productId)].category === "Jeans" &&
                                <span>
                                    <p className="productDetailDescriptionText">Go for a modern look with maximum stretch in these slim-fit jeans. The sleek cut and comfortable fit make them a perfect match for work or play.</p>
                                </span>
                            }
                            {props.image[idArr.indexOf(params.productId)].gender === "Male" && props.image[idArr.indexOf(params.productId)].category === "Shirts" &&
                                <span>
                                    <p className="productDetailDescriptionText">Kick back in comfort and casual style. 100% cotton tee is your new best friend for lounging or on the run.</p>
                                </span>
                            }
                            {props.image[idArr.indexOf(params.productId)].gender === "Male" && props.image[idArr.indexOf(params.productId)].category === "Sweaters" &&
                                <span>
                                    <p className="productDetailDescriptionText">This sweater gives you the luxe look and feel you've been searching for. Rock it solo with jeans or over a button-up for a polished look.</p>
                                </span>
                            }
                            {props.image[idArr.indexOf(params.productId)].gender === "Male" && props.image[idArr.indexOf(params.productId)].category === "Button Down Shirts" &&
                                <span>
                                    <p className="productDetailDescriptionText">Cool and confident, this slim oxford shirt has is made with stretch-infused cotton for all-day comfort. It's a win with jeans, chinos and even shorts.</p>
                                </span>
                            }
                            {props.image[idArr.indexOf(params.productId)].gender === "Female" && props.image[idArr.indexOf(params.productId)].category === "Jeans" &&
                                <span>
                                    <p className="productDetailDescriptionText">These jeans with a button fly detail bring a unique look to these slimming skinny jeans. We love the cropped length to show off a sleek pair of shoes.</p>
                                </span>
                            }
                            {props.image[idArr.indexOf(params.productId)].gender === "Female" && props.image[idArr.indexOf(params.productId)].category === "Sweaters" &&
                                <span>
                                    <p className="productDetailDescriptionText">A classic sweater to keep you cozy all season long. This v-neck tunic sweater with seam detail pairs perfectly with jeans or leggings.</p>
                                </span>
                            }
                            {props.image[idArr.indexOf(params.productId)].gender === "Female" && props.image[idArr.indexOf(params.productId)].category === "Tops" &&
                                <span>
                                    <p className="productDetailDescriptionText">Designed to give you a classic and sophisticated look with a modern feel to it - thanks to the shiny satin. Wear this with dress pants Monday through Friday, then pair it with denim on the weekend.</p>
                                </span>
                            }
                            {props.image[idArr.indexOf(params.productId)].gender === "Female" && props.image[idArr.indexOf(params.productId)].category === "Dresses" &&
                                <span>
                                    <p className="productDetailDescriptionText">This dress provides a slimming silhouette from the body contour compression. The chic puff sleeves, scoop neck, and ribbed design makes for the perfect dress this season. This luxe look is perfect for dinner dates, parties or receptions.</p>
                                </span>
                            }
                        </Col>
                        <Col md={12} lg={4} className="mb-4">
                            <p className="productDetailDescription">FEATURES & FABRIC</p>

                            {props.image[idArr.indexOf(params.productId)].gender === "Male" && props.image[idArr.indexOf(params.productId)].category === "Jeans" &&
                                <ul className="productDetailDescriptionList">
                                    <li>Highest level of stretch for maximum comfort</li>
                                    <li>Slim through the thigh and leg; 14" leg circumference</li>
                                    <li>Year-round comfort no matter the weather</li>
                                    <li>One button closure with zip fly; Belt loops</li>
                                    <li>24/7 comfort waistband; Five pocket styling</li>
                                    <li>Cotton/Rayon/Polyester/Spandex</li>
                                </ul>
                            }
                            {props.image[idArr.indexOf(params.productId)].gender === "Male" && props.image[idArr.indexOf(params.productId)].category === "Shirts" &&
                                <ul className="productDetailDescriptionList">
                                    <li>Crew Neck</li>
                                    <li>Long sleeves</li>
                                    <li>Straight hem</li>
                                    <li>Front graphic</li>
                                    <li>Cotton</li>
                                </ul>
                            }
                            {props.image[idArr.indexOf(params.productId)].gender === "Male" && props.image[idArr.indexOf(params.productId)].category === "Sweaters" &&
                                <ul className="productDetailDescriptionList">
                                    <li>Mock neck; Quarter zip front</li>
                                    <li>Long sleeves</li>
                                    <li>Straight hem</li>
                                    <li>Extra soft</li>
                                    <li>Cotton/Wool</li>
                                </ul>
                            }
                            {props.image[idArr.indexOf(params.productId)].gender === "Male" && props.image[idArr.indexOf(params.productId)].category === "Button Down Shirts" &&
                                <ul className="productDetailDescriptionList">
                                    <li>Slim fit, narrow through the shoulders, chest & waist</li>
                                    <li>Point collar; Button front</li>
                                    <li>Long sleeves with button cuffs</li>
                                    <li>Shirttail hem</li>
                                    <li>Polyester/Rayon/Spandex</li>
                                </ul>
                            }
                            {props.image[idArr.indexOf(params.productId)].gender === "Female" && props.image[idArr.indexOf(params.productId)].category === "Jeans" &&
                                <ul className="productDetailDescriptionList">
                                    <li>High waisted</li>
                                    <li>Five pocket styling; Belt loops; Exposed button fly</li>
                                    <li>Skinny leg; Cropped length</li>
                                    <li>Stretch: Just enough stretch for all-day comfort</li>
                                    <li>Cotton/Rayon/Polyester/Spandex</li>
                                </ul>
                            }
                            {props.image[idArr.indexOf(params.productId)].gender === "Female" && props.image[idArr.indexOf(params.productId)].category === "Sweaters" &&
                                <ul className="productDetailDescriptionList">
                                    <li>Open front</li>
                                    <li>Long sleeves</li>
                                    <li>Cozy felted material</li>
                                    <li>Straight hem</li>
                                    <li>Acrylic/Polyester/Nylon/Wool/Spandex</li>
                                </ul>
                            }
                            {props.image[idArr.indexOf(params.productId)].gender === "Female" && props.image[idArr.indexOf(params.productId)].category === "Tops" &&
                                <ul className="productDetailDescriptionList">
                                    <li>Crew neck</li>
                                    <li>Long sleeves</li>
                                    <li>Fitted</li>
                                    <li>Double Layer of Fabric in front; Compression</li>
                                    <li>Polyester/Spandex</li>
                                </ul>
                            }
                            {props.image[idArr.indexOf(params.productId)].gender === "Female" && props.image[idArr.indexOf(params.productId)].category === "Dresses" &&
                                <ul className="productDetailDescriptionList">
                                    <li>Crew neck</li>
                                    <li>Long puff sleeves</li>
                                    <li>Straight hem; Mini length; Ribbed fabric</li>
                                    <li>Compression</li>
                                    <li>Polyester/Rayon/Nylon/Spandexx</li>
                                </ul>
                            }
                            <Col className="d-md-block d-lg-none">
                                <hr className="hrProductDetail"></hr>
                            </Col>
                        </Col>
                        <Col md={12} lg={4}>
                            <Row>
                                <Col className="textCenter">
                                    <BsArrowLeftRight size="30"></BsArrowLeftRight>
                                    <p className="mt-2">Stretch</p>
                                </Col>
                                <Col className="textCenter">
                                    <FaTemperatureLow size="30"></FaTemperatureLow>
                                    <p className="mt-2">Temp Control</p>
                                </Col>
                                <Col className="textCenter">
                                    <MdLocalLaundryService size="30"></MdLocalLaundryService>
                                    <p className="mt-2">Machine Wash</p>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col className="textCenter">
                                    <FaGlobeAmericas size="30"></FaGlobeAmericas>
                                    <p className="mt-2">Imported</p>
                                </Col>
                                <Col></Col>
                                <Col></Col>
                            </Row>

                        </Col>

                    </Row>

                </Row>
                <Row className="mt-5" id="reviews">
                    <Col>
                        <Row>
                            <Col>
                                <span className="leftReviewText">Reviews</span>
                            </Col>
                            <Col className="alignRight">
                                <a className="writeReviewText" onClick={() => setModalShow(true)}>Write a Review</a>
                            </Col>
                        </Row>
                        <hr className="hrMargin"></hr>
                        <ReviewModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            data={props.image[idArr.indexOf(params.productId)]}
                        />
                    </Col>
                </Row>
                <Row className="mt-5">
                    <ReviewProduct data={props.image[idArr.indexOf(params.productId)]} />
                </Row>
            </Container>
            <SizeModal
                gender={props.image[idArr.indexOf(params.productId)].gender}
                show={sizeModalShow}
                onHide={() => setSizeModalShow(false)}
            />

        </React.Fragment>
    )
}

export default ProductDetail;