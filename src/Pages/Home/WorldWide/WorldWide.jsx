import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./WorldWide.scss";
import MapImg from "src/Assets/images/map.png";
import Carousel from "react-multi-carousel";
const WorldWide = () => {
  return (
    <>
      <section className="s-p">
        <Container>
          <Row>
            <Col md={12}>
              <div className="CustomPaddinglr">
                <h2 className="fs-48 fw-light text-center">
                  Over{" "}
                  <span className="f-bold customHeading">
                    1,300,000 businesses
                  </span>{" "}
                  locally and worldwide have made over $200 billion USD in sales
                  using flush
                </h2>
              </div>
            </Col>
            <Col md={12} className="pt-3">
              <div>
                <img src={MapImg} className="img-fluid" alt="Map Image Flush" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default WorldWide;
