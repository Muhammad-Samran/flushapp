import React from "react";
import { Button, Container } from "react-bootstrap";
import wall from "src/Assets/images/services/img-03.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import './CategoriesCard.css'

function CategoriesCard({item}) {
  return (
    <>
      
          <div className="t-main">
            <div className="t-img">
              <img src={wall} />
            </div>
            <div className="t-body">
              <div className="t-title">
                <span>{item.title}</span>
              </div>
              <div className="t-subTitle cat-sub-title">
                <div className="sub1">
                  <span style={{ marginRight: "10px" }}>
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      style={{ color: "#37d1aa" }}
                    />
                  </span>

                  <span>{item.user}</span>
                </div>
                <div className="sub2">
                  <span style={{ marginRight: "10px" }}>
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      style={{ color: "#37d1aa" }}
                    />
                  </span>

                  <span>{item.calender}</span>
                </div>
              </div>
            </div>
          </div>
    </>
  );
}

export default CategoriesCard;
