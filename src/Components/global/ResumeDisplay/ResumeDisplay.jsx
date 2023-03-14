import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./ResumeDisplay.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// const url =
//   "https://d12uotnmkhw4d2.cloudfront.net/jobpost-mediafiles/63865600abdf4a32b31e1c3b6a3f5a0d-ref-K3DSQCYU.pdf";

function ResumeDisplay(props) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  // console.log("link", props.resume)
  return (
    <>
      <Modal show={props.show} onHide={() => props.setShow(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
          <div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
              <Viewer
                fileUrl={props.resume}
                plugins={[
                  defaultLayoutPluginInstance
              ]}
              />
            </Worker>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ResumeDisplay;
