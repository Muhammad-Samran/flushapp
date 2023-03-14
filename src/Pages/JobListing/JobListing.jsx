import React, { useState, useEffect } from "react";
import { Container, Row, Card, Button, Col } from "react-bootstrap";
import "../../Components/global/JobListingCard/JobListingCard.css";
import data from "./demoData.json";
import { Form } from "react-bootstrap";
import Select from "react-select";
import Layout from "src/Components/global/Dashboard/Layouts/Layout";
import JobsSmallSideCard from "src/Components/global/JobsSmallSideCard/JobsSmallSideCard";
import JobListingCard from "../../Components/global/JobListingCard/JobListingCard";
import axios from "../../Services/AxiosConfig";
import Pagination from "../../Components/global/Pagination/Pagination";
import { ToastContainer, toast } from "react-toastify";
import Loader from "src/Components/UI/Loader/Loader";

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

const JobListing = ({ dataLimit = 10 }) => {
  const [dataAPI, setData] = useState();
  const [totalData, setTotalData] = useState();
  const pages = Math.ceil(totalData / dataLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);

  let endValue
  if (totalData <= dataLimit) {
    endValue = totalData
  }
  else {
    endValue = dataLimit - 1
  }
  const [endIndex, setEndIndex] = useState(endValue);

  let remainingIndex = totalData % dataLimit;

  useEffect(() => {
    RecommendedJobAPI();
  }, [startIndex]);


  const RecommendedJobAPI = async () => {
    try {
      const { data } = await axios.get("job/recommended/?index=" +
        startIndex +
        "&offset=" +
        dataLimit);
      // console.log("RecommendedJobAPI", data);
      await setData(data.data);
      await setTotalData(data.total_jobs);
    } catch (error) {
      console.log(error);
    }
  };

  const saveAPI = async (JobId) => {
    try {

      const payload = {
        post_id: JobId
      }
      const { data } = await axios.post(
        "job/save/", payload
      );
      // console.log("save job api", data);
      await RecommendedJobAPI()
      showToast(data.success, "save", data.message)
    } catch (error) {
      // console.log(error);
      showToast(false, "save", "Network Error")
    }
  };

  const showToast = (success, type, message) => {
    toast.dismiss();

    if (success && type === "save") {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    } 
    else if(!success && type === "save") {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  };

  async function goToNextPage() {
    // console.log("currentPage number", currentPage);

    if (currentPage + 1 > pages) {
      return;
    } else if (currentPage + 1 == pages) {
      setStartIndex(totalData - remainingIndex);
      setEndIndex(totalData - 1);
    }
    else if (startIndex <= totalData) {
      setEndIndex(totalData);
    }
    else {
      setCurrentPage((page) => page + 1);

      setStartIndex(startIndex + dataLimit);
      setEndIndex(endIndex + dataLimit);
    }
  }

  async function goToPreviousPage() {
    // console.log("current page on previous", currentPage);
    if (currentPage == 0) {
      return;
    } else if (currentPage + 1 === pages) {
      setCurrentPage((page) => page - 1);
      setStartIndex(startIndex - dataLimit);
      setEndIndex(endIndex - remainingIndex);
    }
    // else if(endIndex == totalData){
    //   setEndIndex(totalData);
    // }
    else if (startIndex != 0) {
      setCurrentPage((page) => page - 1);

      setStartIndex(startIndex - dataLimit);
      setEndIndex(endIndex - dataLimit);
    }
  }


  return (
    <>
      <Container className="py-5">
        <Row>
          <Col lg={3} md={3}>
            <JobsSmallSideCard />
          </Col>
          <Col lg={9} md={9}>
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
            <div className="JobListHeader mapJobList">
              <span>Recommended Jobs for You</span>
            </div>
            {/* <div className="mapJobList"> */}
            {dataAPI ?
              dataAPI.map((item, index) => (
                <JobListingCard
                  item={item}
                  saveAPI={saveAPI}
                />
              ))
              :
              <Loader />
            }

            {/* <div className="JobListFooter">
                <span>
                  <a href="#">See All Recommended</a>
                </span>
              </div> */}
            {/* </div> */}

            <div style={{ paddingTop: '10px' }}>
              <Pagination
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                totalData={totalData}
                startIndex={startIndex}
                endIndex={endIndex}
              />
            </div>


            {/* <div className="similar-job">
              <div className="JobListHeader">
                <span>Similar to a job you applied in last week</span>
              </div>
              <div>
                {data.map((item, index) => (
                  <JobListingCard item={item} />
                ))}

                <div className="JobListFooter">
                  <span>
                    <a href="#">See All Recommended</a>
                  </span>
                </div>
              </div>
            </div> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default JobListing;
