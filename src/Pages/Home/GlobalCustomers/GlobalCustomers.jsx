import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./GlobalCustomers.scss";
import Customers from "src/Assets/images/logos.png";
const GlobalCustomers = () => {
  return (
    <>
      <section className="s-p">
        {" "}
        <Container>
          <Row>
            <Col md={12}>
              <div className="CustomPaddinglr">
                <h2 className="fs-48 fw-light text-center">
                  Trusted by{" "}
                  <span className="f-bold customHeading">35 Million</span>{" "}
                  Global Customers
                </h2>
              </div>
            </Col>
            <Col md={12} className="pt-3">
              <img
                src={Customers}
                className="img-fluid"
                alt="Map Image Flush"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default GlobalCustomers;
