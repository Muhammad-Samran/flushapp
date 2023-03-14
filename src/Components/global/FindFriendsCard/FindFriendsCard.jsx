import React from 'react';
import { Container, input} from 'react-bootstrap';
import LeftProfileWidgetImg from "src/Assets/images/leftSideBar.png";
import ProfileImg from "src/Assets/images/profileimg.png";
import ReviewImg from "src/Assets/images/review.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "react-bootstrap/Pagination";
import './FindFriendsCard.css'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function FindFriendsCard(props) {

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
            <Container className='py-5'>

            <div className="header-title marBot">
                <span>Find Friends</span>
            </div>

                <div className='search-bar-main'>
                    <div class="form-group has-search">
                        {/* <span class="fa fa-search form-control-feedback"></span> */}
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='icon-search'/>
                        <input type="text" class="form-control" placeholder="Search Friends" icon="search"/>
                    </div>
                </div>
            <div className='grid-call'>
                {props.getData.map((item,index)=>(
                    <div
                    className="ProfileWidgets d-flex flex-column justify-content-center db_color width-fit-content"
                    style={{
                        backgroundImage: `url("${LeftProfileWidgetImg}")`,
                    }}
                    >
                    <div className="profileImage mx-auto px-5 pt-5 text-center">
                        <img
                        src={ProfileImg}
                        className="img-fluid"
                        />
                        <div className="text-center">
                        <p className="fs-24 primary-font h-c">{item.title}</p>
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
                            <PeopleAltOutlinedIcon
                                sx={{ color: "#3F464E"}} 
                                fontSize="small"
                            />
                            </div>
                            <div className="fs-14 secondary-font dt-c px-2">
                            {item.connect}
                            </div>
                        </div>
                        </div>
                        <div className="d-flex justify-content-start align-items-center pb-2">
                        <div className="iconContainer">
                            {/* <FontAwesomeIcon icon={faMapMarked} /> */}
                            <LocationOnOutlinedIcon
                            sx={{ color: "#3F464E"}} 
                            fontSize="small"
                            />
                        </div>
                        <div className="fs-14 secondary-font dt-c px-2">
                            {item.location}
                        </div>
                        </div>
                    </div>
                    
                    <div className='t-buttons t-bottom-padding'>
                        <div className='t-button1'>
                            <button className="t-btn1">
                                <span>Connect</span>
                            </button>
                        </div>
                        <div className='t-button2'>
                            <button className="t-btn2">
                                <span>Follow</span>
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

export default FindFriendsCard