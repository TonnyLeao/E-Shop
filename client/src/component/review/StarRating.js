import React, {useState} from "react";
import { FaStar } from "react-icons/fa";
import './StarRating.css'


const StarRating = (props) => {

    // const [rating, setRating ] = useState(null);
    const [hover, setHover ] = useState(null);

    return (
        <React.Fragment>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;

                return (
                <label key={index}>
                    <input 
                        type="radio" 
                        name="rating" 
                        value={ratingValue}
                        onClick={() => props.setRating(ratingValue)}
                        />
                    <FaStar 
                        className="star" 
                        color={ratingValue <= ( hover || props.rating) ? "black" : "e4e5e9"} 
                        size={25}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}   
                    />
                </label>);
            })}
            {props.rating && <p>{props.rating}-Star</p>}
        </React.Fragment>
    )
}

export default StarRating;