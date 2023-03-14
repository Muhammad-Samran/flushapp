import React, { useContext } from "react";
import { Container, Row, Col, InputGroup } from "react-bootstrap";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import "./BookingForm.css";
import { SelectField } from "../SelectField/SelectField";
// import image from "src/Assets/images/BusinessDummyImages/image1.jpg";
import { useParams, useLocation } from "react-router-dom";
import ServicesApis from "../../../Apis/Services";
import { useNavigate } from "react-router-dom";
// import useBuild from "src/Hook/useBuild";
const options = [
  { value: "Full Time", label: "Full Time" },
  { value: "Part Time", label: "Part Time" },
];
const optionsBudget = [
  { value: "1k to 5k", label: "1k to 5k" },
  { value: "5k to 10k", label: "5k to 10k" },
];

const RightSidePanel = () => {
  const location = useLocation();
  
  const image = location.state.image;
  const title = location.state.title;
  const description = location.state.description;
  return (
    <>
      <div className="booking-sidepanel" >
        <div className="booking-sidepanel-img">
          <img src={image} />
        </div>
        <div className="booking-sidepanel-detail">
          <h5>{title}</h5>
          <span style={{overflowWrap: 'anywhere'}}>{description}</span>
        </div>
      </div>
    </>
  );
};
function BookingForm(props) {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  // const build = useBuild();
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState({});
  return (
    <>
      <Container className="py-5">
        <Row>
          <div className="booking-Form-main">
            <div className="col-1-booking-form">
              <Col className="col-1-booking-form">
                <Formik
                  initialValues={{
                    user_name: "",
                    user_email: "",
                    user_contact: "",
                    booking_type: "",
                    booked_date: "",
                    slot_id: '',
                    budget: "",
                    description: "",
                  }}
                  onSubmit={async (values) => {
                    try {
                      setSubmitting(true);
                      values = { ...values, service_id: serviceId };
                      const response = await ServicesApis.bookService(values);
                      // build && console.log("INFO: ", response);
                      setTimeout(() => {
                        navigate(`/services/booked`)
                      }, 500);
                    } catch (error) {
                      // build && console.log("ERROR: ", error.message);
                      setError(error);
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                  validate={(values) => {
                    const errors = {};
                    const emailRegex =
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                    const contactRegex = /^[0-9]*$/;

                    if (!values.user_name) {
                      errors.user_name = "*Required";
                    }
                    if (
                      !values.user_email ||
                      !emailRegex.test(values.user_email)
                    ) {
                      errors.user_email = "*Valid Email Required";
                    }
                    if (
                      !values.user_contact ||
                      !contactRegex.test(values.user_contact)
                    ) {
                      errors.user_contact =
                        "*Valid Contact Number Required i.e (numbers only)";
                    }
                    if (!values.booking_type) {
                      errors.booking_type = "*Required";
                    }
                    if (!values.booked_date) {
                      errors.booked_date = "*Required";
                    }
                    if (!values.budget) {
                      errors.budget = "*Required";
                    }
                    if (!values.description) {
                      errors.description = "*Required";
                    }

                    return errors;
                  }}
                >
                  {({ handleChange, handleBlur, values, setFieldValue }) => (
                    <Form>
                      <div className="form-headline">
                        <span>Feel Free to contact for Booking Services</span>
                      </div>
                      <div className="form-body">
                        <Row className="row-1">
                          <Col className="flex-column">
                            <label className="label">Name</label>
                            <input
                              name="user_name"
                              className="fields-contact"
                              type="text"
                              placeholder="Contact Name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.user_name}
                            />
                            <div className="error">
                              <ErrorMessage name="user_name" />
                            </div>
                          </Col>
                          <Col className="flex-column">
                            <label className="label">Email</label>
                            <input
                              name="user_email"
                              className="fields-contact"
                              type="email"
                              placeholder="Contact Email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.user_email}
                            />

                            <div className="error">
                              <ErrorMessage name="user_email" />
                            </div>
                          </Col>
                        </Row>

                        <Row className="row-1">
                          <Col className="flex-column">
                            <label className="label">Contact Number</label>
                            <input
                              name="user_contact"
                              type="text"
                              className="fields-contact"
                              placeholder="Contact Number"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.user_contact}
                            />
                            <div className="error">
                              <ErrorMessage name="user_contact" />
                            </div>
                          </Col>
                          <Col className="flex-column">
                            <label className="label">Booking Type</label>
                            <Field
                              component={SelectField}
                              name="booking_type"
                              options={options}
                              className="fields-contact"
                              placeholder="Select Booking Type"
                              value={values.booking_type}
                            />
                            <div className="error">
                              <ErrorMessage name="booking_type" />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="flex-column">
                            <label className="label">Booking Date</label>
                            <Field
                              type="date"
                              name="booked_date"
                              className="fields-contact"
                              placeholder="Select Booking Date"
                              value={values.booked_date}
                              onChange={(e) => {
                                setFieldValue('booked_date', e.target.value)
                                props.getTimeSlots(e.target.value)
                              }}
                            />
                            <div className="error">
                              <ErrorMessage name="booked_date" />
                            </div>
                          </Col>
                          <Col lg={6} className="flex-column">
                            <label className="label">Budget Range</label>
                            <Field
                              component={SelectField}
                              name="budget"
                              options={optionsBudget}
                              className="fields-contact"
                              placeholder="Select Budget Range"
                              value={values.budget}
                            />
                            <div className="error">
                              <ErrorMessage name="budget" />
                            </div>
                          </Col>
                        </Row>
                        {props.timeSlotsLength > 0 ?
                          <>
                            <h5 className="timeSlots-heading">Available Slots</h5>
                            {props.timeSlots.map((item, index) => (
                              item.booked ?
                                (<></>)
                                :
                                (
                                  <>
                                    <Row>
                                      <Col>
                                        <div className="timeSlots">
                                          <input
                                            name="slot_id"
                                            type="radio"
                                            id={index}
                                            className="checkbox-timeSlots"
                                            onChange={(e)=>setFieldValue("slot_id", e.target.value)}
                                            onBlur={handleBlur}
                                            value={item.slot_id}
                                          />
                                          <h5 className="time-timeSlots">From: {item.timings.startTime}</h5>
                                          <h5 className="time-timeSlots">To: {item.timings.endTime}</h5>
                                        </div>
                                      </Col>
                                    </Row>
                                  </>
                                )
                            ))}
                          </>
                          : (<></>)}
                        <Row>
                          <Col className="flex-column">
                            <label className="label">Description</label>
                            <textarea
                              name="description"
                              className="form-textarea"
                              type="textarea"
                              placeholder="Write Description"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.description}
                            />
                            <div className="error">
                              <ErrorMessage name="description" />
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <div className="form-footer">
                        <div className="form-submit-button">
                          <button className="form-btn" type="submit">
                            <span>Book Service</span>
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Col>
            </div>
            <div className="col-2-booking-form">
              <Col className="col-2-booking-form">
                <RightSidePanel />
              </Col>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default BookingForm;
