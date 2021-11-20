import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './carousel.css';

const CarouselModal = (props) => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <React.Fragment>
            <Row>
                <Col xs={2}>
                    {props.image[props.index].images.map((images, i) => {
                        return (
                            <React.Fragment key={i}>
                                <Row>
                                    <img
                                        className="mb-2"
                                        src={images.url}
                                        onClick={() => { handleSelect(i) }}
                                    />
                                </Row>
                            </React.Fragment>
                        )
                    })}
                </Col>
                <Col xs={10}>
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={props.image[props.index].images[0].url}
                                //src={props.image[props.index].imgSrc}
                                alt="First slide"
                            />
                            {/* <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption> */}
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={props.image[props.index].images[1].url}
                                //src={props.image[props.index].imgSrc1}
                                alt="Second slide"
                            />

                            {/* <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption> */}
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={props.image[props.index].images[2].url}
                                //src={props.image[props.index].imgSrc2}
                                alt="Third slide"
                            />

                            {/* <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption> */}
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default CarouselModal;