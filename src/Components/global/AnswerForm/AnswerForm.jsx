import React from "react";
import { Container, Row, Col, InputGroup } from "react-bootstrap";
import { Formik, Form, ErrorMessage, Field } from "formik";
import "./AnswerForm.css";
import PreviousAnswers from "../PreviousAnswers/PreviousAnswers";
import data from "./data.json";

const TrendingQuestions = () => {
  return (
    <>
      <div className="trending-main">
        <h5>Trending Questions</h5>
        {data.map((item, index) => (
          <div className="trending-card">
            <h3>
              How to find jobs on this portal after creating the new user
              profile...
            </h3>
            <span className="span1">Asked By:</span>
            <span className="span2">{item.title}</span>
          </div>
        ))}
      </div>
    </>
  );
};
function AnswerForm() {
  return (
    <>
      <Container className="py-5">
        <Row>
          <Col lg={8} md={8}>
            <div className="ans-main">
              <Row>
                <Col>
                  <Formik
                    initialValues={{
                      description: "",
                    }}
                    onSubmit={(values) => {
                      // console.log("Form data", values);
                    }}
                    validate={(values) => {
                      const errors = {};

                      if (!values.description) {
                        errors.description = "*Required";
                      }

                      return errors;
                    }}
                  >
                    {({ handleChange, handleBlur, values }) => (
                      <Form>
                        <div className="form-headline">
                          <span>
                            Q: How to find jobs on this portal after creating
                            the new user profile...?
                          </span>
                        </div>
                        <div className="form-body">
                          <Row>
                            <Col className="flex-column">
                              <label className="label">Leave a Answer</label>
                              <textarea
                                name="description"
                                className="form-textarea"
                                type="textarea"
                                placeholder="Add Your Answer Here.."
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
                              <span>Post Answer</span>
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>

              <div className="previous-answers-main">
                <div className="previous-title-bar">
                  <span className="previous-span">Previous Answers</span>

                  <span className="view-span">View all</span>
                </div>
                <div className="Previous-answers-component">
                  <PreviousAnswers />
                </div>
              </div>
            </div>
          </Col>
          <Col lg={4} md={4}>
            <div className="trending-questions-main">
              <TrendingQuestions />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AnswerForm;
