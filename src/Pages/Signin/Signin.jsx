import React, { useEffect } from "react";
import { Row, Col, Container, FormGroup, InputGroup } from "react-bootstrap";

import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Logo from "../../Assets/images/auth/logo2.png";
import TagLine from "../../Assets/images/auth/tag.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import CookieConsent from "react-cookie-consent";
import { signin } from "../../Redux/AuthSlice";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let auth = useSelector((state) => state.auth);

  useEffect(() => {
    toast.dismiss();
    if (auth.isSignInProcessing) {
      toast.loading("Please wait...");
    }
    if (auth.isSignInError) {
      toast.error(auth.signInErrorMessage);
    }
    if (auth.signInSuccess) {
      toast({
        render: "Success",
        type: "success",
      });
      navigate("/feed");
    }
  }, [auth, navigate]);

  const handleSignUpSubmit = (values) => {
    try {
      dispatch(signin(values));
    } catch (error) {
      // console.log(error);
    }
  };
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required"),
    password: Yup.string().required("Required."),
  });
  return (
    <section>
      <CookieConsent
        location="bottom"
        buttonText="I Understand"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.{" "}
      </CookieConsent>
      <ToastContainer />

      <header className="position-relative">
        <Container fluid>
          <Row>
            <Col>
              {/* <img src={Logo} alt="logo" className="uaLogo" /> */}
              {/* <Logo className="uaLogo" /> */}
            </Col>
          </Row>
        </Container>
      </header>
      <section className="signUp greenBg">
        <Container fluid>
          <Row>
            <Col
              md={5}
              className="min-vh-100  gbg d-flex justify-content-center flex-column position-relative p-0 d-none d-sm-block"
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
              className="d-flex align-items-center p-shadow rCol wbg px-5 formContainer"
            >
              <div className="signUpInnerCol w-100">
                <h1 className="title-head primary-font secondary-color mt-3 mt-xl-0">
                  Welcome Back!
                </h1>
                <p className="secondary-font primary-color fs-16">
                  Login to continue to Flush App
                </p>
                <div className="signUpForm">
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      handleSignUpSubmit(values, setSubmitting);
                      resetForm();
                    }}
                  >
                    {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div>
                          <FormGroup>
                            <label
                              htmlFor="email"
                              className="mb-1 d-block text-start"
                            >
                              E-mail*
                            </label>
                            <InputGroup className="inputField4">
                              <input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className="inputTransparent flex p-2"
                              />
                            </InputGroup>
                            <p className="text-danger fs-12">
                              <ErrorMessage name="email" />
                            </p>
                          </FormGroup>
                        </div>
                        <div>
                          <FormGroup className="flex-fill">
                            <label
                              htmlFor="password"
                              className="mb-1 d-block text-start"
                            >
                              Password*
                            </label>
                            <InputGroup className="inputField4">
                              <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className="inputTransparent flex p-2"
                              />
                            </InputGroup>
                            <p className="text-danger fs-12">
                              <ErrorMessage name="password" />
                            </p>
                          </FormGroup>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div className="agreeStatementDiv">
                            <input
                              name="agree"
                              type="checkbox"
                              id="agreeStatement"
                              value={values.agree}
                              checked={values.agree}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="me-2"
                            />
                            <label htmlFor="agreeStatement">
                              Keep me log in
                            </label>
                            <p className="text-danger fs-12">
                              <ErrorMessage name="agree" />
                            </p>
                          </div>
                          <div>
                            {/* <p
                              className='mb-0 c2 secondary-font fs-16'
                              onClick={(e) => {
                                // console.log('onclick');
                              }}
                              ecret
                            >
                              Forgot Password?
                            </p> */}
                            <Link
                              className="primary-color secondary-font fs-16"
                              to="/forgetpassword"
                            >
                              Forgot Password?
                            </Link>
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            className="btn-green2 text-white  mb-2 "
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Log In
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                  <div className="formFooter">
                    <p className="secondary-font fs-16 text-center mb-4">
                      Don’t have an account?
                      <Link
                        className="primary-color secondary-font-medium ps-1"
                        to="/signup"
                      >
                        Sign Up
                      </Link>
                    </p>
                    {/* <h2 className='orLogin secondary-font fs-16'>
                      <span style={{ color: '#999999' }}>
                        Or{' '}
                        <span className='c2 p-0 secondary-font-medium'>
                          Log In
                        </span>{' '}
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

export default Signin;
