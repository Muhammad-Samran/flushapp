import React from "react";
import "./LeftSidebar.scss";

import LeftProfileWidgetImg from "src/Assets/images/leftSideBar.png";
import ProfileImg from "src/Assets/images/profileimg.png";
import ReviewImg from "src/Assets/images/review.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarked,
  faUsers,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import network from "../../../../Assets/images/icons/network.png";
import frointer from "../../../../Assets/images/icons/frointer.png";
import job from "../../../../Assets/images/icons/job.png";
import mail from "../../../../Assets/images/icons/mail.png";
import market from "../../../../Assets/images/icons/market.png";
import settings from "../../../../Assets/images/icons/settings.png";
import notebook from "../../../../Assets/images/icons/notebook.png";
import location from "../../../../Assets/images/icons/location.png";
import services from "../../../../Assets/images/icons/services.png";
import management from "../../../../Assets/images/icons/management.png";
import archiveJob from "../../../../Assets/images/icons/archiveJobs.png";
import archiveService from "../../../../Assets/images/icons/archiveServices.png";

import { useSelector, useDispatch } from "react-redux";
const DashBoardLeftSidebar = () => {
  let { userDetail } = useSelector((state) => state.auth);
  function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      value
    );
  }

  // console.log("user data", userDetail)
  return (
    <>
      <section className="LeftSideBar">
        <div
          className="ProfileWidgets d-flex flex-column justify-content-center db_color"
          style={{
            backgroundImage: `url("${LeftProfileWidgetImg}")`,
          }}
        >
          <div className="profileImage mx-auto px-5 pt-5 text-center">
            <img
              src={
                validateUrl(userDetail?.profile_photo)
                  ? userDetail?.profile_photo
                  : ProfileImg
              }
              className="img-fluid"
            />
            <div className="text-center">
              <p className="fs-24 primary-font h-c">{`${userDetail?.first_name} ${userDetail?.last_name}`}</p>
              <p className="fs-14 secondary-font t-c">
                Chief Executive at Painting, Renovation Industry
              </p>
              <p>
                <img src={ReviewImg} className="img-fluid" />
              </p>
            </div>
          </div>
          <hr />
          <div className=" px-3 py-1 ">
            <div className="d-flex justify-content-between align-items-center pb-2">
              <div className="d-flex align-items-center">
                <div className="iconContainer">
                  {/* <FontAwesomeIcon icon={faUsers} /> */}
                  <img 
                  src={network}
                  className="leftsidebar_icons"
                  />
                </div>
                <div className="fs-14 secondary-font dt-c px-2">
                  {`${userDetail?.first_name}`}’s Friends
                </div>
              </div>
              {/* <div className="fs-14 secondary-font dt-c">
                {`${userDetail.friends_list_count}`}
              </div> */}
            </div>
            <div className="d-flex justify-content-start align-items-center pb-2">
              <div className="iconContainer">
                {/* <FontAwesomeIcon icon={faMapMarked} /> */}
                <img 
                  src={location}
                  className="leftsidebar_icons_location"
                  />
              </div>
              <div className="fs-14 secondary-font dt-c px-2">
                {`${userDetail?.physical_address.formatted_address}`}
              </div>
            </div>
          </div>
        </div>
        <div className="db_color">
          <div className="text-uppercase fs-16 primary-font p-3 lsh-color">
            What you want to do
          </div>
          <div className="px-3 py-2">
            <div className="d-flex justify-content-start align-items-center pb-2">
              <div className="iconContainer">
                {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                <img 
                  src={management}
                  className="leftsidebar_icons"
                  />
              </div>

              <div className="fs-14 secondary-font dt-c px-2">
                <Link to="/services/manage" className="link-colors">
                  Manage Services
                </Link>
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center pb-2">
              <div className="iconContainer">
                {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                <img 
                  src={archiveService}
                  className="leftsidebar_icons"
                  />
              </div>

              <div className="fs-14 secondary-font dt-c px-2">
                <Link to="/services/archive" className="link-colors">
                  Archive Services
                </Link>
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center pb-2">
              <div className="iconContainer">
                {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                <img 
                  src={management}
                  className="leftsidebar_icons"
                  />
              </div>

              <div className="fs-14 secondary-font dt-c px-2">
                <Link to="/jobs-position" className="link-colors">
                  Manage Posted Jobs
                </Link>
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center pb-2">
              <div className="iconContainer">
                {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                <img
                  src={archiveJob}
                  className="leftsidebar_icons"
                  />
              </div>

              <div className="fs-14 secondary-font dt-c px-2">
                <Link to="/jobs/archive" className="link-colors">
                  Archive Jobs
                </Link>
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center pb-2">
              <div className="iconContainer">
                {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                <img 
                  src={market}
                  className="leftsidebar_icons"
                  />
              </div>
              <div className="fs-14 secondary-font dt-c px-2">Marketplace</div>
            </div>
            <div className="d-flex justify-content-start align-items-center pb-2">
              <div className="iconContainer">
                {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                <img 
                  src={frointer}
                  className="leftsidebar_icons"
                  />
              </div>
              <div className="fs-14 secondary-font dt-c px-2">Frontier</div>
            </div>
            <div className="d-flex justify-content-start align-items-center pb-2">
              <div className="iconContainer">
                {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                <img
                  src={network}
                  className="leftsidebar_icons"
                  />
              </div>
              <div className="fs-14 secondary-font dt-c px-2">My Network</div>
            </div>
            <div className="d-flex justify-content-start align-items-center pb-2">
              <div className="iconContainer">
                {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                <img
                  src={notebook}
                  className="leftsidebar_icons"
                  />
              </div>
              <div className="fs-14 secondary-font dt-c px-2">Notebook</div>
            </div>
            <div className="d-flex justify-content-start align-items-center pb-2">
              <div className="iconContainer">
                {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                <img
                  src={job}
                  className="leftsidebar_icons"
                  />
              </div>
              <div className="fs-14 secondary-font dt-c px-2">JobBoard</div>
            </div>
            <div className="d-flex justify-content-start align-items-center pb-2">
              <div className="iconContainer">
                {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                <img
                  src={settings}
                  className="leftsidebar_icons"
                  />
              </div>
              <div className="fs-14 secondary-font dt-c px-2">Setting</div>
            </div>
          </div>
        </div>
        <div className="db_color">
          <div className="text-uppercase fs-16 primary-font p-3 lsh-color">
          {`${userDetail?.first_name}`}'s Services
          </div>
          <div className="px-3 py-2">
            <div className="d-flex justify-content-start align-items-center pb-2">
              <div className="iconContainer">
                {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                <img
                  src={services}
                  className="leftsidebar_icons"
                  />
              </div>
              <div className="fs-14 secondary-font dt-c px-2">Plumbing</div>
            </div>
            <div className="d-flex justify-content-start align-items-center pb-2">
              <div className="iconContainer">
                {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                <img
                  src={services}
                  className="leftsidebar_icons"
                  />
              </div>
              <div className="fs-14 secondary-font dt-c px-2">Painting</div>
            </div>
            <div className="d-flex justify-content-start align-items-center pb-2">
              <div className="iconContainer">
                {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                <img
                  src={services}
                  className="leftsidebar_icons"
                  />
              </div>
              <div className="fs-14 secondary-font dt-c px-2">Roffing</div>
            </div>
            <div className="d-flex justify-content-start align-items-center pb-2">
              <div className="iconContainer">
                {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                <img
                  src={services}
                  className="leftsidebar_icons"
                  />
              </div>
              <div className="fs-14 secondary-font dt-c px-2">Cleaning</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashBoardLeftSidebar;
