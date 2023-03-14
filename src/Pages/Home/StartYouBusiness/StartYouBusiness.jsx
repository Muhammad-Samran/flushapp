import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./StartYouBusiness.scss";

import StartYouBusinessImg from "src/Assets/images/startBusiness.jpg";
const StartYouBusiness = () => {
  return (
    <>
      <section className="s-p">
        <Container>
          <div className=" d-sm-flex justify-content-between align-items-center customBG ">
            <div className="CustomPaddingInnerSectionlr pt-4">
              <h3 className="fs-24 primary-font text-white text-uppercase">
                Start your business or Personal journey with Flush
              </h3>
              <p className="text-white fs-16">
                Try Flush for free, and explore all the tools and services you
                need to start, run, and grow your business or personal social
                network
              </p>
              <p>
                <button type="button" className="btn wbtn">
                  Explore More
                </button>
              </p>
            </div>
            <div>
              <div>
                <img src={StartYouBusinessImg} className="img-fluid" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default StartYouBusiness;
