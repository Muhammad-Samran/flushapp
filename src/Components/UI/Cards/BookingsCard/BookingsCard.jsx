import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import DetailPopUp from "../../../../Pages/Services/DetailPopUp/DetailPopUp";
import axios from "src/Services/AxiosConfig";
import { Col, Row } from "react-bootstrap";


function BookingsCard({ item, serviceTitle, serviceId, getListServices }) {
  const [show, setShow] = useState(false)

  const ChangeStatus = async (status, booking_id) => {
    // console.log(status)
    try {
      let payload

      switch (status) {
        case 'Accepted':
          payload = {
            service_id: serviceId,
            booking_id: booking_id,
            accept: true
          }
          break;
        case 'Rejected':
          payload = {
            service_id: serviceId,
            booking_id: booking_id,
            accept: false
          }
          break;
        default:
          console.log(status)
          break
      }

      const { data } = await axios.post(`accept/booking/service`, payload)
      // console.log(data)
      await getListServices()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="job-position-main">
      <DetailPopUp
        show={show}
        setShow={setShow}
        item={item}
        serviceTitle={serviceTitle}
        ChangeStatus={ChangeStatus}
      />
      <Row>
        <Col className="detail-heading buttons-position">
          <div >
            <div className="d-flex ">
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" />
              </Form.Group>
              <span className="p-1" onClick={() => { setShow(true) }}>{item.user_name}</span>
            </div>
          </div>
        </Col>
        <Col className="detail-heading buttons-position">
          <div>
            <span>{item.booking_type}</span>
          </div>
        </Col>
        <Col className="detail-heading buttons-position">
          <div >
            <span> {item.day_name.toUpperCase()} {item.timings.startTime} -- {item.timings.startTime} </span>
          </div>
        </Col>
        <Col className="detail-heading buttons-position">
          <div >
            <span> {item.booked_date} </span>
          </div>
        </Col>
        <Col className="detail-heading buttons-position">
          <div >
            <span> {item.status.toUpperCase()} </span>
          </div>
        </Col>
      </Row>
    </div>

  );
}

export default BookingsCard;
