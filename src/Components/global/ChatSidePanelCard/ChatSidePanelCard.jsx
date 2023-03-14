import React from "react";
import "./ChatSidePanelCard.css";
import profile from "src/Assets/images/profileimg.png";
import profileJPG from "src/Assets/images/ProfileImage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import data from "./data.json";
import data2 from "./data2.json";
import { faClock } from "@fortawesome/free-regular-svg-icons";

function ChatSidePanelCard() {
  return (
    <>
      <div className="sidebar-main">
        <div className="sidebar-header">
          <div className="head-1">
            <span>Chats</span>
          </div>
          <div className="head-2">
            <span style={{ marginRight: "10px" }}>09 Groups</span>
            <span>742 Contacts</span>
          </div>
        </div>
        {data.map((item, idex) => (
          <div className="sidebar-card">
            <div className="sidebar-img">
              <img src={profile} height={40} />
            </div>
            <div className="sidebar-body">
              <div className="sidebar-title">
                <span>{item.title}</span>
              </div>
              <div className="sidebar-sub-title">
                <span>{item.subTitle}</span>
              </div>
              <div className="sidebar-time">
                <span>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{ color: "#999999" }}
                  />{" "}
                </span>
                <span>{item.posted}</span>
              </div>
            </div>
          </div>
        ))}


        <div className="sidebar-header contact-head-border">
          <div className="head-1">
            <span>Contacts</span>
          </div>
        </div>
          {data2.map((item, idex) => (
            <div className="sidebar-card">
              <div className="sidebar-img">
                <img src={profileJPG} height={40} />
              </div>
              <div className="sidebar-body">
                <div className="sidebar-title">
                  <span>{item.title}</span>
                </div>
                <div className="sidebar-sub-title">
                  <span>{item.subTitle}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
    </>
  );
}

export default ChatSidePanelCard;
