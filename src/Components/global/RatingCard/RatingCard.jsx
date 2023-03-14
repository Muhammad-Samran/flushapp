import React from "react";
import "./RatingCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faStar,
  faStarHalfStroke,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import data from "./data.json";

function RatingCard() {
  return (
    <>
      <Container>
        <div className="rating-card-sortby">
          <div className="header-title">
            <span>47 Reviews</span>
          </div>
          <div className="label-filter">
            <span>Sort by:</span>
            <FontAwesomeIcon
              icon={faArrowUp}
              style={{ color: "#3F464E" }}
            />{" "}
            <FontAwesomeIcon icon={faArrowDown} style={{ color: "#3F464E" }} />
          </div>
        </div>

        {data.map((item, index) => (
          <div className="rating-card-body">
            <div className="rating-card-top">
              <div className="rating-card-title">
                <h4>{item.title}</h4>
              </div>
              <div className="rating-icon">
                <span>
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: "#FDAD11", paddingRight: "2px" }}
                  />{" "}
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: "#FDAD11", paddingRight: "2px" }}
                  />{" "}
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: "#FDAD11", paddingRight: "2px" }}
                  />{" "}
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: "#FDAD11", paddingRight: "2px" }}
                  />{" "}
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faStarHalfStroke}
                    style={{ color: "#FDAD11", paddingRight: "2px" }}
                  />{" "}
                </span>
                <span style={{ color: "#666666" }}>4.78/5.0</span>
              </div>
            </div>
            <div className="rating-card-message">
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. It is a long established fact
                that a reader will be distracted by the readable content of a
                page when looking at its layout. The point of using Lorem Ipsum
                is that it has a more-or-less normal distribution of letters, as
                opposed to using 'Content here, content here', making it look
                like readable English. Many desktop publishing packages and web
                page editors now use sed diam nonumy eirmod tempor invidunt ut
                labore et dolore magna aliquyam erat, sed diam voluptua. Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
              </p>
            </div>
            <div className="rating-card-bottom">
              <div className="rating-location-detail">
                <div className="rating-location1">
                  <span>
                    <FontAwesomeIcon
                      icon={faCalendar}
                      style={{ color: "#06C864", paddingRight: "7px" }}
                    />{" "}
                  </span>
                  <span>Syracuse 13202, NY</span>
                </div>
                <div className="rating-location1">
                  <span>
                    <FontAwesomeIcon
                      icon={faClock}
                      style={{ color: "#06C864", paddingRight: "7px" }}
                    />{" "}
                  </span>
                  <span>260 Followers</span>
                </div>
              </div>
              <div className="rating-card-button">
                <button className="rating-btn1">
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="rating-card-loadmore-button">
            <button className="rating-btn1">
                <span>Load More</span>
            </button>
        </div>
      </Container>
    </>
  );
}

export default RatingCard;
