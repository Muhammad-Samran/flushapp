import React from "react";
import { useNavigate } from "react-router-dom";
import ListingCard1 from "../../../../Components/UI/Cards/ListingCard1/ListingCard1";
import Select from "react-select";
import { Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import BookingsCard from "../../../../Components/UI/Cards/BookingsCard/BookingsCard";
import Pagination from "src/Components/global/Pagination/Pagination";
const jobType = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
];
const customStyles = {
  dropdownIndicator: (base) => ({
    ...base,
    color: "#06C864", // Custom color
  }),
};
function ManageBookingsUI({ totalBookings, serviceList, serviceTitle, serviceId, getListServices, goToNextPage, goToPreviousPage, totalData, startIndex, endIndex }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="main-header mt-3">
        <div className="header-title mb-2">
          <span>{serviceTitle}'s Bookings</span>
        </div>
        {/* <div>
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
      <div className="top-headings"
      >
        <Row>
          <Col>
            <div className="detail-heading">
              <span>Booked By</span>
            </div>
          </Col>
          <Col>
            <div className="detail-heading">
              <span>Booking Type</span>
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
          <Col>
            <div className="detail-heading">
              <span> Status </span>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        {totalBookings > 0 ?
          (<>
            {
              serviceList.map((item, index) => (
                <BookingsCard
                  item={item}
                  serviceTitle={serviceTitle}
                  serviceId={serviceId}
                  getListServices={getListServices}
                />
              ))
            }
            < div style={{ paddingTop: '10px' }}>
              <Pagination
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                totalData={totalData}
                startIndex={startIndex}
                endIndex={endIndex}
              />
            </div>
          </>)
          : (<></>)}

      </div>
    </>
  );
}

export default ManageBookingsUI;
