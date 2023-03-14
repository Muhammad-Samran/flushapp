import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import "./JobArchitectureCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { faFilePdf, faComments } from "@fortawesome/free-regular-svg-icons";
import { Form } from "react-bootstrap";
import Select from "react-select";
import dateFormat from "dateformat";
import ResumeDisplay from "../ResumeDisplay/ResumeDisplay";
import { useNavigate } from "react-router-dom";
import axios from "../../../Services/AxiosConfig";

const jobType = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
];
const customStyles = {
  dropdownIndicator: (base) => ({
    ...base,
    color: "#06C864", // Custom colour
  }),
};

const JobArchitectureCard = (props) => {
  const navigate = useNavigate();
  const [show, setShow] = useState();
  const [resume, setResume] = useState();

  const handlePopup = async (resume_link) => {
    // console.log("this is resume link on icon", resume_link)
    await setShow(true);
    await setResume(resume_link);
  };

  const changeStatus = async (value, JobApplicationId) => {
    // console.log("job application id", JobApplicationId)
    try {
      let payload
      // console.log("values", value)
      switch (value) {
        case 'Accepted':
          payload = {
            job_application_id: [JobApplicationId],
            is_accepted : true
          }
          break;
        case 'Pending':
          payload = {
            job_application_id: [JobApplicationId],
            is_pending : true
          }
          break;
        case 'Shortlisted':
          payload = {
            job_application_id: [JobApplicationId],
            is_shortlisted : true
          }
          break
        case 'Reject':
          payload = {
            job_application_id: [JobApplicationId],
            is_rejected : true
          }
          break
        default:
            console.log(value)
            break
      }

      // console.log("payload", payload)
      const { data } = await axios.put(
        "job/response/service/", payload
      );
      // console.log(data)
      await props.getAPIData()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <ResumeDisplay show={show} setShow={setShow} resume={resume} />

      <div className="main-header main-header-mobile">
        <div className="header-title">
          <span>{props.JobId} - Applicants</span>
        </div>
        {/* <div className="header-filter"> */}
        <Form>
          <Form.Group className="mb-3">
            <div className="header-filter">
              <div className="label-filter">
                <span>Sort by:</span>
              </div>
              <div className="job-position-fields" style={{ width: "50px" }}>
                <FontAwesomeIcon
                  icon={faArrowUp}
                  style={{ color: "#3F464E" }}
                />{" "}
                <FontAwesomeIcon
                  icon={faArrowDown}
                  style={{ color: "#3F464E" }}
                />
              </div>
              <div className="label-filter">
                <span>Filter by:</span>
              </div>
              <div className="job-position-fields">
                <Select
                  styles={customStyles}
                  components={{ IndicatorSeparator: () => null }}
                  options={jobType}
                  placeholder="All"
                />
              </div>
            </div>
          </Form.Group>
        </Form>
        {/* </div> */}
      </div>
      <div className="top-headings">
        <div className="position-heading detail-heading">
          <span>Applicant</span>
        </div>

        <div className="center-detail center-detail-start">
          <div className="detail-heading heading-min-width">
            <span>Email</span>
          </div>
          <div className="detail-heading heading-min-width">
            <span>Phone</span>
          </div>
          <div className="detail-heading heading-min-width">
            <span>Resume</span>
          </div>
          <div className="detail-heading heading-min-width">
            <span>Chat</span>
          </div>
          <div className="detail-heading heading-min-width">
            <span>Status</span>
          </div>
          <div className="detail-heading heading-min-width">
            <span>Action</span>
          </div>
        </div>
      </div>

      {props.getData.map((item, index) => (
        <div className="main job-position-main">
          <div className="body-width">
            <div className="checkbox">
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" />
              </Form.Group>
            </div>
            <div
              className="title title-job-position"
              style={{ color: "#3F464E" }}
            >
              <h4
                onClick={() =>
                  navigate(`/job-applicants-detail`, {
                    state: {
                      applicant_id: item.applicant_id,
                      job_id: item.job_post_id
                    },
                  })
                }
              >
                {item.applicant_name}
              </h4>

              <div className="sub-title" style={{ color: "#3F464E" }}>
                <p>{item.user_headline}</p>
              </div>

              <div className="job-detail">
                <div className="location" style={{ marginRight: "15px" }}>
                  <span>
                    Created on: {dateFormat(item.create_ts, "mmmm dS, yyyy")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="center-detail center-detail-start">
            <div className="detail-counts heading-min-width">
              <span className="detail-desc">{item.applicant_email}</span>
            </div>
            <div className="detail-counts heading-min-width">
              <span className="detail-desc">{item.applicant_contact}</span>
            </div>
            <div className="detail-counts heading-min-width">
              <span
                className="detail-desc"
                onClick={() => {
                  handlePopup(item.applicant_resume);
                }}
              >
                <FontAwesomeIcon
                  icon={faFilePdf}
                  style={{ color: "#3F464E" }}
                />{" "}
                PDF
              </span>
            </div>
            <div className="detail-counts heading-min-width">
              <span className="detail-desc">
                <FontAwesomeIcon
                  icon={faComments}
                  style={{ color: "#3F464E" }}
                />{" "}
              </span>
            </div>
            <div className="heading-min-width">
              <div className="select-class">
                <Form.Select
                  size="sm"
                  defaultValue={item.is_accepted && "Accepted" || item.is_pending && "Pending" || item.is_shortlisted && "Shortlisted" || item.is_rejected && "Reject"}
                  onChange={(e) => {
                    changeStatus(e.target.value, item.jobapplication_id)
                    // console.log("status value", e.target.value)
                  }}
                >
                  <option value={"Accepted"}>Accepted</option>
                  <option value={"Shortlisted"}>Shortlisted</option>
                  <option value={"Reject"}>Reject</option>
                  <option value={"Pending"} >Pending</option>
                </Form.Select>
              </div>
            </div>
            <div className="detail-counts heading-min-width">
              <span
                className="detail-desc"
                onClick={async () => {
                  await props.deleteApplication(item.jobapplication_id);
                }}
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  style={{ color: "#888888" }}
                />{" "}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobArchitectureCard;
