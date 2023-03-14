import React, { useEffect, useState } from "react";
// import Pagination from "react-bootstrap/Pagination";
import "./JobArchiveCard.css";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
import AxiosConfig from "../../../Services/AxiosConfig";

import {
  faArrowDown,
  faArrowUp,
  faBoxArchive,
  faBoxOpen,
  faFolderOpen,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

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

const JobArchiveCard = (props) => {
  const navigate = useNavigate();

  const UnArchiveAPI = async (JobId) => {
    try {
      const payload = {
        job_post_id: JobId,
        is_expired: false,
      };

      const { data } = await AxiosConfig.put("archive/job/post/", payload);

      props.showToast(data.success, "unarchive");
    } catch (error) {
      // console.log(error);
      props.showToast(false, "unarchive");
    }
  }
  const DeleteAPI = async (JobId) => {
    try {

      const { data } = await AxiosConfig.delete("job/post/service/?job_post_id=" + JobId);
      // console.log("delete api ", data)
      props.showToast(data.success, "delete");
    } catch (error) {
      // console.log(error);
      props.showToast(false, "delete");
    }
  }

  return (
    <>
      <div className="main-header">
        <div className="header-title">
          <span>Archive Jobs</span>
        </div>
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
      </div>
      <div className="top-headings d-flex">
        <div className="position detail-heading">
          <span>Positions</span>
        </div>

        <div className="center-detail " style={{ marginRight: "50px" }}>
          <div className="detail-heading">
            <span>Applicants</span>
          </div>
          <div className="detail-heading">
            <span>Interview</span>
          </div>
          <div className="detail-heading">
            <span>Hired</span>
          </div>
          <div className="detail-heading">
            <span>Rejected</span>
          </div>
          <div className="detail-heading">
            <span>Pending</span>
          </div>
          <div className="detail-heading">
            <span>Job Status</span>
          </div>
          <div className="detail-heading">
            <span>Action</span>
          </div>
        </div>
      </div>

      {props.getData.map((item, index) =>
        item.is_expired ? (
          <div className="main job-position-main">
            <div className="body">
              <div className="checkbox">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" />
                </Form.Group>
              </div>
              <div
                className="title title-job-position"
                style={{ color: "#3F464E" }}
              >
                <h4>{item.job_title}</h4>

                <div className="sub-title" style={{ color: "#3F464E" }}>
                  <p>{item.work_location}</p>
                </div>

                <div className="job-detail">
                  <div className="location" style={{ marginRight: "15px" }}>
                    <span>
                      Created on:{" "}
                      {dateFormat(item.create_ts, "dddd, mmmm dS, yyyy")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="main-center-detail"> */}
            <div className="center-detail">
              <div className="detail-counts">
                <span>{item.total_apllications}</span> <br />{" "}
                <span className="detail-desc">Candidates</span>
              </div>
              <div className="detail-counts">
                <span>{item.total_interviewed}</span> <br />{" "}
                <span className="detail-desc">Interviewed</span>
              </div>
              <div className="detail-counts">
                <span>{item.total_hired}</span> <br />{" "}
                <span className="detail-desc">Hired</span>
              </div>
              <div className="detail-counts">
                <span>{item.total_rejected}</span> <br />{" "}
                <span className="detail-desc"> Rejected</span>
              </div>
              <div className="detail-counts">
                <span>{item.total_pending}</span> <br />{" "}
                <span className="detail-desc">Pending</span>
              </div>
              <div className="detail-counts">
                <Form.Select
                  size="sm"
                  disabled={item.is_expired}
                  defaultValue={item.is_open == true && "Open" || item.is_open == false && "Close"}
                >
                  <option value={"Open"} >Open</option>
                  <option value={"Close"}>Close</option>
                </Form.Select>
              </div>
              <div className="detail-counts buttons-position">
                <div className="edit-btn">
                  <button
                    class="button2 edit-job-btn "
                    style={{ marginRight: "10px" }}
                    onClick={async () => {
                      await DeleteAPI(item.job_post_id);
                      await props.getAPIData()
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      style={{ color: "#37d1aa" }}
                    />{" "}
                  </button>
                </div>
                <div className="archive-btn">
                  <button
                    class="button2 edit-job-btn"
                    onClick={async () => {
                      await UnArchiveAPI(item.job_post_id);
                      await props.getAPIData()
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faBoxOpen}
                      style={{ color: "#37d1aa" }}
                    />{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null
      )}
    </>
  );
};

export default JobArchiveCard;
