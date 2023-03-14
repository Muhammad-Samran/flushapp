import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import "./ContactForm.css";
import { SelectField } from "../SelectField/SelectField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const options = [
  { value: "1", label: "option 1" },
  { value: "2", label: "option 2" },
];

const RightSidePanel = () => {
  return (
    <>
      <div className="contact-panel-main mt-5 mt-lg-0">
        <div className="contact-panel-heading">
          <span>Contact Details</span>
        </div>
        <div className="contact-panel-detail">
          <h4>Phone:</h4>
          <span>(044) 555 - 4369 - 8957</span>
          <br />
          <span>(044) 555 - 4369 - 8852</span>
        </div>
        <div className="contact-panel-detail">
          <h4>Email:</h4>
          <span>calpack@email.com</span>
        </div>
        <div className="contact-panel-detail">
          <h4>Website:</h4>
          <span>daydreamsagency.com</span>
        </div>
        <h4 className="connect">Connect with us on</h4>
        <div className="social">
          <div className="social-space">
            <FontAwesomeIcon
              icon={faFacebook}
              style={{ color: "#3F464E" }}
            />{" "}
          </div>

          <div className="social-space">
            <FontAwesomeIcon
              icon={faInstagram}
              style={{ color: "#3F464E" }}
            />{" "}
          </div>

          <div className="social-space">
            <FontAwesomeIcon
              icon={faTwitter}
              style={{ color: "#3F464E" }}
            />{" "}
          </div>

          <div className="social-space">
            <FontAwesomeIcon
              icon={faLinkedin}
              style={{ color: "#3F464E" }}
            />{" "}
          </div>

          <div className="social-space">
            <FontAwesomeIcon
              icon={faYoutube}
              style={{ color: "#3F464E" }}
            />{" "}
          </div>
        </div>
      </div>
    </>
  );
};
function ContactForm() {
  return (
    <>
      <Container className="py-5">
        <Row>
          <Col lg={8} md={8}>
            <Formik
              initialValues={{
                name: "",
                email: "",
                contactNumber: "",
                subject: "",
                description: "",
              }}
              onSubmit={(values) => {
                // console.log("Form data", values);
              }}
              validate={(values) => {
                const errors = {};
                const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                const contactRegex = /^[0-9]*$/;

                if (!values.name) {
                  errors.name = "Required";
                }
                if (!values.email || !emailRegex.test(values.email)) {
                  errors.email = "Valid Email Required";
                }
                if (
                  !values.contactNumber ||
                  !contactRegex.test(values.contactNumber)
                ) {
                  errors.contactNumber =
                    "Valid Contact Number Required i.e 0123456789";
                }
                if (!values.subject) {
                  errors.subject = "Required";
                }
                if (!values.description) {
                  errors.description = "Required";
                }

                return errors;
              }}
            >
              {({ handleChange, handleBlur, values }) => (
                <Form>
                  <div className="form-headline">
                    <span>Feel Free to contact for any query</span>
                  </div>
                  <div className="form-body">
                    <Row className="row-1">
                      <Col className="flex-column">
                        <label className="label">Name</label>
                        <input
                          name="name"
                          className="fields-contact"
                          type="text"
                          placeholder="Your Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                        <div className="error">
                          <ErrorMessage name="name" />
                        </div>
                      </Col>
                      <Col className="flex-column">
                        <label className="label">Email</label>
                        <input
                          name="email"
                          className="fields-contact"
                          type="email"
                          placeholder="Email Address"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />

                        <div className="error">
                          <ErrorMessage name="email" />
                        </div>
                      </Col>
                    </Row>

                    <Row className="row-1">
                      <Col className="flex-column">
                        <label className="label">Contact Number</label>
                        <input
                          name="contactNumber"
                          type="text"
                          className="fields-contact"
                          placeholder="Contact Number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.contactNumber}
                        />
                        <div className="error">
                          <ErrorMessage name="contactNumber" />
                        </div>
                      </Col>
                      <Col className="flex-column">
                        <label className="label">Subject</label>
                        <Field
                          component={SelectField}
                          name="subject"
                          options={options}
                          className="fields-contact"
                          placeholder="Select Subject"
                        />
                        <div className="error">
                          <ErrorMessage name="subject" />
                        </div>
                      </Col>
                    </Row>
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
                    <div className="small-line-msg">
                      <span>We'll get back to you as soon as possible*</span>
                    </div>
                    <div className="form-submit-button">
                      <button className="form-btn" type="submit">
                        <span>Submit</span>
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
          <Col lg={4} md={4}>
            <RightSidePanel />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ContactForm;
