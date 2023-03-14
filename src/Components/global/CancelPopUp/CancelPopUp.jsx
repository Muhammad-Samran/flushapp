import React, { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AxiosConfig from "src/Services/AxiosConfig";


function CancelPopUp(props) {

  return (
    <>
      <Modal show={props.show} onHide={() => props.setShow(false)}>
        <Modal.Header closeButton />

        <Modal.Body>
          <div className="upload-main">
          <h2 style={{color:'red'}}>Are you sure?</h2>
            <h2>
              You want to cancel an application
            </h2>
            <div>

              <button
              style={{marginRight:'10px'}}
                className="upload-btn"
                onClick={async () => {
                  await props.setShow(false)
                }}
              >
                <span>No</span>
              </button>

              <button
              style={{background:'#3F464E'}}
                className="upload-btn"
                onClick={async () => {
                  await props.cancelAPI(props.JobId);
                  await props.setShow(false);
                }}
              >
                <span>Yes</span>
              </button>

            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}


export default CancelPopUp;
