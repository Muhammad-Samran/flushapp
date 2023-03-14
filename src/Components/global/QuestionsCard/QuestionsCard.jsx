import React from "react";
import "./QuestionsCard.css";
import Pagination from "react-bootstrap/Pagination";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profile from "src/Assets/images/profileimg.png";
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
} from "@fortawesome/free-regular-svg-icons";

function QuestionsCard(props) {
  const pageIndex = () => {
    // console.log(props.pages);
    let a = [];
    for (let i = 0; i < props.pages; i++) {
      a.push(
        <Pagination.Item
          key={i + 1}
          active={i + 1 == props.currentPage ? true : false}
          onClick={(event) => props.changePage(event)}
          // className={props.active ? 'paginator-background-color-active' : 'paginator-background-color'}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
    // console.log(a);
    return a;
  };
  return (
    <>
      {props.getData.map((item, index) => (
        <div className="main q-main">
          <div className="body">
            <div className="img q-img">
              <img src={profile} height={50} />
            </div>

            <div className="title q-title" style={{ color: "#3F464E" }}>
              <h4>{item.title}</h4>

              <div className="sub-title" style={{ color: "#3F464E" }}>
                <p>{item.subTitle}</p>
              </div>

              <div className="job-detail">
                <div className="location" style={{ marginRight: "15px" }}>
                  <span>
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      style={{ color: "#37d1aa" }}
                    />{" "}
                  </span>
                  <span>{item.user}</span>
                </div>
                <div className="job-type" style={{ marginRight: "15px" }}>
                  <span>
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      style={{ color: "#37d1aa" }}
                    />{" "}
                  </span>
                  <span>{item.calender}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="right-end q-right-side">
            <div className="buttons">
              <button class="q-button">
                <FontAwesomeIcon icon={faHeart} style={{ color: "#3F464E" }} />{" "}
              </button>
              <button class="q-button">
                <FontAwesomeIcon
                  icon={faMessage}
                  style={{ color: "#3F464E", mixBlendMode: "normal" }}
                />{" "}
              </button>
              <button class="q-button">
                <FontAwesomeIcon icon={faShare} style={{ color: "#3F464E" }} />{" "}
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="PanelFooter">
        <Pagination.Prev onClick={(event) => props.goToPreviousPage()}>
          Previous
        </Pagination.Prev>

        <Pagination>{pageIndex()}</Pagination>

        <Pagination.Next onClick={(event) => props.goToNextPage()}>
          Next
        </Pagination.Next>
      </div>
    </>
  );
}

export default QuestionsCard;
