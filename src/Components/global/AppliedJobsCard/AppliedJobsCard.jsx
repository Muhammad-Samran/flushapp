import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import "./AppliedJobsCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import es from "src/Assets/images/es.png";
import {
  faBookmark,
  faCheck,
  faClose,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark as RegularBookmark,
  faMoneyBill1,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import dateFormat from "dateformat";
import CancelPopUp from "../CancelPopUp/CancelPopUp";

const AppliedJobsCard = (props) => {
  const [show, setShow] = useState(false);
  const [JobId, setJobId] = useState();

  const createModelHandleShow = (JobId) => {
    setShow(true)
    setJobId(JobId)
  };

  return (
    <>
      <CancelPopUp
        show={show}
        setShow={setShow}
        cancelAPI={props.cancelAPI}
        JobId={JobId}
      />
      <div className="mapping-area">
        {props.dataAPI.map((item, index) => (
          
          <div className="main">
            <div className="body">
              <div className="img">
                <img src={es} height={100} />
              </div>

              <div className="title" style={{ color: "#3F464E" }}>
                <h4>{item.job_title}</h4>

                <div className="sub-title" style={{ color: "#3F464E" }}>
                  <p>{item.business_name}</p>
                </div>

                <div className="job-detail">
                  <div className="location" style={{ marginRight: "15px" }}>
                    <span>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        style={{ color: "#37d1aa" }}
                      />{" "}
                    </span>
                    <span>{item.work_location}</span>
                  </div>
                  <div className="job-type" style={{ marginRight: "15px" }}>
                    <span>
                      <FontAwesomeIcon
                        icon={faClock}
                        style={{ color: "#37d1aa" }}
                      />{" "}
                    </span>
                    <span>{item.job_employment_type}</span>
                  </div>
                  <div className="salary" style={{ marginRight: "15px" }}>
                    <span>
                      <FontAwesomeIcon
                        icon={faMoneyBill1}
                        style={{ color: "#37d1aa" }}
                      />{" "}
                    </span>
                    <span> $ {item.salary_offer}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="applied-right-side">
              <div className="right-end">
                <div className="buttons">
                  <button class="button1">{item.job_employment_type}</button>
                  {item.is_saved ? (
                    <button
                      class="button2 saved-job-btn"
                      onClick={async () => {
                        await props.saveAPI(item.job_post_id);
                      }}
                    >
                      <FontAwesomeIcon icon={RegularBookmark} />
                    </button>
                  ) : (
                    <button
                      class="icon-button"
                      onClick={async () => {
                        await props.saveAPI(item.job_post_id);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={RegularBookmark}
                        style={{ color: "#3F464E", fontSize: "small" }}
                      />
                    </button>
                  )}
                  <button class="icon-button">
                    <FontAwesomeIcon
                      icon={faClose}
                      style={{ color: "#3F464E" }}
                      onClick={()=>{createModelHandleShow(item.job_post_id)}}
                    />
                  </button>
                </div>
                <div className="span">
                  <span>
                    Posted on: {dateFormat(item.create_ts, "dd / mm / yyyy")}
                  </span>
                </div>
              </div>
              <div className="applied-btn">
                <button className="applied-button">
                  <span>
                    <FontAwesomeIcon icon={faCheck} />
                    Applied
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AppliedJobsCard;
