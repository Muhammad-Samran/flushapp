import JobListingGridCard from "../../Components/global/JobListingGridCard/JobListingGridCard";
import React from "react";
import "../../Components/global/JobListingGridCard/JobListingGridCard.css";
import { Container, Row, Col } from "react-bootstrap";
import data from "./demoGridData.json";
import { Form } from "react-bootstrap";
import Select from "react-select";
import JobsSmallSideCard from "src/Components/global/JobsSmallSideCard/JobsSmallSideCard";

const jobType = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
];
const experience = [
  { value: "less_then_year", label: "Less then a Year" },
  { value: "between", label: "Between 1 to 3 Years" },
  { value: "greater", label: "Greater than 3 Years" },
];
const datePosted = [
  { value: "today", label: "Today" },
  { value: "yesturday", label: "Yesturday" },
];
const customStyles = {
  dropdownIndicator: (base) => ({
    ...base,
    color: "#06C864", // Custom colour
  }),
};

const mapData = () => {
  return (
    <>
      {data.map((item, index) => (
        <JobListingGridCard item={item} />
      ))}
    </>
  );
};

const JobListingGrid = () => {
  return (
    <>
      <Container className="py-5">
        <Row>
          {/* <Col lg={3} md={3}>
            <JobsSmallSideCard />
          </Col> */}
          <Col>
            <div className="Filter">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <div className="label">
                    <span>Filter by:</span>
                  </div>
                  <div className="fields">
                    <Row>
                      <Col lg={3} md={6} className="mb-md-3">
                        <Form.Control type="text" placeholder="Location" />
                      </Col>
                      <Col lg={3} md={6}>
                        <Select
                          styles={customStyles}
                          components={{ IndicatorSeparator: () => null }}
                          options={jobType}
                          placeholder="Job Type"
                        />
                      </Col>
                      <Col lg={3} md={6}>
                        <Select
                          styles={customStyles}
                          components={{ IndicatorSeparator: () => null }}
                          options={experience}
                          placeholder="Experience"
                        />
                      </Col>
                      <Col lg={3} md={6}>
                        <Select
                          styles={customStyles}
                          components={{ IndicatorSeparator: () => null }}
                          options={datePosted}
                          placeholder="Dated Posted"
                        />
                      </Col>
                    </Row>
                  </div>
                </Form.Group>
              </Form>
            </div>

            <p className="grid-headline">Recommended Jobs for You</p>
            <div className="job-listing-grid">{mapData()}</div>
            <div className="load-more-btn">
              <button className="button-4">
                <span>Load More Services</span>
              </button>
            </div>

            <p className="grid-headline">
              Similar to a job you applied in last week
            </p>
            <div className="job-listing-grid">{mapData()}</div>
            <div className="load-more-btn">
              <button className="button-4">
                <span>Load More Services</span>
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default JobListingGrid;
