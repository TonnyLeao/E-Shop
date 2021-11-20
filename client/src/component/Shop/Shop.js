import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import OffCanvas from '../modal/offCanvas';
import FilterBox from './FilterBox';
import FilterColor  from './FilterColor';
import MyVerticallyCenteredModal from '../modal/modal';
import Rating from 'react-rating';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa"
import { Link } from 'react-router-dom';
import './Shop.css';

const Shop = (props) => {

    const [modalShow, setModalShow] = useState(false);

    const [modalIndex, setModalIndex] = useState(0);

    const setIndex = (i) => {
        setModalIndex(i);
    }

    //Trying to make filter work, code below 

    const dispatch = useDispatch();

    const [filterState, setFilterState] = useState([]);

    const [filterArr, setFilterArr] = useState([]);

    const [newFilterState, setNewFilterState] = useState([]);

    const allProduct = useSelector(state => state.product.product.products)

    // console.log(allProduct, "this is allproduct from shop page!");

    // console.log(props.gender);

    // console.log(props.image, "this is the image prop")
    // console.log(newFilterState, "this is the new filter state")

    useEffect(() => {
        setFilterState(props.image)
        setNewFilterState(props.image)
        
    }, [dispatch])

    const filterButton = (event) => {

        const currentValue = filterArr.indexOf(event.target.value);

        const newCurrentValue = [...filterArr];

        // console.log(newCurrentValue, "this is the new currentValue")

        let holdArr = [];
        let setArr = [];


        if (currentValue === -1) {
            newCurrentValue.push(event.target.value)
            
            for (let i = 0; i < newCurrentValue.length; i++) {

                if (newCurrentValue[i].includes("1")) {

                    holdArr = filterState.filter(data => data.price < 30)
                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Blue")) {
                            let holdArrBlue = Array.from(holdArr).filter(data => data.color == "Blue")
                            setArr.push(...holdArrBlue)
                        }
                        if(newCurrentValue[i].includes("Gray")) {
                            let holdArrGray = Array.from(holdArr).filter(data => data.color == "Gray")
                            setArr.push(...holdArrGray)
                        }
                        if(newCurrentValue[i].includes("Black")) {
                            let holdArrGray = Array.from(holdArr).filter(data => data.color == "Black")
                            setArr.push(...holdArrGray)
                        }
                        if(newCurrentValue[i].includes("White")) {
                            let holdArrGray = Array.from(holdArr).filter(data => data.color == "White")
                            setArr.push(...holdArrGray)
                        }
                        if(newCurrentValue[i].includes("Pink")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Pink")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Maroon")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Maroon")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Green")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Green")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Purple")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Purple")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Red")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Red")
                            setArr.push(...holdArrPink)
                        }
                    }

                    if(newCurrentValue.indexOf("Blue") == -1 && newCurrentValue.indexOf("Gray") == -1 && newCurrentValue.indexOf("White") == -1 && newCurrentValue.indexOf("Black") == -1 && newCurrentValue.indexOf("Pink") == -1 && newCurrentValue.indexOf("Maroon") == -1 && newCurrentValue.indexOf("Green") == -1 && newCurrentValue.indexOf("Purple") == -1 && newCurrentValue.indexOf("Red") == -1) {
                        // console.log("There is no BLUE! OR GRAY!!!")
                        setArr.push(...holdArr)
                    }

                }

                if (newCurrentValue[i].includes("2")) {

                    holdArr = filterState.filter(data => (data.price > 30 && data.price < 40))
                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Blue")) {
                            let holdArrBlue = Array.from(holdArr).filter(data => data.color == "Blue")
                            setArr.push(...holdArrBlue)
                        }
                        if(newCurrentValue[i].includes("Gray")) {
                            let holdArrGray = Array.from(holdArr).filter(data => data.color == "Gray")
                            setArr.push(...holdArrGray)
                        }
                        if(newCurrentValue[i].includes("Black")) {
                            let holdArrGray = Array.from(holdArr).filter(data => data.color == "Black")
                            setArr.push(...holdArrGray)
                        }
                        if(newCurrentValue[i].includes("White")) {
                            let holdArrGray = Array.from(holdArr).filter(data => data.color == "White")
                            setArr.push(...holdArrGray)
                        }
                        if(newCurrentValue[i].includes("Pink")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Pink")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Maroon")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Maroon")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Green")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Green")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Purple")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Purple")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Red")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Red")
                            setArr.push(...holdArrPink)
                        }
                    }

                    if(newCurrentValue.indexOf("Blue") == -1 && newCurrentValue.indexOf("Gray") == -1 && newCurrentValue.indexOf("White") == -1 && newCurrentValue.indexOf("Black") == -1 && newCurrentValue.indexOf("Pink") == -1 && newCurrentValue.indexOf("Maroon") == -1 && newCurrentValue.indexOf("Green") == -1 && newCurrentValue.indexOf("Purple") == -1 && newCurrentValue.indexOf("Red") == -1) {
                        // console.log("There is no BLUE! OR GRAY!!!")
                        setArr.push(...holdArr)
                    }
                }

                if (newCurrentValue[i].includes("3")) {

                    holdArr = filterState.filter(data => (data.price > 41));

                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Blue")) {
                            let holdArrBlue = Array.from(holdArr).filter(data => data.color == "Blue")
                            setArr.push(...holdArrBlue)
                        }
                        if(newCurrentValue[i].includes("Gray")) {
                            let holdArrGray = Array.from(holdArr).filter(data => data.color == "Gray")
                            setArr.push(...holdArrGray)
                        }
                        if(newCurrentValue[i].includes("Black")) {
                            let holdArrGray = Array.from(holdArr).filter(data => data.color == "Black")
                            setArr.push(...holdArrGray)
                        }
                        if(newCurrentValue[i].includes("White")) {
                            let holdArrGray = Array.from(holdArr).filter(data => data.color == "White")
                            setArr.push(...holdArrGray)
                        }
                        if(newCurrentValue[i].includes("Pink")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Pink")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Maroon")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Maroon")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Green")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Green")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Purple")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Purple")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Red")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Red")
                            setArr.push(...holdArrPink)
                        }
                    }

                    if(newCurrentValue.indexOf("Blue") == -1 && newCurrentValue.indexOf("Gray") == -1 && newCurrentValue.indexOf("White") == -1 && newCurrentValue.indexOf("Black") == -1 && newCurrentValue.indexOf("Pink") == -1 && newCurrentValue.indexOf("Maroon") == -1 && newCurrentValue.indexOf("Green") == -1 && newCurrentValue.indexOf("Purple") == -1 && newCurrentValue.indexOf("Red") == -1) {
                        // console.log("There is no BLUE! OR GRAY!!!")
                        setArr.push(...holdArr)
                    }

                }

                if(newCurrentValue.indexOf("1") == -1 && newCurrentValue.indexOf("2") == -1 && newCurrentValue.indexOf("3") == -1 && newCurrentValue[i].includes("Blue")) {

                    holdArr = filterState;
                    const noPriceState = Array.from(filterState);

                    // console.log(noPriceState, "this is the no price state!")

                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Blue")) {

                            let blueState = noPriceState.filter(data => data.color == "Blue")
                            console.log(blueState, "THIS IS THE BLUE FILTER!!!")
                            setArr.push(...blueState);
                        }
                    }
                }


                if(newCurrentValue.indexOf("1") == -1 && newCurrentValue.indexOf("2") == -1 && newCurrentValue.indexOf("3") == -1 && newCurrentValue[i].includes("Gray")) {

                    holdArr = filterState;
                    const noPriceState = Array.from(filterState);

                    // console.log(noPriceState, "this is the no price state!")

                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Gray")) {

                            let grayState = noPriceState.filter(data => data.color == "Gray")
                            // console.log(grayState, "THIS IS THE GRAY FILTER!!!")
                            setArr.push(...grayState);
                        }
                    }
                   
                }

                if(newCurrentValue.indexOf("1") == -1 && newCurrentValue.indexOf("2") == -1 && newCurrentValue.indexOf("3") == -1 && newCurrentValue[i].includes("Black")) {

                    holdArr = filterState;
                    const noPriceState = Array.from(filterState);

                    // console.log(noPriceState, "this is the no price state!")

                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Black")) {

                            let blackState = noPriceState.filter(data => data.color == "Black")
                            // console.log(blackState, "THIS IS THE Black FILTER!!!")
                            setArr.push(...blackState);
                        }
                    }
                }

                if(newCurrentValue.indexOf("1") == -1 && newCurrentValue.indexOf("2") == -1 && newCurrentValue.indexOf("3") == -1 && newCurrentValue[i].includes("White")) {

                    holdArr = filterState;
                    const noPriceState = Array.from(filterState);

                    // console.log(noPriceState, "this is the no price state!")

                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("White")) {

                            let whiteState = noPriceState.filter(data => data.color == "White")
                            // console.log(whiteState, "THIS IS THE WHITE FILTER!!!")
                            setArr.push(...whiteState);
                        }
                    }
                }

                if(newCurrentValue.indexOf("1") == -1 && newCurrentValue.indexOf("2") == -1 && newCurrentValue.indexOf("3") == -1 && newCurrentValue[i].includes("Pink")) {

                    holdArr = filterState;
                    const noPriceState = Array.from(filterState);

                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Pink")) {

                            let pinkState = noPriceState.filter(data => data.color == "Pink")
                            setArr.push(...pinkState);
                        }
                    }
                }

                if(newCurrentValue.indexOf("1") == -1 && newCurrentValue.indexOf("2") == -1 && newCurrentValue.indexOf("3") == -1 && newCurrentValue[i].includes("Maroon")) {

                    holdArr = filterState;
                    const noPriceState = Array.from(filterState);

                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Maroon")) {

                            let pinkState = noPriceState.filter(data => data.color == "Maroon")
                            setArr.push(...pinkState);
                        }
                    }
                }

                if(newCurrentValue.indexOf("1") == -1 && newCurrentValue.indexOf("2") == -1 && newCurrentValue.indexOf("3") == -1 && newCurrentValue[i].includes("Green")) {

                    holdArr = filterState;
                    const noPriceState = Array.from(filterState);

                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Green")) {

                            let pinkState = noPriceState.filter(data => data.color == "Green")
                            setArr.push(...pinkState);
                        }
                    }
                }

                if(newCurrentValue.indexOf("1") == -1 && newCurrentValue.indexOf("2") == -1 && newCurrentValue.indexOf("3") == -1 && newCurrentValue[i].includes("Purple")) {

                    holdArr = filterState;
                    const noPriceState = Array.from(filterState);

                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Purple")) {

                            let pinkState = noPriceState.filter(data => data.color == "Purple")
                            setArr.push(...pinkState);
                        }
                    }
                }

                if(newCurrentValue.indexOf("1") == -1 && newCurrentValue.indexOf("2") == -1 && newCurrentValue.indexOf("3") == -1 && newCurrentValue[i].includes("Red")) {

                    holdArr = filterState;
                    const noPriceState = Array.from(filterState);

                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Red")) {

                            let pinkState = noPriceState.filter(data => data.color == "Red")
                            setArr.push(...pinkState);
                        }
                    }
                }

                // console.log(holdArr, "ON TOP HOLD ARR!")

                setNewFilterState(setArr);
                
            }
        } else {
            newCurrentValue.splice(currentValue, 1);

            for (let i = 0; i < newCurrentValue.length; i++) {

                if (newCurrentValue[i].includes("1")) {

                    holdArr = filterState.filter(data => data.price < 30)
                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Blue")) {
                            let holdArrBlue = Array.from(holdArr).filter(data => data.color == "Blue")
                            setArr.push(...holdArrBlue)
                        }
                        if(newCurrentValue[i].includes("Gray")) {
                            let holdArrGray = Array.from(holdArr).filter(data => data.color == "Gray")
                            setArr.push(...holdArrGray)
                        }
                        if(newCurrentValue[i].includes("Black")) {
                            let holdArrBlack = Array.from(holdArr).filter(data => data.color == "Black")
                            setArr.push(...holdArrBlack)
                        }
                        if(newCurrentValue[i].includes("White")) {
                            let holdArrWhite = Array.from(holdArr).filter(data => data.color == "White")
                            setArr.push(...holdArrWhite)
                        }
                        if(newCurrentValue[i].includes("Pink")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Pink")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Maroon")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Maroon")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Green")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Green")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Purple")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Purple")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Red")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Red")
                            setArr.push(...holdArrPink)
                        }
                    }

                    if(newCurrentValue.indexOf("Blue") == -1 && newCurrentValue.indexOf("Gray") == -1 && newCurrentValue.indexOf("White") == -1 && newCurrentValue.indexOf("Black") == -1 && newCurrentValue.indexOf("Pink") == -1 && newCurrentValue.indexOf("Maroon") == -1 && newCurrentValue.indexOf("Green") == -1 && newCurrentValue.indexOf("Purple") == -1 && newCurrentValue.indexOf("Red") == -1) {
                        console.log("There is no BLUE! OR GRAY!!!")
                        setArr.push(...holdArr)
                    }

                    // setArr.push(...holdArr)

                }

                if (newCurrentValue[i].includes("2")) {

                    holdArr = filterState.filter(data => (data.price > 30 && data.price < 40))
                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Blue")) {
                            let holdArrBlue = Array.from(holdArr).filter(data => data.color == "Blue")
                            setArr.push(...holdArrBlue)
                        }
                        if(newCurrentValue[i].includes("Gray")) {
                            let holdArrGray = Array.from(holdArr).filter(data => data.color == "Gray")
                            setArr.push(...holdArrGray)
                        }
                        if(newCurrentValue[i].includes("Black")) {
                            let holdArrBlack = Array.from(holdArr).filter(data => data.color == "Black")
                            setArr.push(...holdArrBlack)
                        }
                        if(newCurrentValue[i].includes("White")) {
                            let holdArrWhite = Array.from(holdArr).filter(data => data.color == "White")
                            setArr.push(...holdArrWhite)
                        }
                        if(newCurrentValue[i].includes("Pink")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Pink")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Maroon")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Maroon")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Green")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Green")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Purple")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Purple")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Red")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Red")
                            setArr.push(...holdArrPink)
                        }
                    }

                    if(newCurrentValue.indexOf("Blue") == -1 && newCurrentValue.indexOf("Gray") == -1 && newCurrentValue.indexOf("White") == -1 && newCurrentValue.indexOf("Black") == -1 && newCurrentValue.indexOf("Pink") == -1 && newCurrentValue.indexOf("Maroon") == -1 && newCurrentValue.indexOf("Green") == -1 && newCurrentValue.indexOf("Purple") == -1 && newCurrentValue.indexOf("Red") == -1) {
                        console.log("There is no BLUE! OR GRAY!!!")
                        setArr.push(...holdArr)
                    }
                }

                if (newCurrentValue[i].includes("3")) {

                    holdArr = filterState.filter(data => (data.price > 41))
                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Blue")) {
                            let holdArrBlue = Array.from(holdArr).filter(data => data.color == "Blue")
                            setArr.push(...holdArrBlue)
                        }
                        if(newCurrentValue[i].includes("Gray")) {
                            let holdArrGray = Array.from(holdArr).filter(data => data.color == "Gray")
                            setArr.push(...holdArrGray)
                        }
                        if(newCurrentValue[i].includes("Black")) {
                            let holdArrBlack = Array.from(holdArr).filter(data => data.color == "Black")
                            setArr.push(...holdArrBlack)
                        }
                        if(newCurrentValue[i].includes("White")) {
                            let holdArrWhite = Array.from(holdArr).filter(data => data.color == "White")
                            setArr.push(...holdArrWhite)
                        }
                        if(newCurrentValue[i].includes("Pink")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Pink")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Maroon")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Maroon")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Green")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Green")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Purple")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Purple")
                            setArr.push(...holdArrPink)
                        }
                        if(newCurrentValue[i].includes("Red")) {
                            let holdArrPink= Array.from(holdArr).filter(data => data.color == "Red")
                            setArr.push(...holdArrPink)
                        }
                    }

                    if(newCurrentValue.indexOf("Blue") == -1 && newCurrentValue.indexOf("Gray") == -1 && newCurrentValue.indexOf("White") == -1 && newCurrentValue.indexOf("Black") == -1 && newCurrentValue.indexOf("Pink") == -1 && newCurrentValue.indexOf("Maroon") == -1 && newCurrentValue.indexOf("Green") == -1 && newCurrentValue.indexOf("Purple") == -1 && newCurrentValue.indexOf("Red") == -1) {
                        console.log("There is no BLUE! OR GRAY!!!")
                        setArr.push(...holdArr)
                    }
                }

                if(newCurrentValue.indexOf("1") == -1 && newCurrentValue.indexOf("2") == -1 && newCurrentValue.indexOf("3") == -1 && newCurrentValue[i].includes("Blue")) {

                    holdArr = filterState;
                    const noPriceState = Array.from(filterState);

                    console.log(noPriceState, "this is the no price state!")

                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Blue")) {

                            let blueState = noPriceState.filter(data => data.color == "Blue")
                            console.log(blueState, "THIS IS THE BLUE FILTER!!!")
                            setArr.push(...blueState);
                        }
                    }
                }


                if(newCurrentValue.indexOf("1") == -1 && newCurrentValue.indexOf("2") == -1 && newCurrentValue.indexOf("3") == -1 && newCurrentValue[i].includes("Gray")) {

                    holdArr = filterState;
                    const noPriceState = Array.from(filterState);

                    console.log(noPriceState, "this is the no price state!")

                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Gray")) {

                            let grayState = noPriceState.filter(data => data.color == "Gray")
                            console.log(grayState, "THIS IS THE GRAY FILTER!!!")
                            setArr.push(...grayState);
                        }
                    }
                   
                }

                if(newCurrentValue.indexOf("1") == -1 && newCurrentValue.indexOf("2") == -1 && newCurrentValue.indexOf("3") == -1 && newCurrentValue[i].includes("Black")) {

                    holdArr = filterState;
                    const noPriceState = Array.from(filterState);

                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Black")) {

                            let blackState = noPriceState.filter(data => data.color == "Black")
                            setArr.push(...blackState);
                        }
                    }
                }

                if(newCurrentValue.indexOf("1") == -1 && newCurrentValue.indexOf("2") == -1 && newCurrentValue.indexOf("3") == -1 && newCurrentValue[i].includes("White")) {

                    holdArr = filterState;
                    const noPriceState = Array.from(filterState);

                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("White")) {

                            let whiteState = noPriceState.filter(data => data.color == "White")
                            setArr.push(...whiteState);
                        }
                    }
                }

                if(newCurrentValue.indexOf("1") == -1 && newCurrentValue.indexOf("2") == -1 && newCurrentValue.indexOf("3") == -1 && newCurrentValue[i].includes("Pink")) {

                    holdArr = filterState;
                    const noPriceState = Array.from(filterState);

                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Pink")) {

                            let pinkState = noPriceState.filter(data => data.color == "Pink")
                            setArr.push(...pinkState);
                        }
                    }
                }

                if(newCurrentValue.indexOf("1") == -1 && newCurrentValue.indexOf("2") == -1 && newCurrentValue.indexOf("3") == -1 && newCurrentValue[i].includes("Maroon")) {

                    holdArr = filterState;
                    const noPriceState = Array.from(filterState);

                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Maroon")) {

                            let pinkState = noPriceState.filter(data => data.color == "Maroon")
                            setArr.push(...pinkState);
                        }
                    }
                }

                if(newCurrentValue.indexOf("1") == -1 && newCurrentValue.indexOf("2") == -1 && newCurrentValue.indexOf("3") == -1 && newCurrentValue[i].includes("Green")) {

                    holdArr = filterState;
                    const noPriceState = Array.from(filterState);

                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Green")) {

                            let pinkState = noPriceState.filter(data => data.color == "Green")
                            setArr.push(...pinkState);
                        }
                    }
                }

                if(newCurrentValue.indexOf("1") == -1 && newCurrentValue.indexOf("2") == -1 && newCurrentValue.indexOf("3") == -1 && newCurrentValue[i].includes("Purple")) {

                    holdArr = filterState;
                    const noPriceState = Array.from(filterState);

                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Purple")) {

                            let pinkState = noPriceState.filter(data => data.color == "Purple")
                            setArr.push(...pinkState);
                        }
                    }
                }

                if(newCurrentValue.indexOf("1") == -1 && newCurrentValue.indexOf("2") == -1 && newCurrentValue.indexOf("3") == -1 && newCurrentValue[i].includes("Red")) {

                    holdArr = filterState;
                    const noPriceState = Array.from(filterState);

                    for (let i = 0; i < newCurrentValue.length; i++) {
                        if(newCurrentValue[i].includes("Red")) {

                            let pinkState = noPriceState.filter(data => data.color == "Red")
                            setArr.push(...pinkState);
                        }
                    }
                }

                setNewFilterState(setArr);
            }

            console.log(newCurrentValue, "we removed it!");
        }

        if(newCurrentValue.length === 0) {
            setNewFilterState(filterState)
        }

        setFilterArr(newCurrentValue);
    }

    // console.log(filterState, "this is the filter gender state");


    //State for the Offcanvas
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let idArr = [];
    for (let i = 0; i < props.image.length; i++) {
        idArr.push(props.image[i]._id);
        // console.log(idArr, "this is the array of stuff");
    }

    const [canvasIndex, setCanvasIndex] = useState(0);

    const setCanIndex = (i, data) => {
        console.log(data, "this is the data!")
        let num = idArr.indexOf(data._id)
        setCanvasIndex(num);

        console.log(num)
    }

    // console.log(props.image[0], "This is from shop")

    //props.image.map



    const shopData = newFilterState.map((data, index) => {

        //Trying to match the data info and set the index into a new data

        return (
            <Col lg={4} md={6} key={data._id} className="cardBorderOutline">
                <div className="containerHover">
                    <Link to={`/${props.gender}/${props.cloth}/${data._id}`}>
                        <img className="imageHover" src={data.images[0].url}></img>
                    </Link>
                    {/* <Button
                        className="overlayHover"
                        variant="dark"
                        onClick={() => { setModalShow(true); setIndex(index) }}
                    >Quick Shop</Button> */}
                    <Button variant="dark" onClick={() => { handleShow(); setCanIndex(index, data) }}
                        className="me-2 overlayHover">
                        {"Quick Shop"}
                    </Button>
                </div>


                <div>
                    <Link to={`${props.gender}/${index}`} className="cardFontSize">{data.name}</Link>
                    <div className="cardFontSize">${data.price}</div>
                    <span>
                        <Link className="cardFontSize" to={`${props.gender}/${index}`}>
                        <Rating
                            className="starSize"
                            initialRating={props.image[index].ratings.toFixed(1)}
                            emptySymbol={<FaRegStar></FaRegStar>}
                            fullSymbol={<FaStar></FaStar>}
                            readonly
                        />
                        </Link>
                        <span>({props.image[index].numOfReviews})</span>
                    </span>
                </div>
            </Col>
        )
    })




    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col xs={3}>
                        <div className="mt-3">
                        <FilterBox
                            // filterState={filterState}
                            afterClick={filterButton}
                        />
                        </div>

                        <div className="mt-3">
                            <FilterColor 
                                afterClick={filterButton}
                                filterState={filterState}
                            />
                        </div>

                    </Col>
                    <Col>
                        <Row>{filterState && shopData}</Row>
                    </Col>

                </Row>
            </Container>
            {/* <MyVerticallyCenteredModal show={modalShow}
                onHide={() => setModalShow(false)}
                index={modalIndex}
                image={props.image}
            /> */}
             <OffCanvas
                show={show}
                onHide={() => handleClose()}
                placement="end"
                image={props.image}
                index={canvasIndex}
            />
            

        </React.Fragment>
    )
}

export default Shop

{/* <MyVerticallyCenteredModal show={modalShow}
onHide={() => setModalShow(false)}
index={modalIndex}
image={props.image}
/> */}

