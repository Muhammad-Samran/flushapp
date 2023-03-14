import React from "react";
import "./Pagination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Pagination(props) {
  return (
    <>
      <div className="pagination-main">
        <div className="pagination-index">
          <span>
            {props.totalData ? props.startIndex + 1 : 0 } - {props.totalData ? props.totalData <= props.endIndex?props.totalData:props.endIndex + 1 : 0} of {props.totalData ? props.totalData : 0}
          </span>
        </div>
        <div className="pagination-buttons">
          <button
            className="arrow-previous"
            onClick={async () => {
              await props.goToPreviousPage();
              // await props.getAPIData();
            }}
          >
            <span>
              {" "}
              <FontAwesomeIcon
                icon={faAngleLeft}
                style={{ color: "#37d1aa" }}
              />{" "}
            </span>
          </button>
          <button
            className="arrow-next"
            onClick={async () => {
              await props.goToNextPage();
              // await props.getAPIData();
            }}
          >
            <span>
              {" "}
              <FontAwesomeIcon
                icon={faAngleRight}
                style={{ color: "#37d1aa" }}
              />{" "}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Pagination;
