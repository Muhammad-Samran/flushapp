import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field, FieldArray } from "formik";
import { InputGroup } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import FileUpload from "../../Dropzone/Dropzone";
import * as Yup from "yup";
import AxiosConfig from "../../../../Services/AxiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Spinner, Alert } from "react-bootstrap";
function Education({ navigateTo, onSubmit, formData, isSuccess, isError }) {
  const navigate = useNavigate();

  const workExperenceSchema = Yup.object().shape({
    // graduated_in: Yup.string()
    //   .trim()
    //   .test("is-required", "Required", (value, ctx) => {
    //     // console.log(ctx.parent)
    //     if (ctx.parent.status === "in_progress") {
    //       // console.log("Flag1")
    //       return true;
    //     } else if (
    //       ctx.parent.status === "completed" &&
    //       (ctx.parent.graduated_in === undefined ||
    //         ctx.parent.graduated_in === "" ||
    //         ctx.parent.graduated_in === null)
    //     ) {
    //       // console.log("Flag2")
    //       return false;
    //     } else {
    //       // console.log("Flag3")
    //       return true;
    //     }
    //   }),
    enrolled_in: Yup.string().required("Required"),
    title: Yup.string().required("Required"),
    institute: Yup.string().required("Required"),
    status: Yup.string(),
  });

  return (
    <div id="wordExperience">
      <Formik
        validationSchema={workExperenceSchema}
        initialValues={formData}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values, setSubmitting);
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <h1 className="title-head primary-font primary-color mt-3 mt-xl-0">
              Education
            </h1>
            <div>
              <div>
                <label htmlFor={`title`} className="mb-1">
                  Degree
                </label>
                <InputGroup className="inputField4">
                  <Field
                    id={`title`}
                    name={`title]`}
                    className="inputTransparent flex p-2"
                  />
                </InputGroup>
                <p className="text-danger fs-12">
                  <ErrorMessage name={`title]`} />
                </p>
              </div>
              <div>
                <label htmlFor={`institute`} className="mb-1">
                  Institute
                </label>
                <InputGroup className="inputField4">
                  <Field
                    id={`institute`}
                    name={`institute]`}
                    className="inputTransparent flex p-2"
                  />
                </InputGroup>
                <p className="text-danger fs-12">
                  <ErrorMessage name={`institute]`} />
                </p>
              </div>
              <Row className="justify-content-between">
                <Col lg={6}>
                  <div className="flex">
                    <label htmlFor={`enrolled_in`} className="mb-1">
                      Start Date
                    </label>
                    <InputGroup className="inputField4">
                      <Field
                        type="date"
                        id={`enrolled_in`}
                        name={`enrolled_in`}
                        className="inputTransparent flex p-2"
                      />
                    </InputGroup>
                    <p className="text-danger fs-12">
                      <ErrorMessage name={`enrolled_in`} />
                    </p>
                  </div>
                </Col>
                <Col lg={6}>
                  {/* {values.status === "completed" && ( */}
                  <div className="flex">
                    <label htmlFor={`graduated_in`} className="mb-1">
                      End Date
                    </label>
                    <InputGroup className="inputField4">
                      <Field
                        // type="date"
                        id={`graduated_in`}
                        name={`graduated_in`}
                        className="inputTransparent flex p-2"
                      >
                        {({ field, form: { touched, errors } }) => (
                          <input
                            className="inputTransparent flex p-2"
                            {...field}
                            type="date"
                            disabled={values.status === "in_progress"}
                          />
                        )}
                      </Field>
                    </InputGroup>
                    <p className="text-danger fs-12">
                      <ErrorMessage name={`graduated_in`} />
                    </p>
                  </div>
                  {/* )} */}
                </Col>
                <div>
                  <label className="checkmark-container me-2 d-inline-flex align-items-center">
                    <span className="secondary-font-medium fs-16">
                      Currently Enrolled Here?
                    </span>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFieldValue("status", "in_progress");
                        } else {
                          setFieldValue("status", "completed");
                          setFieldValue("graduated_in", "");
                        }
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
                {/* Upload Files */}
                <label className="mb-1">Upload Media</label>
                <div>
                  <FileUpload
                    value={values}
                    setvalue={setFieldValue}
                    name="file_urls"
                    onUpload={(data) => {
                      setFieldValue("file_urls", [...values.file_urls, data]);
                    }}
                    onRemove={(file) => {
                      setFieldValue(
                        "file_urls",
                        values.file_urls.filter(
                          (item) => item.name !== file.name
                        )
                      );
                    }}
                  />
                </div>
              </Row>
            </div>
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

export default Education;
