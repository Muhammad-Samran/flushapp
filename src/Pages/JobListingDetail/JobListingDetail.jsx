import {
  SidePanel,
  JobDetail,
} from "../../Components/global/JobListDetailPage/JobListDetailPage";
import React, { useEffect, useState } from "react";
import "../../Components/global/JobListDetailPage/JobListDetailPage.css";
import { Container, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { useLocation } from "react-router-dom";
// import data from "./demoData.json";
import "../../Components/global/JobListDetailPage/scrollbar.css";
import axios from "../../Services/AxiosConfig";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "../../Components/global/Pagination/Pagination";
import { useSelector } from "react-redux";
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

function JobListingDetail({ dataLimit = 12 }) {
  const location = useLocation();

  const [detailDataAPI, setDetailDataAPI] = useState();
  const [status, setStatus] = useState();
  const JobId = location.state.JobId;
  const [dataAPI, setData] = useState();
  const [totalData, setTotalData] = useState();
  const [startIndex, setStartIndex] = useState(0);


  useEffect(() => {
    getAPIData();
    getDetailAPIData(JobId);
  }, [startIndex]);

  const getAPIData = async () => {
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

  const getDetailAPIData = async (JobId) => {
    try {
      const { data } = await axios.get("job/business/detail/?job_id=" + JobId);
      // console.log("detail api data", data.data);
      await setDetailDataAPI(data.data);
      await applyStatus(JobId);
    } catch (error) {
      // console.log(error);
    }
  };

  const applyStatus = async (JobId) => {
    try {
      const { data } = await axios.get("applied/status/?job_id=" + JobId);
      // console.log(data);
      await setStatus(data.data);
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
      await applyStatus(JobId);
      showToast(data.success, "save", data.message);
    } catch (error) {
      // console.log(error);
      showToast(false, "save", "Network Error");
    }
  };

  const followAPI = async (businessId, JobId) => {
    try {
      const payload = {
        business_profile: businessId,
        is_following: true,
      };
      const { data } = await axios.post("business/followers/service/", payload);
      // console.log("follow business api", data);
      await getDetailAPIData(JobId);
    } catch (error) {
      // console.log(error);
    }
  };

  const unfollowAPI = async (businessId, JobId) => {
    try {
      const payload = {
        business_profile: businessId,
        is_following: false,
      };
      const { data } = await axios.post("business/followers/service/", payload);
      // console.log("unfollow business api", data);
      await getDetailAPIData(JobId);
    } catch (error) {
      // console.log(error);
    }
  };

  const showToast = (success, type, message) => {
    toast.dismiss();
    if (success && type === "applied") {
      toast.success("Job applied Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (!success && type === "applied") {
      toast.error("Error! Job applied Failed", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }

    if (success && type === "save") {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (!success && type === "save") {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };



  return (
    <>
      {dataAPI ? (
        <Container className="py-5">
          <div className="filter-detail-page">
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
          <Row>
            <Col lg={4}>
              <SidePanel
                getData={dataAPI}
                getDetailAPIData={getDetailAPIData}
                totalData={totalData}
                setStartIndex={setStartIndex}
                startIndex={startIndex}
              />
            </Col>
            <Col lg={8}>
              <JobDetail
                showToast={showToast}
                detailDataAPI={detailDataAPI}
                saveAPI={saveAPI}
                status={status}
                getDetailAPIData={getDetailAPIData}
                followAPI={followAPI}
                unfollowAPI={unfollowAPI}
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <Loader/>
      )}

      <ToastContainer />
    </>
  );
}

export default JobListingDetail;
