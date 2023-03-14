import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./JobOffer.scss";
import SlImg from "src/Assets/images/sl.jpg";
import FbImg from "src/Assets/images/fb.jpg";
import EsImg from "src/Assets/images/es.jpg";
import SwImg from "src/Assets/images/sw.jpg";
const JobOffer = () => {
  const Jobs = [
    {
      img: SlImg,
      companyName: "Source Lab",
      location: "New York, USA",
      jobTitle: "Sales Manager",
      jobType: "Full Time",
      jobDescription:
        "We are looking for Visual Designer who can create user flows, wireframes, prototypes and mockups, understand the user feedback",
    },
    {
      img: FbImg,
      companyName: "Fast Box",
      location: "Sydney",
      jobTitle: "Associate Creative Manager",
      jobType: "Remote-Hourly",
      jobDescription:
        "Looking for an Associate Creative Director to manage creative and production projects from concept creation to completion.",
    },
    {
      img: EsImg,
      companyName: "Eco Studio",
      location: "California",
      jobTitle: "Remote Architect",
      jobType: "Part Time Remote",
      jobDescription:
        "Collaborate with engineers, PM and other teams in the company to evangelize the design system",
    },
    {
      img: SwImg,
      companyName: "Super Washers",
      location: "Texas, USA",
      jobTitle: "Native Developer",
      jobType: "Full Time",
      jobDescription:
        "Communicate with product and engineering teams, as well as business stakeholders and executive leadership",
    },
  ];
  return (
    <>
      <section className="s-p">
        <Container>
          <Row>
            <Col md={12}>
              <div className="CustomPaddinglr">
                <h2 className="fs-48 fw-light text-center">
                  More than{" "}
                  <span className="f-bold customHeading">
                    {" "}
                    200,000 companies
                  </span>{" "}
                  sponsorhip with us so you can Apply for Job Offer
                </h2>
              </div>
            </Col>
          </Row>
          <Row className="r-p">
            {Jobs.map((item, index) => {
              return (
                <Col key={index} md={4} lg={3} className="py-3">
                  <div className="JobContainer">
                    <div className="JobCompanyDetail d-flex justify-content-start align-items-center py-2">
                      <div className="CompanyLogo">
                        <img src={item.img} className="img-fluid" />
                      </div>
                      <div className="CompanyDetail px-2">
                        <p className="fs-16">{item.companyName}</p>
                        <p className="fs-12 ct-c">{item.location}</p>
                      </div>
                    </div>
                    <div className="JobDetail py-3">
                      <p className=" fs-18">{item.jobTitle}</p>
                      <p className=" fs-14 customHeading">{item.jobType}</p>
                      <p className=" fs-14 pt-3 pb-2 ">{item.jobDescription}</p>
                    </div>
                    <div className="JobCTA pb-2">
                      <button className="btn wobtn">Apply Now</button>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
          <Row>
            <Col className="text-center">
              <button className="btn wbtn">See All Listings</button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default JobOffer;
