import React from "react";
import "./JobListingGridCard.css";
import fb from "src/Assets/images/fb.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark as RegularBookmark,
  faMoneyBill1,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const JobListingGridCard = ({ item }) => {
  return (
    <Link to="/jobs/1">
      <div className="grid-main">
        <div className="grid-body">
          <div className="grid-head">
            <div className="logo-details">
              <div className="grid-logo">
                <img src={fb} height={70} />
              </div>
              <div className="grid-heading">
                <h4>Fast Box</h4>
                <span>
                  {" "}
                  Delivery Sources <br /> Posted: 1 Hours ago{" "}
                </span>
              </div>
            </div>
            <div className="grid-buttons">
              <div className="button-1">
                <button className="button-1">
                  <FontAwesomeIcon icon={RegularBookmark} />
                </button>
              </div>
              <div className="button-2">
                <button className="button-2">{item.workLocation}</button>
              </div>
            </div>
          </div>

          <div className="job-detail">
            <div className="grid-title">
              <h4>{item.title}</h4>

              <div className="job-detail">
                <div className="location" style={{ marginRight: "15px" }}>
                  <span>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      style={{ color: "#37d1aa" }}
                    />{" "}
                  </span>
                  <span>{item.location}</span>
                </div>
                <div className="job-type" style={{ marginRight: "15px" }}>
                  <span>
                    <FontAwesomeIcon
                      icon={faClock}
                      style={{ color: "#37d1aa" }}
                    />{" "}
                  </span>
                  <span>{item.jobType}</span>
                </div>
                <div className="salary" style={{ marginRight: "15px" }}>
                  <span>
                    <FontAwesomeIcon
                      icon={faMoneyBill1}
                      style={{ color: "#37d1aa" }}
                    />{" "}
                  </span>
                  <span>{item.salary}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="job-desc">
            <p>{item.description}</p>
          </div>

          <div className="apply-button">
            <button className="button-3">Apply Now</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobListingGridCard;
