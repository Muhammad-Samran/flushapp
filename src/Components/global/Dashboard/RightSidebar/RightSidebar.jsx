import React from "react";
import "./RightSidebar.scss";
import EventsImg from "src/Assets/images/events.png";
import FrndFollowingImg from "src/Assets/images/frndFollowing.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarked,
  faUsers,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
const DashboardRightSidebar = () => {
  return (
    <>
      <section className="RightSideBar">
        <div className="fs-24 primary-font">You may like to explore</div>
        <div className="db_color">
          <div className="text-uppercase fs-16 primary-font p-3 lsh-color">
            What you want to do
          </div>
          <div className="px-3 py-2">
            <div className="d-flex justify-content-between align-items-center pb-2">
              <div className="d-flex justify-content-start align-items-center">
                <div className="iconContainer">R</div>
                <div>
                  <div className="fs-16 secondary-font dt-c px-2">
                    Robel LLC
                  </div>
                  <div className="fs-14 secondary-font dst-c  px-2">
                    6.3m followers
                  </div>
                </div>
              </div>
              <div>
                <button className="fs-12 sbbtn-c ">Follow</button>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center pb-2">
              <div className="d-flex justify-content-start align-items-center">
                <div className="iconContainer">R</div>
                <div>
                  <div className="fs-16 secondary-font dt-c px-2">
                    Robel LLC
                  </div>
                  <div className="fs-14 secondary-font dst-c  px-2">
                    6.3m followers
                  </div>
                </div>
              </div>
              <div>
                <button className="fs-12 sbbtn-c ">Following</button>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center pb-2">
              <div className="d-flex justify-content-start align-items-center">
                <div className="iconContainer">R</div>
                <div>
                  <div className="fs-16 secondary-font dt-c px-2">
                    Robel LLC
                  </div>
                  <div className="fs-14 secondary-font dst-c  px-2">
                    6.3m followers
                  </div>
                </div>
              </div>
              <div>
                <button className="fs-12 sbbtn-c ">Follow</button>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center pb-2">
              <div className="d-flex justify-content-start align-items-center">
                <div className="iconContainer">R</div>
                <div>
                  <div className="fs-16 secondary-font dt-c px-2">
                    Robel LLC
                  </div>
                  <div className="fs-14 secondary-font dst-c  px-2">
                    6.3m followers
                  </div>
                </div>
              </div>
              <div>
                <button className="fs-12 sbbtn-c ">Follow</button>
              </div>
            </div>
          </div>
        </div>
        <div className="db_color">
          <div className="text-uppercase fs-16 primary-font p-3 lsh-color">
            Upcoming Events
          </div>
          <div className="px-3 py-2">
            <div className="d-flex justify-content-start align-items-center">
              <div className="iconContainer">
                <img
                  src={EventsImg}
                  // className="img-fluid"
                  width="48"
                  height="48"
                />
              </div>
              <div className="px-2">
                <div className="fs-14 secondary-font dst-c px-2">
                  Thu, Oct 07, 2021
                </div>
                <div className="fs-16 secondary-font dt-c px-2">
                  Ecommerce Growth Meetup
                </div>
                <div className="fs-14 secondary-font dst-c  px-2">
                  Amazon Fashion Studio - London
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <div className="iconContainer">
                <img
                  src={EventsImg}
                  // className="img-fluid"
                  width="48"
                  height="48"
                />
              </div>
              <div className="px-2">
                <div className="fs-14 secondary-font dst-c  px-2">
                  Thu, Oct 07, 2021
                </div>
                <div className="fs-16 secondary-font dt-c px-2">
                  Ecommerce Growth Meetup
                </div>
                <div className="fs-14 secondary-font dst-c  px-2">
                  Amazon Fashion Studio - London
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <div className="iconContainer">
                <img
                  src={EventsImg}
                  // className="img-fluid"
                  width="48"
                  height="48"
                />
              </div>
              <div className="px-2">
                <div className="fs-14 secondary-font dst-c  px-2">
                  Thu, Oct 07, 2021
                </div>
                <div className="fs-16 secondary-font dt-c px-2">
                  Ecommerce Growth Meetup
                </div>
                <div className="fs-14 secondary-font dst-c  px-2">
                  Amazon Fashion Studio - London
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <div className="iconContainer">
                <img
                  src={EventsImg}
                  // className="img-fluid"
                  width="48"
                  height="48"
                />
              </div>
              <div className="px-2">
                <div className="fs-14 secondary-font dst-c  px-2">
                  Thu, Oct 07, 2021
                </div>
                <div className="fs-16 secondary-font dt-c px-2">
                  Ecommerce Growth Meetup
                </div>
                <div className="fs-14 secondary-font dst-c  px-2">
                  Amazon Fashion Studio - London
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="db_color">
          <div className="text-uppercase fs-16 primary-font p-3 lsh-color">
            Friends Following
          </div>
          <div className="px-3 py-2">
            <div className="d-flex justify-content-start align-items-center">
              <div className="iconContainer">
                <img
                  src={FrndFollowingImg}
                  // className="img-fluid"
                  width="36"
                  height="36"
                />
              </div>
              <div className="px-2">
                <div className="fs-16 secondary-font dt-c px-2">
                  Geiras <span className="dst-c">Followed by</span> Kevin
                </div>
                <div className="fs-14 secondary-font dst-c  px-2">
                  6.3m followers
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <div className="iconContainer">
                <img
                  src={FrndFollowingImg}
                  // className="img-fluid"
                  width="36"
                  height="36"
                />
              </div>
              <div className="px-2">
                <div className="fs-16 secondary-font dt-c px-2">
                  Geiras <span className="dst-c">Followed by</span> Kevin
                </div>
                <div className="fs-14 secondary-font dst-c  px-2">
                  6.3m followers
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <div className="iconContainer">
                <img
                  src={FrndFollowingImg}
                  // className="img-fluid"
                  width="36"
                  height="36"
                />
              </div>
              <div className="px-2">
                <div className="fs-16 secondary-font dt-c px-2">
                  Geiras <span className="dst-c">Followed by</span> Kevin
                </div>
                <div className="fs-14 secondary-font dst-c  px-2">
                  6.3m followers
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardRightSidebar;
