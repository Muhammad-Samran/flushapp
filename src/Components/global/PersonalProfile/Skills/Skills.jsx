import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { FormGroup } from "react-bootstrap";
import MultiSelectComponent from "../../MultiSelect/MultiSelect";
import AxiosConfig from "../../../../Services/AxiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Spinner, Alert } from "react-bootstrap";
function Skills({
  navigateTo,
  skillsList,
  isSuccess,
  isError,
  onSubmit,
  selectedSkills = [],
}) {
  return (
    <div>
      <h1 className="title-head primary-font primary-color mt-3 mt-xl-0">
        Skills
      </h1>
      <Formik
        initialValues={{ skills: selectedSkills }}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) =>
          onSubmit(values, setSubmitting)
        }
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <div className="mt-4">
              {/* <div>
                <p className="fs-16 primary-font fs-20 mb-0">Skills</p>
                <hr className="mt-1" />
              </div> */}

              <div>
                <FormGroup>
                  <label htmlFor="skills" className="mb-1">
                    Select Relevant Skills
                  </label>

                  <MultiSelectComponent
                    displayName="service_title"
                    setFieldValue={setFieldValue}
                    name="skills"
                    options={skillsList}
                    selectedValues={values.skills}
                  />
                </FormGroup>
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
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Skills;
