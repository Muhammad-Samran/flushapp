import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import "./HeroSection.css";
import HeroSectionBg from "src/Assets/images/HeroSection.png";
import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    <>
      <section className="hore-bg d-flex align-items-center">
        <Container className="">
          <Row className="align-items-center ">
            <Col md={5} className="">
              <div>
                <h1 className={`fs-72 primary-font h-c`}>
                  The Social Commerce Platform for all services
                </h1>
                <p className="secondary-font fs-24 t-c">
                  We are the one stop platform for all service providers and
                  people who are looking for services done for their home.
                  People can also further their careers by looking for jobs,
                  apprenticeships and trade schools (in process) in their
                  network and area. Come join us to see why Flush is number one
                  for all things services!
                </p>
              </div>
              <div className="HeroSectionForm">
                <Form>
                  <Row>
                    <Col className=" ">
                      <Form.Control type="text" placeholder="Your  Name" />
                    </Col>
                    <Col className="p-0">
                      <Form.Control text="email" placeholder="Email Address" />
                    </Col>
                    <Col>
                      <Link to="/signup">
                        <button type="button" className="btn wbtn">
                          SignUp Now
                        </button>
                      </Link>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
            <Col md={7} className="d-none d-sm-block">
              <img src={HeroSectionBg} className="img-fluid"></img>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default HeroSection;
