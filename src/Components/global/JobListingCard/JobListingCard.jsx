import React from "react";
import "./JobListingCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import es from "src/Assets/images/es.png";
import { faBookmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";
import { useNavigate } from "react-router-dom";

import {
  faBookmark as RegularBookmark,
  faMoneyBill1,
  faClock,
} from "@fortawesome/free-regular-svg-icons";

const JobListingCard = ({ item, saveAPI }) => {
  const navigate = useNavigate()
  return (
    <>
      <div className="main">
        <div className="body">
          <div className="img">
            <img src={es} height={100} />
          </div>

          <div className="title" style={{ color: "#3F464E" }}
            onClick={() =>
              navigate(`/jobs/${item.job_post_id}`, {
                state: {
                  JobId: item.job_post_id,
                },
              })
            }
          >
            <h4>{item.job_title}</h4>

            <div className="sub-title" style={{ color: "#3F464E" }}>
              <p>Pixarsart</p>
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
                <span>{item.salary_offer}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="right-end right-end-2">
          <div className="buttons">
            <button class="button1">{item.job_employment_type}</button>
            {item.is_saved ? (
              <button
                class="button2 saved-job-btn"
                onClick={async () => {
                  await saveAPI(item.job_post_id);
                }}
              >
                <FontAwesomeIcon icon={RegularBookmark} />
              </button>
            ) : (
              <button
                class="icon-button"
                onClick={async () => {
                  await saveAPI(item.job_post_id);
                }}
              >
                <FontAwesomeIcon
                  icon={RegularBookmark}
                  style={{ color: "#3F464E", fontSize: "small" }}
                />
              </button>
            )}
          </div>
          <div className="span">
            <span>Posted on: {dateFormat(item.create_ts, "mmmm / dd / yyyy")}</span>
          </div>
        </div>

      </div>
    </>
  );
};

export default JobListingCard;
