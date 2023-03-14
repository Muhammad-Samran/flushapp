import React, { useState } from "react";
import "./SavedJobsCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import sw from "src/Assets/images/sw.png";
import { faBookmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark as RegularBookmark,
  faMoneyBill1,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import dateFormat from "dateformat";
import Pagination from "../Pagination/Pagination";
import axios from "../../../Services/AxiosConfig";
import { ToastContainer, toast } from "react-toastify";

const SavedJobsCard = (props) => {

  return (
    <>
      <div className="main main-side-border-remove">
        <div className="body">
          <div className="img">
            <img src={sw} height={100} />
          </div>

          <div className="title" style={{ color: "#3F464E" }}>
            <h4>{props.item.job_title}</h4>

            <div className="sub-title" style={{ color: "#3F464E" }}>
              <p>{props.item.business_name}</p>
            </div>

            <div className="job-detail">
              <div className="location" style={{ marginRight: "15px" }}>
                <span>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ color: "#37d1aa" }}
                  />{" "}
                </span>
                <span>{props.item.work_location}</span>
              </div>
              <div className="job-type" style={{ marginRight: "15px" }}>
                <span>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{ color: "#37d1aa" }}
                  />{" "}
                </span>
                <span>{props.item.job_employment_type}</span>
              </div>
              <div className="salary" style={{ marginRight: "15px" }}>
                <span>
                  <FontAwesomeIcon
                    icon={faMoneyBill1}
                    style={{ color: "#37d1aa" }}
                  />{" "}
                </span>
                <span>{props.item.salary_offer}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="right-end">
          <div className="buttons">
            <button class="button1">{props.item.job_employment_type}</button>
            <button class="button2 saved-job-btn"
            onClick={async()=>{
              await props.saveAPI(props.item.job_post_id)
            }}
            >
              <FontAwesomeIcon icon={RegularBookmark} />
            </button>
          </div>
          <div className="span">
            <span>
              Posted on: {dateFormat(props.item.create_ts, "dd / mm / yyyy")}
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SavedJobsCard;
