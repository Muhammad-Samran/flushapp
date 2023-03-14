import React, { useState } from "react";
import profile from "src/Assets/images/profileimg.png";
import "./ChatBox.css";
import {
  faPhone,
  faVideo,
  faEllipsis,
  faMagnifyingGlass,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import data from "./message.json";

function ChatBox() {
  const [message, setMessage] = useState();
  const [send, setSend] = useState(false);

  return (
    <>
      <div className="chat-header">
        <div className="chat-header-1">
          <div className="chat-user">
            <div className="chat-img">
              <img src={profile} height={40} />
            </div>
          </div>
          <div className="chat-user-detail">
            <div className="chat-title">
              <span>Terry Terry</span>
            </div>
            <div className="chat-status">
              <span>Online</span>
            </div>
          </div>
        </div>
        <div className="chat-header-2">
          <div className="chat-header-buttons">
            <div className="search-button">
              <button className="btn-0">
                <span>
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{ color: "#FFFFFF" }}
                  />{" "}
                </span>
              </button>
            </div>
            <div className="phone-button">
              <button className="btn-1">
                <span>
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{ color: "#FFFFFF" }}
                  />{" "}
                </span>
              </button>
            </div>
            <div className="video-button">
              <button className="btn-1">
                <span>
                  <FontAwesomeIcon
                    icon={faVideo}
                    style={{ color: "#FFFFFF" }}
                  />{" "}
                </span>
              </button>
            </div>
            <div className="eclipes-button">
              <button className="btn-1">
                <span>
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    style={{ color: "#FFFFFF" }}
                  />{" "}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-body">
        {data.map((item, index) => (
          <>
            <div className="incoming-message"><span>{item.incoming}</span></div>
            <div className="outgoing-main">
              <div></div>
              <div className="outgoing-message">
              <span>{item.outgoing}</span>
              </div>
              
              </div>
          </>
        ))}
      </div>
      <div className="chat-footer">
        <div className="chat-text-input">
          <input
            type="text"
            name="message"
            placeholder="Type Message"
            className="chat-text-field"
            onChange={(e)=>{setMessage(e.target.value)}}
          />
        </div>
        <div className="chat-send-button">
          <button className="send-btn" type="button">
            <span>
              <FontAwesomeIcon
                icon={faPaperPlane}
                style={{ color: "#FFFFFF" }}
              />{" "}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
