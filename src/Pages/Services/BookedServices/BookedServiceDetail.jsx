import React from 'react'
import { Container, Row, Col, Modal, Form } from "react-bootstrap"

const BookedServiceDetail = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={() => props.setShow(false)}>
                <Modal.Header closeButton />

                <Modal.Body>
                    <div className='px-5'>
                        <h4 className='mb-3' >{props.item.service_data.service_title}'s Bookings Details</h4>
                        <Row className='mb-3'>
                            <Col>Booked By</Col>
                            <Col>{props.item.Booking_details.user_name}</Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>Booked Date</Col>
                            <Col>{props.item.Booking_details.booked_date}</Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>Booking Type</Col>
                            <Col>{props.item.Booking_details.booking_type}</Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>Budget</Col>
                            <Col>{props.item.Booking_details.budget}</Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>Description</Col>
                            <Col>{props.item.Booking_details.description}</Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>Email</Col>
                            <Col>{props.item.Booking_details.user_email}</Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>Phone</Col>
                            <Col>{props.item.Booking_details.user_contact}</Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>Time Slot</Col>
                            <Col>{props.item.slot_data.day_name.toUpperCase()} {props.item.slot_data.timings.startTime} -- {props.item.slot_data.timings.endTime} </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>Status</Col>
                            <Col>{props.item.status}</Col>
                        </Row>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default BookedServiceDetail