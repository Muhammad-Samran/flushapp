import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./JobArchitectureDetailCard.css";
import dateFormat from "dateformat";

export const SidePanel = (props) => {
  return (
    <>
      <div className="archi-panel-head">
        {props.totalData ? (
          <span>
            {props.totalData} {props.totalData > 1 ? "Applicants" : "Applicant"}
          </span>
        ) : null}
      </div>
      {props.dataAPI.map((item, index) => (
        <div
          className="main job-position-main"
          onClick={() => {
            props.setCurrentItem(item);
          }}
        >
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
              <h4>{item.applicant_name}</h4>

              <div className="sub-title" style={{ color: "#3F464E" }}>
                <p>{item.user_headline}</p>
              </div>

              <div className="job-detail">
                <div className="location" style={{ marginRight: "15px" }}>
                  <span>
                    Applied on: {dateFormat(item.create_ts, "mmmm dS, yyyy")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export const DetailArea = (props) => {
  return (
    <>
      <div className="detail-main">
        <div className="detail-title">
          <div className="main-2">
            <div className="body main-div-pad">
              <div
                className="title archi-detail-title"
                style={{ color: "#3F464E" }}
              >
                <h4>{props.DetailData.applicant_name}</h4>

                <div className="sub-title" style={{ color: "#3F464E" }}>
                  <p>{props.DetailData.user_headline}</p>
                </div>

                <div className="job-detail">
                  <div className="location " style={{ marginRight: "15px" }}>
                    <span>
                      {props.DetailData.applicant_email} |{" "}
                      {props.DetailData.applicant_contact}
                    </span>
                  </div>
                </div>
              </div>
              <div className="folow-btn"></div>
              <div className="interview-btn">
                <button className="interview-button">
                  <span>Schedule Interview</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="detail-block">
          <h4>Professional Summary</h4>
          <p>
            Versatile project coordinator known for successfuly executing
            diverse project tasks within the architectural fields, to accomplish
            pending deadline. Enthusiastic problem solver and talented performer
            with superior communication, planning and decision-making skills.
            Versatile project coordinator known for successfuly executing
            diverse project tasks within the architectural fields, to accomplish
            pending deadline. Enthusiastic problem solver and talented performer
            with superior communication, planning and decision-making skills.
          </p>
        </div>
        <div className="detail-block">
          <h4>Relevant Skills</h4>
          <p>
            Sales & Customer success manager. You will create relationships with
            and advocate job search technology to leading companies across
            multiple regions and promote the power of our products to make
            organizations more productive and mobile.
            <ul>
              <li>Drive growth by selling products & services</li>
              <li>
                Develop real connections through phone, email, social media and
                professional networking
              </li>
              <li>
                You'll conduct live product demonstrations over the phone, via
                webinar and face to face
              </li>
              <li>
                You will analyse client success and present monthly advertising
                analytics reports
              </li>
              <li>
                Build and grow client relationships by sharing knowledge and
                demonstrating how to use our product
              </li>
            </ul>
          </p>
        </div>
        <div className="detail-block">
          <h4>Education</h4>
          <div className="education-div">
            <div className="custom-bullet">
              <div className="bullet-style"></div>
              <div className="bullet-detail">
                <span>Masters is Architecture & 3D Animation Design</span>
              </div>
            </div>
            <small>November, 2015 to February 2017</small>
          </div>
          <div className="education-div">
            <div className="custom-bullet">
              <div className="bullet-style"></div>
              <div className="bullet-detail">
                <span>Bachelor of Scinces in Architecture</span>
              </div>
            </div>
            <small>November, 2015 to February 2017</small>
          </div>
        </div>
        <div className="detail-block">
          <h4>Work History</h4>
          <div className="custom-bullet">
            <div className="bullet-style"></div>
            <div className="bullet-detail">
              <span>Hayes Group Architects</span>
            </div>
          </div>
          <small>November, 2015 to February 2017</small>
          <p>
            <ul>
              <li>
                You will receive an email with a link to start your self-paced,
                online job application.
              </li>
              <li>
                We are hiring platform will guide you through a series of online
                “screening” assessments to check for basic job fit, job-related
                skills, and finally a few real-world job-specific assignments.
              </li>
              <li>
                First, emails may take up to 15 minutes to send, refresh and
                check again.
              </li>
              <li>
                Second, check your spam and junk folders for an email from
                Crossover.com, mark as “Not Spam” since you will receive other
                emails as well.
              </li>
              <li>
                Third, we will send to whatever email account you indicated on
                the Apply form - by default, that is the email address you use
                as your LinkedIn username and it might be different than the one
                you have already checked.
              </li>
            </ul>
          </p>
        </div>
        <div className="detail-block-last">
          <h4>Grunn + Parker Architects</h4>
          <small>November, 2015 to February 2017</small>
          <p>
            <ul>
              <li>
                You will receive an email with a link to start your self-paced,
                online job application.
              </li>
              <li>
                We are hiring platform will guide you through a series of online
                “screening” assessments to check for basic job fit, job-related
                skills, and finally a few real-world job-specific assignments.
              </li>
              <li>
                First, emails may take up to 15 minutes to send, refresh and
                check again.
              </li>
              <li>
                Second, check your spam and junk folders for an email from
                Crossover.com, mark as “Not Spam” since you will receive other
                emails as well.
              </li>
              <li>
                Third, we will send to whatever email account you indicated on
                the Apply form - by default, that is the email address you use
                as your LinkedIn username and it might be different than the one
                you have already checked.
              </li>
            </ul>
          </p>
        </div>
      </div>
    </>
  );
};
