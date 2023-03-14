import React from "react";
import "../../global/AnswerForm/AnswerForm.css";
import Pagination from "react-bootstrap/Pagination";
import { faClock, faMagnifyingGlass, faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profile from "src/Assets/images/profileimg.png";
import data from "./data.json";
import {
  faBookmark,
  faLocationDot,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleUser,
  faCalendarDays,
  faHeart,
  faMessage,
  faClockFour,
} from "@fortawesome/free-regular-svg-icons";
import TextEditor from "../TextEditor/TextEditor";
import { useState } from "react";

function PreviousAnswers() {
const[show, setShow]= useState([false]);
  return (
    <>
      {data.map((item, index) => (
        
        <div className="main q-main ans-main">
          <div className="body">
            <div className="reply-answers">
              <div className="img q-img">
                <img src={profile} height={50} />
              </div>
            </div>

            <div className="title q-title" style={{ color: "#3F464E" }}>
              <h4>{item.title}</h4>

              <div className="sub-title" style={{ color: "#3F464E" }}>
                <p>Expert Technician</p>
              </div>
            </div>
          </div>

          <div className="answer-detail">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              ullamcorper, enim a suscipit maximus, lacus nisi dignissim diam,
              sed aliquam tortor sapien ut elit. Duis tempus mauris risus, a
              fringilla est lobortis luctus. Curabitur nec efficitur arcu.
            </p>
          </div>

          <div className="job-detail detail-icons">
            <div className="location" style={{ marginRight: "15px" }}>
              <span>
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  style={{ color: "#37d1aa", marginRight: "5px" }}
                />{" "}
                13-01-2022
              </span>
              <span>{item.user}</span>
            </div>
            <div className="job-type" style={{ marginRight: "15px" }}>
              <span>
                <FontAwesomeIcon
                  icon={faClockFour}
                  style={{ color: "#37d1aa", marginRight: "5px" }}
                />{" "}
                09:47 AM
              </span>
              <span>{item.calender}</span>
            </div>

            <div className="job-type" style={{ marginRight: "15px" }}>
              <span>
                <FontAwesomeIcon
                  icon={faReply}
                  style={{ color: "#37d1aa", marginRight: "5px" }}
                />{" "}
                <a onClick={()=>setShow([...show,true])}>Reply</a>
              </span>
            </div>
          </div>
          {show[index+1] ? <TextEditor index={index} show={show} setShow={setShow}/> : console.log("index")}
        </div>
      ))}

      
    </>
  );
}

export default PreviousAnswers;
