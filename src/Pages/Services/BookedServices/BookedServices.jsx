import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "src/Services/AxiosConfig";
import BookedServicesCard from "./BookedServicesCard";
import Pagination from "src/Components/global/Pagination/Pagination";
const jobType = [
    { value: "full_time", label: "Full Time" },
    { value: "part_time", label: "Part Time" },
];
const customStyles = {
    dropdownIndicator: (base) => ({
        ...base,
        color: "#06C864", // Custom colour
    }),
};


function BookedServices({ dataLimit = 10 }) {
    const navigate = useNavigate()
    const [serviceList, setServiceList] = useState()
    const [serviceListLength, setServiceListLength] = useState()

    const totalData = serviceListLength
    const pages = Math.ceil(totalData / dataLimit);
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    let endValue
    if (totalData <= dataLimit) {
        endValue = totalData
    }
    else {
        endValue = dataLimit - 1
    }
    const [endIndex, setEndIndex] = useState(endValue);
    let remainingIndex = totalData % dataLimit;


    const getListServices = async () => {
        try {
            const { data } = await axios.get(`my/booked/services`)
            // console.log(data)
            setServiceList(data.services_list)
            setServiceListLength(data.total_services)
        } catch (error) {
            console.log(error)
        }
    }

    async function goToNextPage() {
        // console.log("currentPage number", currentPage);

        if (currentPage + 1 > pages) {
            return;
        } else if (currentPage + 1 == pages) {
            setStartIndex(totalData - remainingIndex);
            setEndIndex(totalData - 1);
        }
        else if (startIndex <= totalData) {
            setEndIndex(totalData);
        }
        else {
            setCurrentPage((page) => page + 1);

            setStartIndex(startIndex + dataLimit);
            setEndIndex(endIndex + dataLimit);
        }
    }

    async function goToPreviousPage() {
        // console.log("current page on previous", currentPage);
        if (currentPage == 0) {
            return;
        } else if (currentPage + 1 === pages) {
            setCurrentPage((page) => page - 1);
            setStartIndex(startIndex - dataLimit);
            setEndIndex(endIndex - remainingIndex);
        }
        else if (startIndex != 0) {
            setCurrentPage((page) => page - 1);

            setStartIndex(startIndex - dataLimit);
            setEndIndex(endIndex - dataLimit);
        }
    }


    useEffect(async () => {
        await getListServices()
    }, []);

    return (
        <>
            <div className="main-header mt-3">
                <div className="header-title mb-2">
                    <span>Booked Services</span>
                </div>
                {/* <div>
                    {" "}
                    <Form>
                        <Form.Group className="mb-3">
                            <div className="header-filter">
                                <div className="label-filter">
                                    <span>Sort by:</span>
                                </div>
                                <div className="job-position-fields" style={{ width: "50px" }}>
                                    <FontAwesomeIcon
                                        icon={faArrowUp}
                                        style={{ color: "#3F464E" }}
                                    />{" "}
                                    <FontAwesomeIcon
                                        icon={faArrowDown}
                                        style={{ color: "#3F464E" }}
                                    />
                                </div>
                                <div className="label-filter">
                                    <span>Filter by:</span>
                                </div>
                                <div className="job-position-fields">
                                    <Select
                                        styles={customStyles}
                                        components={{ IndicatorSeparator: () => null }}
                                        options={jobType}
                                        placeholder="All"
                                    />
                                </div>
                            </div>
                        </Form.Group>
                    </Form>
                </div> */}
            </div>
            <div className="top-headings">
                <Row>
                    <Col>
                        <div className="detail-heading">
                            <span>Service Title</span>
                        </div>
                    </Col>
                    <Col>
                        <div className="detail-heading">
                            <span>Service Price</span>
                        </div>
                    </Col>
                    <Col>
                        <div className="detail-heading">
                            <span> Time Slot </span>
                        </div>
                    </Col>
                    <Col>
                        <div className="detail-heading">
                            <span> Booking Date </span>
                        </div>
                    </Col>
                </Row>
            </div>
            <div>
                {serviceListLength > 0 ?
                    (<>    {serviceList.map((item, index) => (
                        <BookedServicesCard
                            item={item}
                        //   ChangeStatus={ChangeStatus}
                        //   archiveService={archiveService}
                        //   onClick={() => navigate("/services/bookings/manage/1")}
                        />
                    ))}
                        <div style={{ paddingTop: '10px' }}>
                            <Pagination
                                goToNextPage={goToNextPage}
                                goToPreviousPage={goToPreviousPage}
                                totalData={totalData}
                                startIndex={startIndex}
                                endIndex={endIndex}
                            />
                        </div> </>)
                    : (<></>)}
            </div>
        </>
    );
}

export default BookedServices;
