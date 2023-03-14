import React from "react";
import Plus from "../../../Assets/svg/plus.svg";
import Minus from "../../../Assets/svg/minus.svg";
import './AddButton.scss'
function AddButton({ onClick, component,index }) {
  return (
    <div className="addButtonItem d-flex justify-content-center align-items-center"
    onClick={() => {
        if(component==="plus"){
            onClick("")
        }
        else{
            onClick(index)
        }
    }}>

      <button
        className="inputTransparent bg-transparent d-flex"
        type="button"
        
      >
        {" "}
        <img src={component==="plus"?Plus:Minus} alt="" />
      </button>
    </div>
  );
}

export default AddButton;
