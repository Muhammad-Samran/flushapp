import React from 'react'
import { Container, Row, Col, Modal, Form } from "react-bootstrap"

const DetailPopUp = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={() => props.setShow(false)}>
                <Modal.Header closeButton />

                <Modal.Body>
                    <div className='px-5'>
                        <h4 className='mb-3' >{props.serviceTitle}'s Details</h4>
                        <Row className='mb-3'>
                            <Col>Booked By</Col>
                            <Col>{props.item.user_name}</Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>Booked Date</Col>
                            <Col>{props.item.booked_date}</Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>Booking Type</Col>
                            <Col>{props.item.booking_type}</Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>Budget</Col>
                            <Col>{props.item.budget}</Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>Description</Col>
                            <Col>{props.item.description}</Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>Email</Col>
                            <Col>{props.item.user_email}</Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>Phone</Col>
                            <Col>{props.item.user_contact}</Col>
                        </Row>
                        <Row className='mb-5'>
                            <Col>Time Slot</Col>
                            <Col>{props.item.day_name.toUpperCase()} {props.item.timings.startTime} -- {props.item.timings.endTime} </Col>
                        </Row>
                        <Row className='mb-5'>
                            <Col>Set Status</Col>
                            <Col>
                            <div className='w-50' >
                                <Form.Select size="sm"
                                    defaultValue={props.item.status === 'accepted' && 'Accepted' || props.item.status === 'rejected' && 'Rejected' || props.item.status === 'pending' && 'Pending'}
                                onChange={(e) => props.ChangeStatus(e.target.value, props.item.booking_id_id)}
                                >
                                    <option value={'Accepted'}>Accepted</option>
                                    <option value={'Rejected'}>Rejected</option>
                                    {props.item.status === 'pending' ? <option value={'Pending'}>Pending</option> : <></>}
                                </Form.Select>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DetailPopUp