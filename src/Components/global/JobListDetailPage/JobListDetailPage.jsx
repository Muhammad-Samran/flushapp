import React, { useEffect, useState } from "react";
import "./JobListDetailPage.css";
import { Container, Row, Col } from "react-bootstrap";
import fb from "src/Assets/images/fb.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faLocationDot,
  faUsers,
  faStar,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";
import {
  faBookmark as RegularBookmark,
  faMoneyBill1,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import es from "src/Assets/images/es.png";
import Pagination from "../Pagination/Pagination";
import "./scrollbar.css";
import UploadResumePopUp from "../UploadResumePopUp/UploadResumePopUp";

export const SidePanel = (props,{dataLimit=10}) => {

  const pages = Math.ceil(props.totalData / dataLimit);
  const [currentPage, setCurrentPage] = useState(1);

  let endValue
  if (props.totalData <= dataLimit) {
    endValue = props.totalData
  }
  else {
    endValue = dataLimit - 1
  }
  const [endIndex, setEndIndex] = useState(endValue);

  let remainingIndex = props.totalData % dataLimit

  async function goToNextPage() {
    // console.log("currentPage number", currentPage);

    if (currentPage + 1 > pages) {
      return;
    } else if (currentPage + 1 == pages) {
      props.setStartIndex(props.totalData - remainingIndex);
      setEndIndex(props.totalData - 1);
    }
    else if (props.startIndex <= props.totalData) {
      setEndIndex(props.totalData);
    }
    else {
      setCurrentPage((page) => page + 1);

      props.setStartIndex(props.startIndex + dataLimit);
      setEndIndex(endIndex + dataLimit);
    }
  }

  async function goToPreviousPage() {
    // console.log("current page on previous", currentPage);
    if (currentPage == 0) {
      return;
    } else if (currentPage + 1 === pages) {
      setCurrentPage((page) => page - 1);
      props.setStartIndex(props.startIndex - dataLimit);
      setEndIndex(endIndex - remainingIndex);
    }
    // else if(endIndex == props.totalData){
    //   setEndIndex(props.totalData);
    // }
    else if (props.startIndex != 0) {
      setCurrentPage((page) => page - 1);

      props.setStartIndex(props.startIndex - dataLimit);
      setEndIndex(endIndex - dataLimit);
    }
  }
  return (
    <>
      <div className="panel-main scrollbar scrollbar-dusty-grass">
        {props.getData.map((item, index) =>
          item.is_expired ? null : (
            <div
              className="main-2"
              onClick={async () => {
                await props.getDetailAPIData(item.job_post_id);
              }}
            >
              <div className="body">
                <div className="img">
                  <img src={es} height={100} />
                </div>

                <div className="title" style={{ color: "#3F464E" }}>
                  <h4>{item.job_title}</h4>

                  <div className="sub-title" style={{ color: "#3F464E" }}>
                    <p>{item.experience}</p>
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
                      <span>$ {item.salary_offer}</span>
                    </div>
                  </div>
                  <div className="post">
                    <span>
                      Posted on: {dateFormat(item.create_ts, "dd / mm / yyyy")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        <div style={{ padding: '10px' }}>
          <Pagination
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            totalData={props.totalData}
            startIndex={props.startIndex}
            endIndex={endIndex}
          />
        </div>

      </div>
    </>
  );
};

const CompanyDetail = (props) => {
  return (
    <>
      <Container>
        <div className="detail-main">
          <div className="detail-title">
            <div className="main-2">
              <div className="body">
                <div className="img">
                  <img src={fb} height={100} />
                </div>
                <div className="title" style={{ color: "#3F464E" }}>
                  <h4>{props.business_data.business_name}</h4>

                  <div className="sub-title" style={{ color: "#3F464E" }}>
                    <p>Painting • Renovation • Rebuild</p>
                  </div>

                  <div className="job-detail">
                    <div className="location " style={{ marginRight: "15px" }}>
                      <span>
                        <FontAwesomeIcon
                          icon={faUsers}
                          style={{ color: "#37d1aa" }}
                        />{" "}
                      </span>
                      <span>
                        {props.business_data.business_members} Members
                      </span>
                    </div>
                    <div className="job-type" style={{ marginRight: "15px" }}>
                      <span>
                        <FontAwesomeIcon
                          icon={faStar}
                          style={{ color: "#FDAD11" }}
                        />{" "}
                      </span>
                      <span>{props.business_data.rating}/5.0</span>
                    </div>
                  </div>
                </div>
                <div className="follow-btn">
                  {props.business_data.is_follower ? (
                    <button
                      className="follow-button"
                      onClick={async () => {
                        await props.unfollowAPI(props.business_id, props.JobId);
                      }}
                    >
                      <span>
                        {/* <FontAwesomeIcon
                          icon={faCheck}
                          style={{ color: "#3F464E" }}
                        />{" "} */}
                        Unfollow
                      </span>
                    </button>
                  ) : (
                    <button
                      className="follow-button"
                      onClick={async () => {
                        await props.followAPI(props.business_id, props.JobId);
                      }}
                    >
                      <span>
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ color: "#3F464E" }}
                        />{" "}
                        Follow
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="detail-block-last">
            <h4>About Us</h4>
            <p>{props.business_data.summary}</p>
          </div>
        </div>
      </Container>
    </>
  );
};

export const JobDetail = (props) => {
  const [show, setShow] = useState(false);

  const createModelHandleShow = () => {
    setShow(true);
  };

  return (
    <>
      {props.detailDataAPI && props.status ? (
        <Container>
          <UploadResumePopUp
            show={show}
            setShow={setShow}
            showToast={props.showToast}
            JobId={props.detailDataAPI.job_post_id}
            applyStatus={props.applyStatus}
            getDetailAPIData={props.getDetailAPIData}
          />
          <div className="detail-main">
            <div className="detail-title">
              <div className="main-2">
                <div className="body-2">
                  <div className="detail-title" style={{ color: "#3F464E" }}>
                    <h4>{props.detailDataAPI.job_title}</h4>

                    <div className="sub-title" style={{ color: "#3F464E" }}>
                      <p>{props.detailDataAPI.business_data.business_name}</p>
                    </div>

                    <div className="d-flex flex-row ">
                      <div className="job-detail">
                        <div
                          className="location "
                          style={{ marginRight: "15px" }}
                        >
                          <span>
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              style={{ color: "#37d1aa" }}
                            />{" "}
                          </span>
                          <span>{props.detailDataAPI.work_location}</span>
                        </div>
                        <div
                          className="job-type location"
                          style={{ marginRight: "15px" }}
                        >
                          <span>
                            <FontAwesomeIcon
                              icon={faClock}
                              style={{ color: "#37d1aa" }}
                            />{" "}
                          </span>
                          <span>{props.detailDataAPI.job_employment_type}</span>
                        </div>
                        <div
                          className="salary location"
                          style={{ marginRight: "15px" }}
                        >
                          <span>
                            <FontAwesomeIcon
                              icon={faMoneyBill1}
                              style={{ color: "#37d1aa" }}
                            />{" "}
                          </span>
                          <span>$ {props.detailDataAPI.salary_offer}</span>
                        </div>
                      </div>

                      <div className="detail-post">
                        <div className="Posted">
                          <span>
                            Posted on:{" "}
                            {dateFormat(
                              props.detailDataAPI.create_ts,
                              "dd / mm / yyyy"
                            )}
                          </span>
                        </div>

                        <div className="applicants">
                          <a>
                            <span>
                              {props.detailDataAPI.total_applicants} applicants{" "}
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="detail-buttons">
                      {props.status.job_applied ? (
                        <button className="apply-now disabled-btn" disabled>
                          <span>Applied</span>
                        </button>
                      ) : (
                        <button
                          className="apply-now"
                          onClick={createModelHandleShow}
                        >
                          <span>Apply Now</span>
                        </button>
                      )}
                      {props.status.job_saved ? (
                        <button
                          className="save-btn"
                          onClick={async () => {
                            await props.saveAPI(
                              props.detailDataAPI.job_post_id
                            );
                          }}
                        >
                          <span>Saved</span>
                        </button>
                      ) : (
                        <button
                          className="save-btn"
                          onClick={async () => {
                            await props.saveAPI(
                              props.detailDataAPI.job_post_id
                            );
                          }}
                        >
                          <span>Save</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="detail-block">
              <h4>About Us</h4>
              <p>{props.detailDataAPI.business_data.summary}</p>
            </div>
            <div className="detail-block">
              <h4>Job Description</h4>
              <p>{props.detailDataAPI.job_description}</p>
            </div>
            <div className="detail-block">
              <h4>What to Expect</h4>
              <p>{props.detailDataAPI.responsibility}</p>
            </div>
            <div className="detail-block-last">
              <h4>Qualification</h4>
              <p>
                <ul>
                  <li>
                    2+ years of experience in a sales environment managing an
                    existing book of business with a focus on consultative
                    selling & increasing spend
                  </li>
                  <li>Strong ability to forecast against your targets</li>
                  <li>
                    Experience managing accounts within an online Client
                    Relationship Management (CRM) system
                  </li>
                </ul>
              </p>
            </div>
          </div>

          <div className="companyDetail">
            <CompanyDetail
              business_data={props.detailDataAPI.business_data}
              business_id={props.detailDataAPI.business_id_id}
              JobId={props.detailDataAPI.job_post_id}
              unfollowAPI={props.unfollowAPI}
              followAPI={props.followAPI}
            />
          </div>
        </Container>
      ) : null}
    </>
  );
};
