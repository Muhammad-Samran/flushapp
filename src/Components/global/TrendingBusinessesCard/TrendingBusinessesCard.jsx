import React from 'react';
import './TrendingBusinessesCard.css'
import { Button, Container } from "react-bootstrap";
import wall from "src/Assets/images/services/img-03.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";

const TrendingBusinessesCard = (props) => {

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
        <div className='grid-call'>
            {props.getData.map((item,index)=>(
            <div className='t-main'>
                <div className='t-img'>
                    <img src={wall}  />
                </div>
                <div className='t-body'>
                    <div className='t-title'>
                        <span>{item.title}</span>
                    </div>
                    <div className='t-subTitle'>
                        <span style={{ marginRight: "10px" }}>
                        <FontAwesomeIcon 
                        icon={faLocationDot}
                        style={{ color: "#37d1aa" }}
                        />
                        </span>

                        <span>{item.location}</span>
                    </div>

                    <div className='t-buttons'>
                        <div className='t-button1'>
                            <button className="t-btn1">
                                <span>Details</span>
                            </button>
                        </div>
                        <div className='t-button2'>
                            <button className="t-btn2">
                                <span>Follow</span>
                            </button>
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

export default TrendingBusinessesCard