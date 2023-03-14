import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage, Field, FieldArray } from "formik";
import { InputGroup } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { SelectField } from "../../SelectField/SelectField";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Spinner, Alert } from "react-bootstrap";
import AxiosConfig from "../../../../Services/AxiosConfig";

function WorkExperience({
  navigateTo,
  onSubmit,
  formData = {
    end_date: "",
    start_date: "",
    title: "",
    employment_type: "",
    company_name: "",
    location: "",
    job_description: "",
    // is_expired: true,
  },
}) {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);

  const workExperenceSchema = Yup.object().shape({
    workHistory: Yup.array().of(
      Yup.object().shape({
        // end_date: Yup.string().test("is-required", "Required", (value, ctx) => {
        //   // console.log(ctx.parent)  //parent is the array
        //   if (ctx.parent.is_expired === false) {
        //     // console.log("Flag1")
        //     return true;
        //   } else if (
        //     ctx.parent.is_expired === true &&
        //     (ctx.parent.end_date === undefined ||
        //       ctx.parent.end_date === "" ||
        //       ctx.parent.end_date === null)
        //   ) {
        //     // console.log("Flag2")
        //     return false;
        //   } else {
        //     // console.log("Flag3")
        //     return true;
        //   }
        // }),
        start_date: Yup.string().required("Required"),
        title: Yup.string().required("Required"),
        employment_type: Yup.string().required("Required"),
        company_name: Yup.string().required("Required"),
        location: Yup.string().required("Required"),
        job_description: Yup.string(),
      })
    ),
  });
  return (
    <div id="wordExperience">
      <Formik
        enableReinitialize
        validationSchema={workExperenceSchema}
        initialValues={formData}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values, setSubmitting);
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <h1 className="title-head primary-font primary-color mt-3 mt-xl-0">
              Work History
            </h1>
            <FieldArray name="workHistory">
              {(fieldArrayProps) => {
                // console.log("fieldArrayProps", fieldArrayProps);
                const { push, remove } = fieldArrayProps;

                const { workHistory } = values;
                return (
                  <div>
                    {workHistory.map((phNumber, index) => (
                      <div key={index}>
                        {/* <div
                          className={` ${
                            index === 0
                              ? "d-flex justify-content-between"
                              : null
                          } align-items-center`}
                        >
                          {index === 0 ? (
                            <p className="fs-16 primary-font fs-20 mb-0">
                              Work History
                            </p>
                          ) : null}
                          <div className="d-flex justify-content-end">
                            {index > 0 && ( 
                              <AddButton
                                onClick={remove}
                                component="minus"
                                index={index}
                              />
                            )}
                            <AddButton
                              onClick={(e) => {
                                push({
                                  end_date: "",
                                  start_date: "",
                                  title: "",
                                  employment_type: "",
                                  company_name: "",
                                  location: "",
                                  job_description: "",
                                });
                              }}
                              component="plus"
                            />
                          </div>
                        </div> */}
                        <Row>
                          <Col lg={6}>
                            {/* Title */}
                            <div>
                              <label htmlFor={`title${index}`} className="mb-1">
                                Title
                              </label>
                              <InputGroup className="inputField4">
                                <Field
                                  placeholder="Enter Job Title"
                                  id={`title${index}`}
                                  name={`workHistory[${index}.title]`}
                                  className="inputTransparent flex p-2"
                                />
                              </InputGroup>
                              <p className="text-danger fs-12">
                                <ErrorMessage
                                  name={`workHistory[${index}.title]`}
                                />
                              </p>
                            </div>
                          </Col>
                          <Col lg={6}>
                            {/* Employment Type */}
                            <div>
                              <label
                                htmlFor={`employment_type${index}`}
                                className="mb-1"
                              >
                                Employment Type
                              </label>

                              <Field
                                id={`employment_type${index}`}
                                name={`workHistory[${index}].employment_type`}
                                placeholder={"Select employment type"}
                                component={SelectField}
                                options={[
                                  { value: "full-time", label: "FullTime" },
                                  { value: "part-time", label: "Part Time" },
                                  { value: "internship", label: "Internship" },
                                  { value: "contract", label: "Contract" },
                                  { value: "freelance", label: "Freelance" },
                                  { value: "other", label: "Other" },
                                ]}
                              />
                              <p className="text-danger fs-12">
                                <ErrorMessage
                                  name={`workHistory[${index}].employment_type`}
                                />
                              </p>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={6}>
                            {/* Company Name */}
                            <div>
                              <label
                                htmlFor={`company_name${index}`}
                                className="mb-1"
                              >
                                Company Name
                              </label>
                              <InputGroup className="inputField4">
                                <Field
                                  placeholder="Enter Company Name"
                                  id={`company_name${index}`}
                                  name={`workHistory[${index}].company_name`}
                                  className="inputTransparent flex p-2"
                                />
                              </InputGroup>
                              <p className="text-danger fs-12">
                                <ErrorMessage
                                  name={`workHistory[${index}].company_name`}
                                />
                              </p>
                            </div>
                          </Col>
                          <Col lg={6}>
                            {/* Location */}
                            <div>
                              <label
                                htmlFor={`location${index}`}
                                className="mb-1"
                              >
                                Location
                              </label>
                              <InputGroup className="inputField4">
                                <Field
                                  placeholder="Enter Company Location"
                                  id={`location${index}`}
                                  name={`workHistory[${index}.location]`}
                                  className="inputTransparent flex p-2"
                                />
                              </InputGroup>
                              <p className="text-danger fs-12">
                                <ErrorMessage
                                  name={`workHistory[${index}].location`}
                                />
                              </p>
                            </div>
                          </Col>
                        </Row>

                        {/* Job Description */}
                        <div>
                          <label
                            htmlFor={`job_description${index}`}
                            className="mb-1"
                          >
                            Description
                          </label>
                          <InputGroup className="inputField4">
                            <Field
                              as="textarea"
                              id={`job_description${index}`}
                              name={`workHistory[${index}].job_description`}
                              className="inputTransparent flex p-2"
                            />
                          </InputGroup>
                          <p className="text-danger fs-12">
                            <ErrorMessage
                              name={`workHistory[${index}].job_description`}
                            />
                          </p>
                        </div>

                        <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                          <div className="flex">
                            <label
                              htmlFor={`start_date${index}`}
                              className="mb-1"
                            >
                              Start Date
                            </label>
                            <InputGroup className="inputField4">
                              <Field
                                type="date"
                                id={`start_date${index}`}
                                name={`workHistory[${index}].start_date`}
                                className="inputTransparent flex p-2"
                              />
                            </InputGroup>
                            <p className="text-danger fs-12">
                              <ErrorMessage
                                name={`workHistory[${index}].start_date`}
                              />
                            </p>
                          </div>
                          <div className="flex">
                            <label
                              htmlFor={`end_date${index}`}
                              className="mb-1"
                            >
                              End Date
                            </label>
                            <InputGroup className="inputField4">
                              <Field
                                type="date"
                                id={`end_date${index}`}
                                name={`workHistory[${index}].end_date`}
                                className="inputTransparent flex p-2"
                              >
                                {({ field, form: { touched, errors } }) => (
                                  <input
                                    className="inputTransparent flex p-2"
                                    {...field}
                                    type="date"
                                    disabled={
                                      workHistory[index].is_expired === false
                                    }
                                  />
                                )}
                              </Field>
                            </InputGroup>
                            <p className="text-danger fs-12">
                              <ErrorMessage
                                name={`workHistory[${index}].end_date`}
                              />
                            </p>
                          </div>
                        </div>
                        <div>
                          <label className="checkmark-container me-2 d-inline-flex align-items-center">
                            <span className="secondary-font-medium fs-16">
                              Currently Working Here?
                            </span>
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFieldValue(
                                    `workHistory[${index}].end_date`,
                                    ""
                                  );
                                }
                                // else {
                                //   setFieldValue(
                                //     `workHistory[${index}].is_expired`,
                                //     true
                                //   );
                                //   setFieldValue(
                                //     `workHistory[${index}].end_date`,
                                //     ''
                                //   );
                                // }
                              }}
                              // checked={values.status === "in_progress"}
                              name="status"
                              value="in_progress"
                            />
                            <span className="checkmark"></span>
                          </label>
                          {/* </div> */}
                          <p className="text-danger fs-12">
                            <ErrorMessage name="status" />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }}
            </FieldArray>
            <div className="d-flex justify-content-center mt-2 align-items-center">
              <button
                className="btn-green2 w-auto text-white px-4 mb-2"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <span className="me-2">
                    <Spinner
                      as="span"
                      variant="light"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      animation="border"
                    />
                  </span>
                )}
                <span>Save</span>
              </button>
            </div>
            {isSuccess && <Alert variant="success">Success</Alert>}
            {isError && <Alert variant="danger">Something went wrong!</Alert>}
            <Link to={navigateTo}>
              <p
                className="primary-color "
                style={{
                  float: "right",
                  cursor: "pointer",
                  display: "inline-block",
                }}
              >
                <span className="me-2">Skip For Now</span>

                <FontAwesomeIcon icon={faArrowRightLong} />
              </p>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default WorkExperience;
