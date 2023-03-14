import React, { Suspense } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from 'src/Assets/images/auth/logo2.png';
import TagLine from 'src/Assets/images/auth/tag.png';
import WorkExperience from './WorkExperience/WorkExperience';
import Education from './Education/Education';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import Skills from './Skills/Skills';
import Portfolio from './Portfolio/Portfolio';
import Bio from './Bio/Bio';
import Loader from '../UI/Loader/Loader';
function OnBoarding() {
  const location = useLocation();
  return (
    <div>
      <section className='signUp greenBg'>
        <Container fluid>
          <Row>
            <Col md={5} className='min-vh-100  p-0 gbg position-relative'>
              <div className='d-flex justify-content-center align-items-center flex-column w-100 h-100'>
                <div className='position-fixed  '>
                  <p className='text-center mb-0 mt-0'>
                    <img src={Logo} alt='logo' className='logo-img img-fluid' />
                  </p>
                  <h1 className='tagline text-white text-center primary-font'>
                    Where community <br /> meets service
                  </h1>
                </div>
                <img src={TagLine} alt='' className='img-fluid tag-line' />
              </div>
            </Col>
            <Col
              md={7}
              className='d-flex py-4 p-shadow align-items-center rCol height-max-100vh wbg px-md-5 '
            >
              <div className='signUpInnerCol w-100'>
                <div className='signUpForm'>
                  <Suspense fallback={<Loader/>}>
                    <Routes>
                      <Route
                        exact
                        path=''
                        element={<Navigate replace to='bio' />}
                      />
                      <Route
                        exact
                        path='bio'
                        element={
                          <Bio navigateTo='/on-boarding/work-experience' />
                        }
                      />
                      <Route
                        exact
                        path='work-experience'
                        element={
                          <WorkExperience
                            navigateTo='/on-boarding/education'
                            onboardingData={null}
                          />
                        }
                      />
                      <Route
                        exact
                        path='education'
                        element={
                          <Education navigateTo='/on-boarding/portfolio' />
                        }
                      />
                      <Route
                        exact
                        path='portfolio'
                        element={<Portfolio navigateTo='/on-boarding/skills' />}
                      />

                      <Route
                        exact
                        path='skills'
                        element={<Skills navigateTo='/feed' />}
                      />

                      {/* <Route
                        exact
                        path='business/step1'
                        element={
                          <BusinessSignUpStep1 navigateTo='/on-boarding/business/step2' />
                        }
                      /> */}
                    </Routes>
                  </Suspense>
                  <div className='formFooter'></div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* <SignupPersonal /> */}
    </div>
  );
}

export default OnBoarding;
