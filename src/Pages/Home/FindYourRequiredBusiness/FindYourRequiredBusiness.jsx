import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./FindYourRequiredBusiness.css";
import Cleaning from "src/Assets/images/cleaning.png";
import Electrican from "src/Assets/images/elect.png";
import Package from "src/Assets/images/package.png";
import Painter from "src/Assets/images/painter.png";
const FindYourRequiredBusiness = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const services = [
    { img: Painter, title: "Painter" },
    { img: Electrican, title: "Electrican" },
    { img: Package, title: "Logistics " },
    { img: Cleaning, title: "Building Cleaning" },
    { img: Painter, title: "Painter" },
    { img: Electrican, title: "Electrican" },
    { img: Package, title: "Logistics " },
    { img: Cleaning, title: "Building Cleaning" },
  ];
  return (
    <>
      <section className="FindYourRequiredBusinessBg s-p">
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="fs-40 primary-font text-white ">
                Find Your Required Business
              </h2>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <p className="text-white fs-20 secondary-font">
                More than a thousand of the world's most successful brands trust
                Flush to sell their services, job portal, strong social
                networking and much more...
              </p>
            </Col>
            <Col md={4} className="text-end">
              <button className="wbtn btn">Explore More</button>
            </Col>
          </Row>
          <Row>
            <Carousel
              responsive={responsive}
              autoPlay={true}
              autoPlaySpeed={1000}
              dotListClass="custom-dot-list-style"
              // itemClass="carousel-item-padding-40-px"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              infinite={true}
              showDots={false}
              // centerMode={true}
            >
              {services.map((item, index) => {
                return (
                  <div key={index} className="p-3">
                    <img src={item.img} className="img-fluid" />
                    <p className="text-white secondary-font fst-normal fs-20">
                      {item.title}
                    </p>
                  </div>
                );
              })}
            </Carousel>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default FindYourRequiredBusiness;
