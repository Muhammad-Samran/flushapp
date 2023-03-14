import React from 'react';
import './CommunityCard.css'
import { Button, Container } from "react-bootstrap";
import wall from "src/Assets/images/services/img-01.png";
import profile from "src/Assets/images/BusinessDummyImages/Logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faUsers, faStar, faCheck } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";

const CommunityCard = (props) => {

    const pageIndex = () => {
        // console.log(props.pages);
        let a = [];
        for (let i = 0; i < props.pages; i++) {
          a.push(
            <Pagination.Item
              key={i+1}
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

    return(
        <>
        <div className='grid-call grid-2'>
            {props.getData.map((item,index)=>(
            <div className='t-main c-main'>
                <div className='t-img'>
                    <img src={wall}  />
                </div>
                <div className='t-body c-body'>
                    <div className='c-profile-img'>
                        <img src={profile}  />
                    </div>
                    <div className='c-desc'>
                        <div className='t-title'>
                            <span>{item.title}</span>
                        </div>
                        <div className='t-subTitle c-sub'>
                            <div className='c-sub1'>
                            <span style={{ marginRight: "10px" }}>
                            <FontAwesomeIcon 
                            icon={faUsers}
                            style={{ color: "#37d1aa" }}
                            />
                            </span>

                            <span>260 Members</span>
                            </div>
                            <div className='c-sub2'>
                            <span style={{ marginRight: "10px" }}>
                            <FontAwesomeIcon 
                            icon={faStar}
                            style={{ color: "#FDAD11" }}
                            />
                            </span>

                            <span>4.78/5.0</span>
                            </div>
                        </div>

                        <div className='t-buttons'>
                            <div className='t-button1'>
                                <button className="t-btn1">
                                    <span>Join</span>
                                </button>
                            </div>
                            <div className='t-button2'>
                                <button className="t-btn2">
                                    <span>
                                    <FontAwesomeIcon 
                                    icon={faCheck}
                                    style={{ color: "#3F464E", marginRight: "5px" }}
                                    />
                                    Follow
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
        <div className="PanelFooter">
                <Pagination.Prev
                onClick={(event) => props.goToPreviousPage()}
                >
                Previous
                </Pagination.Prev>

                <Pagination>
                    {pageIndex()}
                </Pagination>

                <Pagination.Next
                onClick={(event) => props.goToNextPage()}
                >
                    Next
                </Pagination.Next>
    </div>
        </>
    )
}

export default CommunityCard