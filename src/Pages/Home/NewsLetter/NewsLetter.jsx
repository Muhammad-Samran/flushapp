import React from "react";
import { Container, Row } from "react-bootstrap";
import "./NewsLetter.scss";
const NewsLetter = () => {
  return (
    <>
      <section className="s-p NewsLetter " id="NewsLetter">
        <Container>
          <div className="d-sm-flex justify-content-center align-items-center CustomPaddinglr">
            <div className="fs-24 text-white py-2">
              Subscribe and <br className=" d-none d-sm-block" />
              Updated with us
            </div>
            <div className="d-sm-flex flex-grow-1 justify-content-between align-items-center  px-3">
              <div className="flex-grow-1 py-2 px-sm-2">
                <input
                  type="text"
                  value=""
                  className="form-control"
                  name="fullname"
                  placeholder="Full Name"
                />
              </div>
              <div className="flex-grow-1 ">
                <input
                  type="email"
                  value=""
                  className="form-control"
                  name="email"
                  placeholder="Email Address"
                />
              </div>
              <div className="p-md-2 py-2">
                <button type="button " className="btn bbtn">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default NewsLetter;
