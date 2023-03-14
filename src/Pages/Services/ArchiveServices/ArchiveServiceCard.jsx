import React from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";


function ArchiveServiceCard ({ item, onClick, ChangeStatus, archiveService }) {
  return (
    <div className="job-position-main">
    <Row>
      <Col className="detail-heading buttons-position">
        <div >
          <div className="d-flex ">
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" />
            </Form.Group>
            <span className="p-1 px-2" onClick={onClick}>{item.service_title}</span>
          </div>
        </div>
      </Col>
      <Col className="detail-heading buttons-position">
        <div>
          <span>{item.total_bookings}</span>
        </div>
      </Col>
      <Col className="detail-heading buttons-position">
        <div >
          <div className="detail-counts">
            <Form.Select size="sm"
              defaultValue={item.is_enable == true && 'Open' || item.is_enable == false && 'Close'}
              onChange={(e) => ChangeStatus(e.target.value, item.service_id)}
            >
              <option value={'Open'}>Open</option>
              <option value={'Close'}>Close</option>
            </Form.Select>
          </div>
        </div>
      </Col>
      <Col>
        <div className="detail-heading buttons-position">
          <div className="archive-btn">
            <button class="button2 edit-job-btn"
              onClick={() => archiveService(false, item.service_id)}
            >
              <FontAwesomeIcon
                icon={faFolderOpen}
                style={{ color: "#37d1aa" }}
              />{" "}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  </div>
  )
}

export default ArchiveServiceCard;
