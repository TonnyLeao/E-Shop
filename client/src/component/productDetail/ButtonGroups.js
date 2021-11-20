import React, {useState} from "react";
import './ButtonGroups.css';

const ButtonGroups = (props) => {

    const [clickedId, setClickedId] = useState(-1);

    const handleClick = (event, id) => {
        setClickedId(id);
        props.afterClick(event);
    }

    return(
        <React.Fragment>
        {props.buttons.map((buttonLabel, i) => {
            return(
            <button 
                key={i} 
                name={buttonLabel} 
                onClick={(event) => handleClick(event, i) }
                className={i === clickedId ? "customButton1 activeButton1" : "customButton1"}
                >
                {buttonLabel}
            </button>
            )})}
        </React.Fragment>
    )
}

export default ButtonGroups;