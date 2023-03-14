import React, { useState } from "react";
import { Form, Col, Row  } from "react-bootstrap";
import BookedServiceDetail from "./BookedServiceDetail";


function BookedServicesCard({ item, onClick, ChangeStatus, archiveService }) {
    // console.log("item", item)
    const [show, setShow] = useState(false)
    return (
        <div className="job-position-main">
            <BookedServiceDetail
                item={item}
                show={show}
                setShow={setShow}
            />
            <Row>
                <Col className="detail-heading buttons-position">
                    <div >
                        <div className="d-flex ">
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" />
                            </Form.Group>
                            <span className="p-1 px-2" onClick={() => setShow(true)}>{item.service_data.service_title}</span>
                        </div>
                    </div>
                </Col>
                <Col className="detail-heading buttons-position">
                    <div>
                        <span>${item.service_data.service_price}</span>
                    </div>
                </Col>
                <Col className="detail-heading buttons-position">
                    <div >
                        <span> {item.slot_data.day_name.toUpperCase()} {item.slot_data.timings.startTime} -- {item.slot_data.timings.endTime} </span>
                    </div>
                </Col>
                <Col className="detail-heading buttons-position">
                    <div >
                        <span> {item.Booking_details.booked_date} </span>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default BookedServicesCard;
