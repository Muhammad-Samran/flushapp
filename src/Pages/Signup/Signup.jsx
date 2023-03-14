import React from "react";
import {
  Row,
  Col,
  Container,

} from "react-bootstrap";

import Logo from "../../Assets/images/auth/logo2.png";
import TagLine from "../../Assets/images/auth/tag.png";
import { Link } from "react-router-dom";
import "./Signup.css";

import PersonalsignupForm from "./SignupForm";

const View = () => {
  return (
    <section>
      <header className="position-relative">
        <Container fluid>
          <Row>
            <Col>{/* <Logo className="uaLogo" /> */}</Col>
          </Row>
        </Container>
      </header>
      <section className="signUp greenBg">
        <Container fluid>
          <Row>
            <Col
              md={5}
              className="min-vh-100 gbg fixed-top d-flex justify-content-center flex-column position-relative p-0"
            >
              <p className="text-center mb-0 mt-0">
                <img src={Logo} alt="logo" className="logo-img img-fluid" />
              </p>
              <h1 className="tagline text-white text-center primary-font">
                Where community <br /> meets service
              </h1>
              <img src={TagLine} alt="" className="img-fluid tag-line" />
            </Col>
            <Col
              md={7}
              className="d-flex align-items-center p-shadow rCol wbg px-md-5"
            >
              <div className="signUpInnerCol w-100">
                <h1 className="title-head heading-font primary-color mt-3 mt-xl-0">
                  Sign Up
                </h1>
                <p className="secondary-font text-gray fs-16">
                  Start building relationships to grow your business.
                </p>

                <div className="signUpForm">
                  <PersonalsignupForm />

                  <div className="formFooter">
                    <p className="secondary-font fs-16  mb-4">
                      Already have an account?
                      <Link
                        className="secondary-color secondary-font-medium ps-1"
                        to="/login"
                      >
                        <span className="primary-color secondary-font-medium">{`Login `}</span>
                      </Link>
                    </p>
                    {/* <h2 className='orLogin secondary-font fs-16'>
                      <span style={{ color: '#999999' }}>
                        Or{' '}
                        <span className='c2 p-0 secondary-font-medium'>
                          Sign Up
                        </span>
                        With
                      </span>
                    </h2>
                    <div className='d-flex justify-content-center mb-3 mb-xl-0'>
                      <ThirdpartyAuth></ThirdpartyAuth>
                    </div> */}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </section>
  );
};

export default View;
