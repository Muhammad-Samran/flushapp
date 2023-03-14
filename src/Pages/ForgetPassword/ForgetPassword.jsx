import React, { useState, useEffect } from 'react';
import { Row, Col, Container, FormGroup, InputGroup } from 'react-bootstrap';

import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Logo from '../../Assets/images/auth/logo2.png';
import TagLine from '../../Assets/images/auth/tag.png';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const ForgetPassword = () => {

  const handleSubmit = (values) => {
    try {
      // console.log(values);
    } catch (error) {
      console.log(error);
    }
  };
  const ForgetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required')
  });
  return (
    <section>
      <ToastContainer />

      <header className='position-relative'>
        <Container fluid>
          <Row>
            <Col>
              {/* <img src={Logo} alt="logo" className="uaLogo" /> */}
              {/* <Logo className="uaLogo" /> */}
            </Col>
          </Row>
        </Container>
      </header>
      <section className='signUp greenBg'>
        <Container fluid>
          <Row>
            <Col
              md={5}
              className='min-vh-100  gbg d-flex justify-content-center flex-column position-relative p-0 d-none d-sm-block'
            >
              <p className='text-center mb-0 mt-0'>
                <img src={Logo} alt='logo' className='logo-img img-fluid' />
              </p>
              <h1 className='tagline text-white text-center primary-font'>
                Where community <br /> meets service
              </h1>
              <img src={TagLine} alt='' className='img-fluid tag-line' />
            </Col>
            <Col
              md={7}
              className='d-flex align-items-center p-shadow rCol wbg px-5 formContainer'
            >
              <div className='signUpInnerCol w-100'>
                <h1 className='title-head primary-font secondary-color mt-3 mt-xl-0'>
                Forget Password!
                </h1>
                <p className='secondary-font primary-color fs-16'>
                  Enter Your Email to continue to Forget Password
                </p>
                <div className='signUpForm'>
                  <Formik
                    initialValues={{
                      email: ''
                    }}
                    validationSchema={ForgetPasswordSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      handleSubmit(values, setSubmitting);
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
                              htmlFor='email'
                              className='mb-1 d-block text-start'
                            >
                              E-mail*
                            </label>
                            <InputGroup className='inputField4'>
                              <input
                                type='email'
                                placeholder='Email Address'
                                name='email'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className='inputTransparent flex p-2'
                              />
                            </InputGroup>
                            <p className='text-danger fs-12'>
                              <ErrorMessage name='email' />
                            </p>
                          </FormGroup>
                        </div>
                        <div className='text-center'>
                          <button
                            className='btn-green2 text-white  mb-2 '
                            type='submit'
                            disabled={isSubmitting}
                          >
                            Continue
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                  <div className='formFooter'>
                    <p className='secondary-font fs-16 text-center mb-4'>
                      Don’t have an account?

                      <Link
                        className="secondary-color secondary-font-medium ps-1"
                        to="/signup"
                      >
                        Sign Up
                      </Link>
                    </p>
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

export default ForgetPassword;
