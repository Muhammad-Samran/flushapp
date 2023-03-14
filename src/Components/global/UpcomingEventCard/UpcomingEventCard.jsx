import React from 'react';
import './UpcomingEventCard.css'
import { Button, Container } from "react-bootstrap";
import wall from "src/Assets/images/BusinessDummyImages/image4.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import Pagination from "react-bootstrap/Pagination";

const UpcomingEventCard = (props) => {

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
        <Container>
        <div className='grid-call grid-2'>
            {props.getData.map((item,index)=>(
            <div className='t-main'>
                <div className="t-img">
                    <img src={wall}  />
                </div>
                <div className='t-body pad'>
                    <div className='t-subTitle u-subTitle'>
                        <div className='u-st-1'>                        
                        <span style={{ marginRight: "10px" }}>
                        <FontAwesomeIcon 
                        icon={faCalendarDays}
                        style={{ color: "#37d1aa" }}
                        />
                        </span>
                        <span>Thursday, 13 January, 2022</span>

                        </div>
                        <div>
                        <span style={{ marginRight: "10px" }}>
                        <FontAwesomeIcon 
                        icon={faLocationDot}
                        style={{ color: "#37d1aa" }}
                        />
                        </span>

                        <span>{item.location}</span>
                        </div>
                    </div>

                    <div className='t-title u-title'>
                        <span>{item.title}</span>
                    </div>

                    <div className='u-desc'>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.</p>
                    </div>

                    <div className='u-button'>
                        <button className="u-btn">
                            <span>View Details</span>
                        </button>
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

        </Container>
        </>
    )
}

export default UpcomingEventCard