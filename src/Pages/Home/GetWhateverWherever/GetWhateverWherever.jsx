import React from "react";
import "./GetWhateverWherever.scss";
import { Col, Container, Row } from "react-bootstrap";
import Whatever1 from "src/Assets/images/whatever1.png";
import Whatever2 from "src/Assets/images/whatever2.png";
import Whatever3 from "src/Assets/images/whatever3.png";
const GetWhateverWherever = () => {
  const GetAnything = [
    {
      title: "Bring your business online",
      img: Whatever1,
      description:
        "Create your business profile and use all tools that help you find customers, drive sales, and manage your day-to-day.",
      url: "http://",
    },
    {
      title: "Bring Your Personal Profile Online",
      img: Whatever2,
      description:
        "Show more than a resume globally. You can show character in your resume by posting blogs, uploading projects and achievements and interact with people globally.",
      url: "http://",
    },
    {
      title: "Provide and seek services in your local area and globally.",
      img: Whatever3,
      description:
        "One of the key elements where flush concentrates is to enable service providers to provide services and seekers to be able to search service providers.",
      url: "http://",
    },
  ];
  return (
    <>
      <section className="s-p GetWhateverWherever" id="GetWhateverWherever">
        <Container>
          <Row>
            <Col md={12} className="text-center ">
              <div className="CustomPaddinglr">
                <h2 className="fs-40  primary-font h-c">
                  Get whatever or wherever you need with flush
                </h2>
                <p className="fs-20 secondary-font t-c">
                  More than a thousand of the world's most successful brands
                  trust Flush to sell their services, job portal, strong social
                  networking and much more...
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          {GetAnything.map((item, index) => {
            return (
              <Row
                key={index}
                className="whereverRow d-flex align-items-center"
              >
                <Col md={6}>
                  <div>
                    <img src={item.img} className="img-fluid" />
                  </div>
                </Col>
                <Col md={6}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </Col>
              </Row>
            );
          })}
        </Container>
      </section>
    </>
  );
};

export default GetWhateverWherever;
