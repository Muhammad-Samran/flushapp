import React, { useState } from "react";
import ContactForm from "../../Components/global/ContactForm/ContactForm";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import "src/Components/global/ContactForm/ContactForm.css";

function ContactFormModel() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton />

        <Modal.Body>
          <ContactForm />
        </Modal.Body>

      </Modal>
    </>
  );
}

export default ContactFormModel;
