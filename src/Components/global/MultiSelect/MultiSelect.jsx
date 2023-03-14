import React, { useEffect, useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./MultiSelect.scss";
const MultiSelectComponent = ({
  
  selectedValues,
  options,
  displayName,
  setFieldValue,
  name
}) => {
  const multiselectRef = React.createRef();
  return (
    <div >
      {/* <InputGroup className="inputField4 overflow-visible"> */}
        <Multiselect
        ref={multiselectRef}
          // filteredOptions={filteredOptions}
          className="b-none"
          displayValue={displayName}
          selectedValues={selectedValues}
          onSelect={(selectedList, selectedItem) => {
            setFieldValue(name, selectedList);
          }}
          options={options}
          style={{
            chips: {
              display: "none",
            },
            multiselectContainer:{
              width: "100%",
              background: "#ffffff",
              border: "2px solid #cccccc",
              boxSizing: "border-box",
              borderRadius: "6px",
              overflow: "visible"
            }
          }}
        />
      {/* </InputGroup> */}

      <div>
        {selectedValues.map((item, index) => (
          <p className="multiSelectItem" key={index}>
            <span>
              {item[`${displayName}`]}
              <span className="multiselectCross" onClick={
                () => {
                  multiselectRef.current.resetSelectedValues();
                  const temp = selectedValues.filter(item2=> item2[`${displayName}`] !== item[`${displayName}`]);
                  setFieldValue(name, temp)

                }
              }>
              <FontAwesomeIcon icon={faXmark} />
              </span>
             
            </span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectComponent;
