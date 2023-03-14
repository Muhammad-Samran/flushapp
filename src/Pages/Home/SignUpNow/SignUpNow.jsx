import React from "react";
import "./SignUpNow.scss";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
const SignUpNow = () => {
  return (
    <>
      <section id="SignUpNowSection" className="SignUpNow s-p">
        <Container>
          <Row>
            <Col md={12} className="text-center SignUpNowContent">
              <p className="t-c secondary-font fs-48 ">
                Get the help you need, every step of the way and Start your
                business journey with Flush
              </p>
              <p>
                <Link to="/signup">
                  <button className="btn wbtn">Sign Up Now</button>
                </Link>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SignUpNow;
