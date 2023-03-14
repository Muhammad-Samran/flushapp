import AppliedJobsCard from "../../Components/global/AppliedJobsCard/AppliedJobsCard";
import React, { useEffect, useState } from "react";
import { Container, Row, Card, Button, Col } from "react-bootstrap";
import "../../Components/global/AppliedJobsCard/AppliedJobsCard.css";
// import data from "./demoData.json";
import { Form } from "react-bootstrap";
import Select from "react-select";
import JobsSmallSideCard from "../../Components/global/JobsSmallSideCard/JobsSmallSideCard";
import axios from "../../Services/AxiosConfig";
import Pagination from "src/Components/global/Pagination/Pagination";
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

function AppliedJobs({ dataLimit = 10 }) {
  const [totalData, setTotalData] = useState();
  const [dataAPI, setData] = useState();
  const pages = Math.ceil(totalData / dataLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(dataLimit - 1);

  useEffect(async () => {
    let check = true;
    if (check) {
      await getAPIData();
      check = false;
    }
  }, [startIndex]);

  let remainingIndex = totalData % dataLimit;

  const getAPIData = async () => {
    try {
      const { data } = await axios.get(
        "job/apply/service/?index=" + startIndex + "&offset=" + dataLimit
      );
      // console.log("job api data", data);
      await setTotalData(data.total_jobs);
      await setData(data.data);
      // console.log("data from axios", dataAPI);
    } catch (error) {
      // console.log(error);
    }
  };

  const saveAPI = async (JobId) => {
    try {
      const payload = {
        post_id: JobId,
      };
      const { data } = await axios.post("job/save/", payload);
      // console.log("save job api", data);
      await getAPIData();
      showToast(data.success,"saved",data.message)
    } catch (error) {
      // console.log(error);
      showToast(false,"saved","Network Error")
    }
  };

  const cancelAPI = async (JobId) => {
    try {
      const payload = {
        job_post: JobId,
        applicant_has_cancelled: true,
      };
      const { data } = await axios.put("job/apply/service/", payload);
      // console.log("cancel job api", data);
      await getAPIData();
      showToast(data.success,"cancel",data.message)
    } catch (error) {
      // console.log(error);
      showToast(false,"cancel","Network Error")
    }
  };

  const showToast = (success, type, message) => {
    toast.dismiss();
    if (success && type === "saved") {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    } 
    else if(!success && type === "saved") {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }

    if (success && type === "cancel") {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    } 
    else if(!success && type === "cancel") {
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
    } else {
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
    } else if (startIndex != 0) {
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
            {dataAPI ? (
              <div>
                <div className="JobListHeader">
                  <span>My Applied Jobs</span>
                </div>

                <AppliedJobsCard
                  getAPIData={getAPIData}
                  saveAPI={saveAPI}
                  dataAPI={dataAPI}
                  cancelAPI={cancelAPI}
                  showToast={showToast}
                />

                <div style={{ paddingTop: "10px" }}>
                  <Pagination
                    goToNextPage={goToNextPage}
                    goToPreviousPage={goToPreviousPage}
                    totalData={totalData}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    getAPIData={getAPIData}
                  />
                </div>
              </div>
            ) : (
              <Loader/>
            )}
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
}

export default AppliedJobs;
