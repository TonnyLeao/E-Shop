import React, {useState} from "react";
import './SelectSize.css'

const SelectSize = (props) => {
    const [clickedId, setClickedId] = useState(-1);

    const handleClick = (event, id) => {
        setClickedId(id);
        props.afterClick(event);
        
    }


    return(
        <React.Fragment>
        {props.buttons.map((buttonLabel, i) => {
            return(
            <span 
                key={i} 
                name={buttonLabel} 
                onClick={(event) => handleClick(event, i) }
                className={i === clickedId ? "customButton2 activeButton2" : "customButton2"}
                >
                {buttonLabel}
            </span>
            )})}
        </React.Fragment>
    )
}
export default SelectSize;