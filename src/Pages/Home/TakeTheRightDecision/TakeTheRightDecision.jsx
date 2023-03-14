import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./TakeTheRightDecision.scss";
import FeatureImg1 from "src/Assets/images/feature1.png";
import FeatureImg2 from "src/Assets/images/feature2.png";
import FeatureImg3 from "src/Assets/images/feature3.png";
const TakeTheRightDecision = () => {
  const features = [
    {
      img: FeatureImg1,
      title: "Bring your business online",
      description:
        "Create your business profile and use all tools that help you find customers, drive sales, and manage your day-to-day.",
    },
    {
      img: FeatureImg2,
      title: "Bring your personal profile online",
      description:
        "Show more than a resume globally. You can show character in your resume by posting blogs, uploading projects and achievements and interact with people globally.",
    },
    {
      img: FeatureImg3,
      title: "Provide & seek services locally & globally",
      description:
        "One of the key elements where flush concentrates is to enable service providers to provide services and seekers to be able to search service providers.",
    },
  ];
  return (
    <>
      <section id="TakeTheRightDecision" className="TakeTheRightDecision py-5 overflow-hidden">
        <div className="py-4">
          <div class="mar">
            <span className="fs-40">Take the Right Decision with Flush</span>
          </div>
          <div class="mar mar2">
            <span className="fs-40">Take the Right Decision with Flush</span>
          </div>
          <div class="mar mar3">
            <span className="fs-40">Take the Right Decision with Flush</span>
          </div>
          <div class="mar mar4">
            <span className="fs-40">Take the Right Decision with Flush</span>
          </div>
        </div>

        <Container className="pt-md-5">
          <Row className="text-md-start text-center ">
            {features.map((feature, index) => {
              return (
                <Col md={4} key={index}>
                  <div className="p-2">
                    <img src={feature.img} />
                  </div>
                  <div className="fs-18 text-white f-bold py-2">
                    {feature.title}
                  </div>
                  <div className="fs-16 text-white">{feature.description}</div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default TakeTheRightDecision;
