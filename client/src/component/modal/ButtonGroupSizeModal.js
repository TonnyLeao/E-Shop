import React, {useState} from "react";
import './ButtonGroupSizeModal.css';

const ButtonGroupSizeModal = (props) => {

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
                className={i === clickedId ? "sizeModalButton activeButton1" : "sizeModalButton"}
                >
                {buttonLabel}
            </button>
            )})}
        </React.Fragment>
    )
}

export default ButtonGroupSizeModal;