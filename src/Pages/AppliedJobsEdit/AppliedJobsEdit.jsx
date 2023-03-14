import AppliedJobsEditCard from "../../Components/global/AppliedJobsCard/AppliedJobsCard";
import React, { useEffect, useState } from "react";
import { Container, Row, Card, Button, Col } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import "../../Components/global/AppliedJobsCard/AppliedJobsCard.css";
import data from "./demoData.json";
import { Form } from "react-bootstrap";
import Select from "react-select";

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

function AppliedJobsEdit({ pageLimit = 5, dataLimit = 12 }) {
  const pages = Math.round(data.length / dataLimit);
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    // console.log("total page Number", pages);
    // console.log("current page number", currentPage + 1);
    if (currentPage + 1 > pages) {
      return;
    } else {
      setCurrentPage((page) => page + 1);
    }
  }

  function goToPreviousPage() {
    // console.log("current page on previous", currentPage - 1);
    if (currentPage - 1 == 0) {
      return;
    } else {
      setCurrentPage((page) => page - 1);
    }
  }

  function changePage(event) {
    const pageNumber = Number(event.target.text);
    // console.log("page Number", pageNumber);
    if (pageNumber) {
      setCurrentPage(pageNumber);
    } else {
      return;
    }
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  return (
    <>
      <Container className="py-5">
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
        <div className="JobListHeader">
          <span>My Applied Jobs</span>
        </div>

        <AppliedJobsEditCard
          pages={pages}
          currentPage={currentPage}
          changePage={changePage}
          getData={getPaginatedData()}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
        />
      </Container>
    </>
  );
}

export default AppliedJobsEdit;
