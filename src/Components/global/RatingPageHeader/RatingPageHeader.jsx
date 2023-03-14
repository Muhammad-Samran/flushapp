import React from "react";
import "./RatingPageHeader.css";
import BackImg from "src/Assets/images/BusinessDummyImages/image4.jpg";
import profileImg from "src/Assets/images/BusinessDummyImages/Logo.jpg";
import {
    faCheck,
  faLocationDot,
  faPhone,
  faShare,
  faStar,
  faStarHalf,
  faStarHalfStroke,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faIdCard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

function RatingPageHeader() {
  return (
    <>
      <div className="header-bg-img">
        <img src={BackImg} />
      </div>
      <Container>
        <div className="rating-body">
          <div className="rating-profile">
            <img src={profileImg} />
          </div>
          <div className="rating-company-details">
            <div className="rating-title">
              <span>Cal Pack Moving & Storage Services</span>
            </div>
            <div className="rating-subtitle">
              <span>Painting • Renovation • Rebuild</span>
            </div>
            <div className="rating-location-detail">
              <div className="rating-location1">
                <span>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ color: "#06C864", paddingRight: "7px" }}
                  />{" "}
                </span>
                <span>Syracuse 13202, NY</span>
              </div>
              <div className="rating-location1">
                <span>
                  <FontAwesomeIcon
                    icon={faUsers}
                    style={{ color: "#06C864", paddingRight: "7px" }}
                  />{" "}
                </span>
                <span>260 Followers</span>
              </div>
              <div className="rating-location1">
                <span>
                  <FontAwesomeIcon
                    icon={faIdCard}
                    style={{ color: "#06C864", paddingRight: "7px" }}
                  />{" "}
                </span>
                <span>License No. LP1234567</span>
              </div>
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
              <span>4.78/5.0</span>
            </div>
            <div className="rating-contact-details">
              <div className="rating-contact">
                <h6>Phone:</h6>
                <span>(044) 555 - 4369 - 8957</span>
              </div>
              <div className="rating-contact">
                <h6>Email:</h6>
                <span>calpack@email.com</span>
              </div>
              <div className="rating-contact">
                <h6>Website:</h6>
                <span>daydreamsagency.com</span>
              </div>
              <div className="rating-contact">
                <h6>Connect with us on</h6>
                <span>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    style={{ paddingRight: "15px" }}
                  />{" "}
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faTwitter}
                    style={{ paddingRight: "15px" }}
                  />{" "}
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faInstagram}
                    style={{ paddingRight: "15px" }}
                  />{" "}
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    style={{ paddingRight: "15px" }}
                  />{" "}
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faYoutube}
                    style={{ paddingRight: "15px" }}
                  />{" "}
                </span>
              </div>
            </div>
            <div className="rating-buttons">
                <button className="rating-btn1">
                    <span>
                    <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "#FFFFFF" }}
                  />{" "}
                  Following
                  </span>
                </button>

                <button className="rating-btn2">
                <span>
                    <FontAwesomeIcon
                    icon={faPhone}
                    // style={{ color: "#FFFFFF" }}
                  />{" "}
                  Contact
                  </span>
                </button>

                <button className="rating-btn2">
                <span>
                    <FontAwesomeIcon
                    icon={faShare}
                    // style={{ color: "#FFFFFF" }}
                  />{" "}
                  Share
                  </span>
                </button>

                <button className="rating-btn3">
                    <span>More</span>
                </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default RatingPageHeader;
